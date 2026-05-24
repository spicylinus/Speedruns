import { NextRequest, NextResponse } from 'next/server';
import { stripeService } from '@/lib/stripe/client';
import { RETAINER_PRICES } from '@/lib/stripe/client';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function updatePipeline(message: string) {
  try {
    await execAsync(`/home/team/shared/sales/update_pipeline.sh "${message}"`);
  } catch (error) {
    console.error('Failed to update pipeline:', error);
  }
}

export async function POST(req: NextRequest) {
  try {
    const { tierKey, email, name } = await req.json();

    if (!tierKey || !email) {
      return NextResponse.json({ status: 'error', message: 'Missing tierKey or email' }, { status: 400 });
    }

    if (!RETAINER_PRICES[tierKey]) {
      return NextResponse.json({ status: 'error', message: `Unknown retainer tier: ${tierKey}` }, { status: 400 });
    }

    const session = await stripeService.createRetainerCheckout(tierKey, email, name);
    const config = RETAINER_PRICES[tierKey];

    await updatePipeline(`RETAINER CHECKOUT: ${config.name} ($${config.amount}/mo) for ${email}. URL: ${session.url}`);

    return NextResponse.json({
      status: 'success',
      data: {
        id: session.id,
        url: session.url,
        tier: tierKey,
        amount: config.amount,
      }
    });
  } catch (error: any) {
    console.error('Error creating retainer checkout:', error);
    return NextResponse.json({ status: 'error', message: error.message }, { status: 500 });
  }
}