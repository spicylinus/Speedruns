'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Crown, CheckCircle2, ArrowRight, Sparkles, Shield, MapPin, Target } from 'lucide-react';

interface GrowthTier {
  name: string;
  price: number;
  period: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
}

const GROWTH_TIERS: GrowthTier[] = [
  {
    name: 'Base',
    price: 1997,
    period: '/mo',
    features: [
      'Website Protection (base)',
      'Local SEO Manager (base)',
      'Lead Gen Manager (base)',
      'Monthly strategy review',
    ],
  },
  {
    name: 'Pro',
    price: 3997,
    period: '/mo',
    highlighted: true,
    badge: 'Most Popular',
    features: [
      'Everything in all Pro tiers combined',
      'Named account manager',
      'Weekly strategy calls',
      'Unified performance dashboard',
    ],
  },
  {
    name: 'Elite',
    price: 4797,
    period: '/mo',
    features: [
      'Everything in all Elite tiers',
      'Executive-level strategic partnership',
      'Quarterly business reviews',
      'Priority access — no wait times',
    ],
  },
];

export default function FullGrowthPartnerUpsell({ currentTier = 'none' }: { currentTier?: 'base' | 'pro' | 'elite' | 'none' }) {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const isActive = currentTier !== 'none';

  const activeTierIndex = currentTier !== 'none'
    ? GROWTH_TIERS.findIndex(t => t.name.toLowerCase() === currentTier)
    : -1;

  return (
    <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-amber-900 via-slate-900 to-slate-800 px-8 py-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-transparent" />
        <div className="relative z-10 flex items-center gap-3">
          <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center">
            <Crown size={20} className="text-amber-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold">Full Growth Partner</h3>
            <p className="text-slate-400 text-xs">Your complete digital growth team</p>
          </div>
        </div>
      </div>

      {/* Current status */}
      {isActive && activeTierIndex >= 0 && (
        <div className="px-8 py-4 bg-amber-50 border-b border-amber-100 flex items-center gap-2">
          <CheckCircle2 className="text-amber-600" size={14} />
          <span className="text-amber-700 text-xs font-bold">
            {GROWTH_TIERS[activeTierIndex].name} tier active
          </span>
        </div>
      )}

      {/* Tier cards */}
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {GROWTH_TIERS.map((tier, index) => {
            const isCurrentTier = currentTier !== 'none' && tier.name.toLowerCase() === currentTier;
            const isUpgrade = isActive && index > activeTierIndex;

            return (
              <div
                key={tier.name}
                className={`relative rounded-2xl border-2 p-6 transition-all ${
                  tier.highlighted
                    ? 'border-amber-200 bg-amber-50/30'
                    : isCurrentTier
                    ? 'border-emerald-200 bg-emerald-50/30'
                    : 'border-slate-200 bg-slate-50/30'
                } ${isUpgrade ? 'opacity-80' : ''}`}
              >
                {tier.badge && (
                  <div className="absolute -top-3 left-4">
                    <span className="bg-amber-500 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                      {tier.badge}
                    </span>
                  </div>
                )}
                {isCurrentTier && (
                  <div className="absolute -top-3 left-4">
                    <span className="bg-emerald-500 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                      Active
                    </span>
                  </div>
                )}

                <div className="mb-4">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{tier.name}</p>
                  <div className="flex items-baseline gap-1">
                    <span className="text-3xl font-black text-slate-900">${tier.price.toLocaleString()}</span>
                    <span className="text-sm text-slate-400">{tier.period}</span>
                  </div>
                </div>

                <ul className="space-y-2 mb-6">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs text-slate-600">
                      <CheckCircle2 className={`shrink-0 mt-0.5 ${tier.highlighted ? 'text-amber-500' : 'text-slate-400'}`} size={12} />
                      {feature}
                    </li>
                  ))}
                </ul>

                {isCurrentTier ? (
                  <div className="py-2.5 text-center">
                    <span className="text-emerald-600 text-xs font-bold">Current Plan</span>
                  </div>
                ) : isUpgrade ? (
                  <button
                    onClick={() => setSelectedTier(tier.name)}
                    className="w-full py-2.5 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-slate-800 transition-all"
                  >
                    Upgrade to {tier.name}
                  </button>
                ) : (
                  <button
                    onClick={() => setSelectedTier(tier.name)}
                    className={`w-full py-2.5 rounded-xl text-xs font-bold transition-all ${
                      tier.highlighted
                        ? 'bg-amber-500 text-white hover:bg-amber-600'
                        : 'bg-slate-200 text-slate-600 hover:bg-slate-300'
                    }`}
                  >
                    Get Started
                  </button>
                )}
              </div>
            );
          })}
        </div>

        {/* CTA */}
        {selectedTier && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-t border-slate-100 pt-6 flex items-center justify-between"
          >
            <div>
              <p className="text-sm font-bold text-slate-900">
                {selectedTier} selected — ${GROWTH_TIERS.find(t => t.name === selectedTier)?.price.toLocaleString()}/mo
              </p>
              <p className="text-xs text-slate-500">Billed monthly. Cancel anytime after 30 days.</p>
            </div>
            <button className="px-6 py-3 bg-slate-900 text-white rounded-xl font-bold text-sm hover:bg-slate-800 transition-all flex items-center gap-2 group">
              Start {selectedTier}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        )}

        {!selectedTier && !isActive && (
          <p className="text-center text-xs text-slate-400 font-medium">
            Choose a tier to get started
          </p>
        )}
      </div>
    </section>
  );
}

async function startRetainerCheckout(tierKey: string, email: string) {
  const res = await fetch('/api/retainer', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ tierKey, email }),
  });
  const data = await res.json();
  if (data.status === 'success' && data.data.url) {
    window.location.href = data.data.url;
    return true;
  }
  throw new Error(data.message || 'Checkout failed');
}

export function FullGrowthPartnerPitch({ clientEmail }: { clientEmail?: string }) {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState(clientEmail || '');
  const [showEmail, setShowEmail] = useState(false);

  const handleSubscribe = async (tierKey: string) => {
    const targetEmail = clientEmail || email;
    if (!targetEmail || !targetEmail.includes('@')) {
      setShowEmail(true);
      return;
    }
    setLoading(true);
    try {
      await startRetainerCheckout(tierKey, targetEmail);
    } catch {
      alert('Checkout failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  return (
    <section className="bg-gradient-to-br from-amber-900 to-slate-900 rounded-3xl p-8 text-white overflow-hidden relative border border-amber-700/30">
      <div className="absolute top-0 right-0 w-40 h-40 bg-amber-500/20 rounded-full blur-[80px]" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-amber-500/20 rounded-xl flex items-center justify-center">
            <Crown size={20} className="text-amber-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold">Full Growth Partner</h3>
            <p className="text-slate-400 text-xs">One partner for everything digital</p>
          </div>
        </div>

        <p className="text-slate-300 text-sm mb-6 leading-relaxed">
          We own your entire digital growth pipeline — website, SEO, lead generation, and ongoing optimization. Starting at <span className="text-white font-bold">$1,997/mo</span>.
        </p>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white/5 rounded-xl p-3 text-center border border-white/10">
            <p className="text-[10px] font-black text-slate-500 uppercase mb-1">Base</p>
            <p className="text-xl font-black">$1,997<span className="text-sm font-normal text-slate-400">/mo</span></p>
          </div>
          <div className="bg-amber-500/10 rounded-xl p-3 text-center border border-amber-500/20">
            <p className="text-[10px] font-black text-amber-400 uppercase mb-1">Pro</p>
            <p className="text-xl font-black">$3,997<span className="text-sm font-normal text-amber-300">/mo</span></p>
          </div>
          <div className="bg-white/5 rounded-xl p-3 text-center border border-white/10">
            <p className="text-[10px] font-black text-slate-500 uppercase mb-1">Elite</p>
            <p className="text-xl font-black">$4,797<span className="text-sm font-normal text-slate-400">/mo</span></p>
          </div>
        </div>

        <div className="space-y-3 mb-6">
          {[
            { icon: <Shield size={14} />, text: 'Website Protection included' },
            { icon: <MapPin size={14} />, text: 'Local SEO Manager included' },
            { icon: <Target size={14} />, text: 'Lead Gen Manager included' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-slate-300">
              <span className="text-amber-400 shrink-0">{item.icon}</span>
              {item.text}
            </div>
          ))}
        </div>

        {showEmail && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-4 space-y-2">
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white text-sm placeholder-slate-400 outline-none focus:border-amber-400"
            />
            <button
              onClick={() => handleSubscribe('full-growth-base')}
              disabled={loading}
              className="w-full py-3 bg-amber-500 text-slate-900 rounded-xl text-sm font-bold hover:bg-amber-400 disabled:opacity-50"
            >
              {loading ? 'Redirecting...' : 'Continue to Checkout'}
            </button>
            <button onClick={() => setShowEmail(false)} className="w-full py-2 text-slate-500 text-xs hover:text-slate-300">Cancel</button>
          </motion.div>
        )}

        {!showEmail && (
          <>
            <div className="space-y-2">
              <button onClick={() => handleSubscribe('full-growth-base')} disabled={loading} className="w-full py-4 bg-amber-500 text-slate-900 rounded-xl font-black hover:bg-amber-400 transition-all text-sm disabled:opacity-50">
                Add Full Growth Partner — $1,997/mo
              </button>
              <div className="grid grid-cols-2 gap-2">
                <button onClick={() => handleSubscribe('full-growth-pro')} disabled={loading} className="py-2 bg-amber-500/20 border border-amber-500/30 text-amber-300 rounded-xl text-xs font-bold hover:bg-amber-500/30 disabled:opacity-50">
                  Pro $3,997/mo
                </button>
                <button onClick={() => handleSubscribe('full-growth-elite')} disabled={loading} className="py-2 bg-white/5 border border-white/10 text-slate-300 rounded-xl text-xs font-bold hover:bg-white/10 disabled:opacity-50">
                  Elite $4,797/mo
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}