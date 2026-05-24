'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, CheckCircle2, ArrowRight } from 'lucide-react';

interface ProtectionTier {
  name: string;
  price: number;
  period: string;
  tierKey: string;
  features: string[];
  highlighted?: boolean;
}

const PROTECTION_TIERS: ProtectionTier[] = [
  {
    name: 'Base',
    price: 199,
    period: '/mo',
    tierKey: 'website-protection-base',
    features: [
      'Security monitoring + malware sweeps',
      'Daily automated backups',
      'Uptime monitoring',
      'Plugin + core updates',
      'Monthly security report',
      'Emergency alerts',
    ],
  },
  {
    name: 'Pro',
    price: 399,
    period: '/mo',
    tierKey: 'website-protection-pro',
    highlighted: true,
    features: [
      'Everything in Base',
      'Unlimited 30-min content edits',
      'Full software + plugin update management',
      'Monthly website health audit',
      'Priority 4-hour emergency response',
      'Access to staging environment',
    ],
  },
];

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

export default function WebsiteProtectionUpsell({ currentTier = 'none' }: { currentTier?: 'base' | 'pro' | 'none' }) {
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [showEmail, setShowEmail] = useState(false);
  const isPro = currentTier === 'pro';
  const isActive = currentTier !== 'none';

  const handleSubscribe = async (tier: ProtectionTier) => {
    if (!email || !email.includes('@')) {
      setShowEmail(true);
      return;
    }
    setLoading(true);
    try {
      await startRetainerCheckout(tier.tierKey, email);
    } catch (err) {
      alert('Failed to start checkout. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-slate-900 rounded-3xl p-8 text-white overflow-hidden relative">
      <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/20 rounded-full blur-[80px]" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-[60px]" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
            <Shield size={20} className="text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold">Website Protection</h3>
            <p className="text-blue-300/60 text-xs font-medium">Keep your site safe and running</p>
          </div>
        </div>

        {!isActive && (
          <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-xs text-emerald-300 font-medium">
            Add ongoing protection to your project — starting at $199/mo
          </div>
        )}

        {isActive && (
          <div className="mb-4 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-2">
            <CheckCircle2 className="text-emerald-400" size={14} />
            <span className="text-emerald-300 text-xs font-bold">
              {currentTier === 'pro' ? 'Pro' : 'Base'} protection active
            </span>
          </div>
        )}

        {/* Tier Toggle */}
        {!isActive && (
          <div className="flex gap-2 mb-6">
            {PROTECTION_TIERS.map(tier => (
              <button
                key={tier.name}
                onClick={() => {
                  if (expanded && tier.name === 'Pro') {
                    setExpanded(false);
                  } else if (tier.name === 'Pro') {
                    setExpanded(!expanded);
                  } else {
                    setExpanded(false);
                    handleSubscribe(tier);
                  }
                }}
                className={`flex-1 p-4 rounded-xl border transition-all ${
                  tier.highlighted
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-white'
                    : 'bg-white/5 border-white/10 text-slate-400'
                }`}
              >
                <div className="flex items-start justify-between mb-1">
                  <span className="text-[10px] font-black uppercase tracking-widest">{tier.name}</span>
                  {tier.name === 'Pro' && (
                    <span className="text-[9px] font-black text-emerald-400 bg-emerald-400/20 px-1.5 py-0.5 rounded uppercase">Popular</span>
                  )}
                </div>
                <div className="text-left">
                  <span className="text-2xl font-black">${tier.price}</span>
                  <span className="text-slate-400 text-sm">{tier.period}</span>
                </div>
              </button>
            ))}
          </div>
        )}

        {expanded && !isActive && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-6 space-y-3"
          >
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Pro includes everything in Base, plus:</p>
            <ul className="space-y-2">
              {PROTECTION_TIERS[1].features.map((feature, i) => (
                <li key={i} className="flex items-start gap-2 text-sm">
                  <CheckCircle2 className="text-emerald-400 shrink-0 mt-0.5" size={14} />
                  <span className="text-slate-300">{feature}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        )}

        {/* Email prompt */}
        {showEmail && !isActive && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-4 space-y-2"
          >
            <p className="text-xs text-slate-400 font-medium">Enter your email to start your subscription:</p>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white text-sm placeholder-slate-400 outline-none focus:border-emerald-400"
            />
            <button
              onClick={() => {
                const tier = PROTECTION_TIERS[expanded ? 1 : 0];
                handleSubscribe(tier);
              }}
              disabled={loading}
              className="w-full py-3 bg-emerald-500 text-white rounded-xl text-sm font-bold hover:bg-emerald-600 disabled:opacity-50"
            >
              {loading ? 'Redirecting...' : 'Continue to Checkout'}
            </button>
            <button
              onClick={() => setShowEmail(false)}
              className="w-full py-2 text-slate-500 text-xs hover:text-slate-300"
            >
              Cancel
            </button>
          </motion.div>
        )}

        {!isActive && !showEmail && (
          <button
            onClick={() => handleSubscribe(PROTECTION_TIERS[0])}
            disabled={loading}
            className="w-full py-4 bg-white text-slate-900 rounded-xl font-black hover:bg-slate-100 transition-all text-sm flex items-center justify-center gap-2 group disabled:opacity-50"
          >
            Add Website Protection
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
          </button>
        )}

        {isActive && isPro && (
          <div className="py-3 text-center">
            <p className="text-emerald-400 text-sm font-bold flex items-center justify-center gap-2">
              <CheckCircle2 size={16} />
              Pro protection active
            </p>
            <p className="text-slate-500 text-xs mt-1">$399/mo • Managed by RevFi</p>
          </div>
        )}
      </div>
    </section>
  );
}

// Pitch card for clients without protection
export function WebsiteProtectionPitch({ clientEmail }: { clientEmail?: string }) {
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
    <section className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 text-white overflow-hidden relative border border-slate-700">
      <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/20 rounded-full blur-[80px]" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-[60px]" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
            <Shield size={20} className="text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold">Website Protection</h3>
            <p className="text-slate-400 text-xs">Peace of mind for your digital presence</p>
          </div>
        </div>

        <p className="text-slate-300 text-sm mb-6 leading-relaxed">
          Security monitoring, daily backups, malware protection, and unlimited content edits. Starting at <span className="text-white font-bold">$199/mo</span>.
        </p>

        <div className="space-y-3 mb-6">
          {[
            'Malware detection + removal',
            'Daily automated backups',
            'Plugin + core WordPress updates',
            '99.9% uptime monitoring',
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-slate-300">
              <CheckCircle2 className="text-emerald-400 shrink-0" size={16} />
              {item}
            </div>
          ))}
        </div>

        {showEmail && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-4 space-y-2"
          >
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white text-sm placeholder-slate-400 outline-none focus:border-emerald-400"
            />
            <button
              onClick={() => handleSubscribe('website-protection-base')}
              disabled={loading}
              className="w-full py-3 bg-emerald-500 text-white rounded-xl text-sm font-bold hover:bg-emerald-600 disabled:opacity-50"
            >
              {loading ? 'Redirecting...' : 'Continue to Checkout'}
            </button>
            <button onClick={() => setShowEmail(false)} className="w-full py-2 text-slate-500 text-xs hover:text-slate-300">
              Cancel
            </button>
          </motion.div>
        )}

        {!showEmail && (
          <>
            <button
              onClick={() => handleSubscribe('website-protection-base')}
              disabled={loading}
              className="w-full py-4 bg-emerald-500 text-white rounded-xl font-black hover:bg-emerald-600 transition-all text-sm flex items-center justify-center gap-2 group disabled:opacity-50"
            >
              Add Website Protection — $199/mo
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={() => handleSubscribe('website-protection-pro')}
              disabled={loading}
              className="w-full mt-2 py-3 bg-blue-500/20 border border-blue-500/30 text-blue-300 rounded-xl font-bold text-sm hover:bg-blue-500/30 transition-all disabled:opacity-50"
            >
              Upgrade to Pro — $399/mo
            </button>
          </>
        )}
      </div>
    </section>
  );
}
