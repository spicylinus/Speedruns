import Stripe from 'stripe';

const HOST = process.env.NEXT_PUBLIC_HOST || 'http://localhost:3000';

function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) throw new Error('STRIPE_SECRET_KEY is not configured');
  return new Stripe(key, { apiVersion: '2026-04-22.dahlia' as any });
}

export { getStripe };

// Retainer tier price map — these are used to create/find Stripe Products + Prices
export const RETAINER_PRICES: Record<string, { name: string; amount: number; interval: 'month' }> = {
  // Website Protection
  'website-protection-base':   { name: 'Website Protection — Base',   amount: 199, interval: 'month' },
  'website-protection-pro':    { name: 'Website Protection — Pro',    amount: 399, interval: 'month' },
  // Local SEO Manager
  'local-seo-base':            { name: 'Local SEO Manager — Base',     amount: 497, interval: 'month' },
  'local-seo-pro':             { name: 'Local SEO Manager — Pro',      amount: 797, interval: 'month' },
  'local-seo-elite':          { name: 'Local SEO Manager — Elite',   amount: 1197, interval: 'month' },
  // Lead Gen Manager
  'lead-gen-base':            { name: 'Lead Gen Manager — Base',     amount: 997, interval: 'month' },
  'lead-gen-pro':             { name: 'Lead Gen Manager — Pro',      amount: 1997, interval: 'month' },
  'lead-gen-elite':           { name: 'Lead Gen Manager — Elite',    amount: 2697, interval: 'month' },
  // Full Growth Partner
  'full-growth-base':         { name: 'Full Growth Partner — Base',  amount: 1997, interval: 'month' },
  'full-growth-pro':          { name: 'Full Growth Partner — Pro',   amount: 3997, interval: 'month' },
  'full-growth-elite':        { name: 'Full Growth Partner — Elite', amount: 4797, interval: 'month' },
};

// Cache of Stripe Price IDs per tier key
const priceIdCache: Record<string, string> = {};

export class StripeService {
  async createCustomer(email: string, name?: string) {
    return await getStripe().customers.create({ email, name });
  }

  async getOrCreatePrice(tierKey: string): Promise<string> {
    if (priceIdCache[tierKey]) return priceIdCache[tierKey];

    const stripe = getStripe();
    const config = RETAINER_PRICES[tierKey];
    if (!config) throw new Error(`Unknown retainer tier: ${tierKey}`);

    // Find or create product
    const existingProducts = await stripe.products.list({ limit: 100, active: true });
    let product = existingProducts.data.find(p => p.name === config.name);

    if (!product) {
      product = await stripe.products.create({ name: config.name, active: true });
    }

    // Find existing price on this product
    const existingPrices = await stripe.prices.list({ limit: 100, product: product.id, active: true });
    let price = existingPrices.data.find(p => (p.unit_amount || 0) === config.amount * 100);

    if (!price) {
      price = await stripe.prices.create({
        unit_amount: config.amount * 100,
        currency: 'usd',
        recurring: { interval: config.interval },
        product: product.id,
        active: true,
      });
    }

    priceIdCache[tierKey] = price.id;
    return price.id;
  }

  async createRetainerCheckout(tierKey: string, customerEmail: string, customerName?: string) {
    const stripe = getStripe();
    const priceId = await this.getOrCreatePrice(tierKey);

    // Find or create customer
    const customers = await stripe.customers.list({ limit: 100, email: customerEmail });
    let customer = customers.data.find(c => c.email === customerEmail);
    if (!customer) {
      customer = await stripe.customers.create({ email: customerEmail, name: customerName });
    }

    const session = await stripe.checkout.sessions.create({
      customer: customer.id,
      line_items: [{ price: priceId, quantity: 1 }],
      mode: 'subscription',
      success_url: `${HOST}/delivery?session_id={CHECKOUT_SESSION_ID}&product=${tierKey}`,
      cancel_url: `${HOST}/delivery`,
      allow_promotion_codes: true,
      billing_address_collection: 'required',
    });

    return session;
  }

  async createPaymentLink(amount: number, description: string, customerId?: string) {
    const stripe = getStripe();
    const product = await stripe.products.create({ name: description });
    const price = await stripe.prices.create({
      unit_amount: amount * 100,
      currency: 'usd',
      product: product.id,
    });
    const paymentLink = await stripe.paymentLinks.create({
      line_items: [{ price: price.id, quantity: 1 }],
      after_completion: { type: 'redirect', redirect: { url: `${HOST}/delivery?status=success` } },
    });
    return paymentLink;
  }

  async createCheckoutSession(customerId: string, planId: 'seo' | 'lead-gen' | 'monitoring', amount: number) {
    const stripe = getStripe();
    let productName = '';
    if (planId === 'seo') productName = 'SEO Dominance';
    else if (planId === 'lead-gen') productName = 'Lead Gen Engine';
    else if (planId === 'monitoring') productName = 'Visibility Monitoring Tier';

    const product = await stripe.products.create({ name: productName });
    const price = await stripe.prices.create({
      unit_amount: amount * 100,
      currency: 'usd',
      recurring: { interval: 'month' },
      product: product.id,
    });

    return await stripe.checkout.sessions.create({
      customer: customerId,
      line_items: [{ price: price.id, quantity: 1 }],
      mode: 'subscription',
      success_url: `${HOST}/delivery?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${HOST}/billing`,
    });
  }
}

export const stripeService = new StripeService();