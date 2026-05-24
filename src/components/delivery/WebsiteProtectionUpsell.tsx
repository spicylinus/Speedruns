'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Shield, CheckCircle2, ArrowRight, Clock, Zap, AlertCircle } from 'lucide-react';

interface ProtectionTier {
  name: string;
  price: number;
  period: string;
  features: string[];
  highlighted?: boolean;
}

const PROTECTION_TIERS: ProtectionTier[] = [
  {
    name: 'Base',
    price: 199,
    period: '/mo',
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

const PROTECTION_TIERS_PAID: { base: string; pro: string } = {
  base: 'Currently Active',
  pro: 'Upgrade to Pro',
};

export default function WebsiteProtectionUpsell({ currentTier = 'base' }: { currentTier?: 'base' | 'pro' | 'none' }) {
  const [expanded, setExpanded] = useState(false);
  const isPro = currentTier === 'pro';

  return (
    <section className="bg-slate-900 rounded-3xl p-8 text-white overflow-hidden relative">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/20 rounded-full blur-[80px]" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-[60px]" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
            <Shield size={20} className="text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold">Website Protection</h3>
            <p className="text-blue-300/60 text-xs font-medium">Keep your site safe and running</p>
          </div>
        </div>

        {/* Current status */}
        {!isPro && (
          <div className="mb-6 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex items-center gap-2">
            <CheckCircle2 className="text-emerald-400" size={14} />
            <span className="text-emerald-300 text-xs font-bold">Base protection active</span>
          </div>
        )}

        {/* Tier Toggle */}
        <div className="flex gap-2 mb-6">
          {PROTECTION_TIERS.map(tier => (
            <button
              key={tier.name}
              onClick={() => setExpanded(expanded && tier.name === 'Pro' ? false : tier.name === 'Pro' ? true : false)}
              className={`flex-1 p-4 rounded-xl border transition-all ${
                tier.highlighted && !isPro
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-white'
                  : isPro && tier.name === 'Pro'
                  ? 'bg-blue-500/10 border-blue-500/30 text-white'
                  : 'bg-white/5 border-white/10 text-slate-400'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <span className="text-[10px] font-black uppercase tracking-widest">{tier.name}</span>
                {tier.name === 'Pro' && !isPro && (
                  <span className="text-[9px] font-black text-emerald-400 bg-emerald-400/20 px-1.5 py-0.5 rounded uppercase">Recommended</span>
                )}
              </div>
              <div className="text-left">
                <span className="text-2xl font-black">${tier.price}</span>
                <span className="text-slate-400 text-sm">{tier.period}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Expanded features */}
        {expanded && !isPro && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="mb-6 space-y-3"
          >
            <div>
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Pro includes:</p>
              <ul className="space-y-2">
                {PROTECTION_TIERS[1].features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle2 className="text-emerald-400 shrink-0 mt-0.5" size={14} />
                    <span className="text-slate-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        )}

        {/* CTA */}
        {!isPro ? (
          <div className="space-y-3">
            <button className="w-full py-4 bg-white text-slate-900 rounded-xl font-black hover:bg-slate-100 transition-all text-sm flex items-center justify-center gap-2 group">
              {expanded ? 'Downgrade to Base' : 'Upgrade to Pro'}
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>
            {expanded && (
              <p className="text-[10px] text-slate-500 text-center font-medium">
                Cancel anytime after 30 days. No refunds on completed months.
              </p>
            )}
          </div>
        ) : (
          <div className="py-3 text-center">
            <p className="text-emerald-400 text-sm font-bold flex items-center justify-center gap-2">
              <CheckCircle2 size={16} />
              Pro protection active
            </p>
            <p className="text-slate-500 text-xs mt-1">Managed by RevFi • $399/mo</p>
          </div>
        )}
      </div>
    </section>
  );
}

// For clients without any protection yet (no currentTier = 'none')
export function WebsiteProtectionPitch() {
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

        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm text-slate-300">
            <CheckCircle2 className="text-emerald-400 shrink-0" size={16} />
            Malware detection + removal
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-300">
            <CheckCircle2 className="text-emerald-400 shrink-0" size={16} />
            Daily automated backups
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-300">
            <CheckCircle2 className="text-emerald-400 shrink-0" size={16} />
            Plugin + core WordPress updates
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-300">
            <CheckCircle2 className="text-emerald-400 shrink-0" size={16} />
            99.9% uptime monitoring
          </div>
        </div>

        <button className="w-full mt-6 py-4 bg-emerald-500 text-white rounded-xl font-black hover:bg-emerald-600 transition-all text-sm flex items-center justify-center gap-2 group">
          Add Website Protection
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
}