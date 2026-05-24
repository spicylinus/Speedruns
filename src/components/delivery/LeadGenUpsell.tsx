'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Target, CheckCircle2, ArrowRight, Mail, BarChart3, Users, Zap } from 'lucide-react';

interface LeadGenTier {
  name: string;
  price: number;
  period: string;
  features: string[];
  highlighted?: boolean;
  badge?: string;
}

const LEADGEN_TIERS: LeadGenTier[] = [
  {
    name: 'Base',
    price: 997,
    period: '/mo',
    features: [
      'CRM setup + configuration',
      'Lead routing (email, SMS, phone)',
      'Automated follow-up sequences',
      'Lead pipeline dashboard',
      'Weekly lead report',
    ],
  },
  {
    name: 'Pro',
    price: 1997,
    period: '/mo',
    highlighted: true,
    badge: 'Recommended',
    features: [
      'Everything in Base',
      'A/B testing on lead forms + CTAs',
      'Conversion rate optimization',
      'Custom reporting dashboard (real-time)',
      'Priority email + chat support',
      'Monthly strategy review call',
    ],
  },
  {
    name: 'Elite',
    price: 2697,
    period: '/mo',
    features: [
      'Everything in Pro',
      'Dedicated growth manager (named contact)',
      'Weekly strategy calls',
      'Full-funnel attribution reporting',
      'Priority feature requests',
    ],
  },
];

export default function LeadGenUpsell({ currentTier = 'none' }: { currentTier?: 'base' | 'pro' | 'elite' | 'none' }) {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);
  const isActive = currentTier !== 'none';

  const activeTierIndex = currentTier !== 'none'
    ? LEADGEN_TIERS.findIndex(t => t.name.toLowerCase() === currentTier)
    : -1;

  return (
    <section className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 px-8 py-6 text-white">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
            <Target size={20} className="text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold">Lead Gen Manager</h3>
            <p className="text-slate-400 text-xs">Turn your traffic into appointments</p>
          </div>
        </div>
      </div>

      {/* Current status */}
      {isActive && activeTierIndex >= 0 && (
        <div className="px-8 py-4 bg-blue-50 border-b border-blue-100 flex items-center gap-2">
          <CheckCircle2 className="text-blue-600" size={14} />
          <span className="text-blue-700 text-xs font-bold">
            {LEADGEN_TIERS[activeTierIndex].name} tier active
          </span>
        </div>
      )}

      {/* Tier cards */}
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          {LEADGEN_TIERS.map((tier, index) => {
            const isCurrentTier = currentTier !== 'none' && tier.name.toLowerCase() === currentTier;
            const isUpgrade = isActive && index > activeTierIndex;

            return (
              <div
                key={tier.name}
                className={`relative rounded-2xl border-2 p-6 transition-all ${
                  tier.highlighted
                    ? 'border-blue-200 bg-blue-50/30'
                    : isCurrentTier
                    ? 'border-emerald-200 bg-emerald-50/30'
                    : 'border-slate-200 bg-slate-50/30'
                } ${isUpgrade ? 'opacity-80' : ''}`}
              >
                {tier.badge && (
                  <div className="absolute -top-3 left-4">
                    <span className="bg-blue-500 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
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
                      <CheckCircle2 className={`shrink-0 mt-0.5 ${tier.highlighted ? 'text-blue-500' : 'text-slate-400'}`} size={12} />
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
                        ? 'bg-blue-500 text-white hover:bg-blue-600'
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
                {selectedTier} selected — ${LEADGEN_TIERS.find(t => t.name === selectedTier)?.price.toLocaleString()}/mo
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

export function LeadGenPitch() {
  return (
    <section className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 text-white overflow-hidden relative border border-slate-700">
      <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500/20 rounded-full blur-[80px]" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
            <Target size={20} className="text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-bold">Lead Gen Manager</h3>
            <p className="text-slate-400 text-xs">We fill your pipeline while you focus on clients</p>
          </div>
        </div>

        <p className="text-slate-300 text-sm mb-6 leading-relaxed">
          We build and manage your lead flow — CRM, routing, automated follow-ups, and optimization. Starting at <span className="text-white font-bold">$997/mo</span>.
        </p>

        <div className="space-y-3 mb-6">
          {[
            { icon: <Mail size={14} />, text: 'CRM setup + automated follow-up sequences' },
            { icon: <BarChart3 size={14} />, text: 'Lead pipeline dashboard + weekly reports' },
            { icon: <Users size={14} />, text: 'A/B testing on forms and CTAs' },
            { icon: <Zap size={14} />, text: 'Conversion rate optimization' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-slate-300">
              <span className="text-blue-400 shrink-0">{item.icon}</span>
              {item.text}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-3 mb-6">
          <div className="bg-white/5 rounded-xl p-3 text-center border border-white/10">
            <p className="text-[10px] font-black text-slate-500 uppercase mb-1">Base</p>
            <p className="text-xl font-black">$997<span className="text-sm font-normal text-slate-400">/mo</span></p>
          </div>
          <div className="bg-blue-500/10 rounded-xl p-3 text-center border border-blue-500/20">
            <p className="text-[10px] font-black text-blue-400 uppercase mb-1">Pro</p>
            <p className="text-xl font-black">$1,997<span className="text-sm font-normal text-blue-300">/mo</span></p>
          </div>
          <div className="bg-white/5 rounded-xl p-3 text-center border border-white/10">
            <p className="text-[10px] font-black text-slate-500 uppercase mb-1">Elite</p>
            <p className="text-xl font-black">$2,697<span className="text-sm font-normal text-slate-400">/mo</span></p>
          </div>
        </div>

        <button className="w-full py-4 bg-blue-500 text-white rounded-xl font-black hover:bg-blue-600 transition-all text-sm flex items-center justify-center gap-2 group">
          Add Lead Gen Manager
          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </section>
  );
}