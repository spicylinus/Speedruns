'use client';

import React, { useEffect, useState, useRef } from 'react';
import { 
  Zap, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle,
  Gift,
  Flame,
  ArrowLeft,
  Mail,
  User,
  CreditCard,
  Clock,
  Star,
  X,
  FileText,
  Layers,
  Rocket,
  MessageSquare
} from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

interface Bump {
  id: string;
  name: string;
  description: string;
  price: number;
  icon: React.ReactNode;
}

const BUMPS: Bump[] = [
  {
    id: 'content-writing',
    name: 'Content Writing',
    description: 'We write all 5 pages — headlines, copy, CTAs. You just approve.',
    price: 1500,
    icon: <FileText size={20} />,
  },
  {
    id: 'extra-revision',
    name: 'Extra Revision Round',
    description: 'Third round of revisions for copy and images. Peace of mind.',
    price: 500,
    icon: <Layers size={20} />,
  },
  {
    id: 'priority-launch',
    name: 'Priority Launch',
    description: 'Your project jumps to the front. Site live in 2 weeks instead of 4.',
    price: 1000,
    icon: <Rocket size={20} />,
  },
  {
    id: 'review-management',
    name: 'Reputation Management',
    description: 'We request reviews, monitor responses, manage your online reputation. 90 days.',
    price: 900,
    icon: <Star size={20} />,
  },
];

const OTO_OFFER = {
  name: '6-Month Lead Gen Management',
  description: 'We manage your lead flow, automate follow-ups, and optimize for conversions. 6 months prepaid.',
  price: 4997,
  originalPrice: 5982,
  savings: 985,
};

export default function UpsellPage() {
  const params = useParams();
  const router = useRouter();
  const offerId = params.offerId as string;
  const [offer, setOffer] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [paymentOption, setPaymentOption] = useState<'full' | 'split'>('full');
  const [selectedBumps, setSelectedBumps] = useState<Set<string>>(new Set());
  const [showOto, setShowOto] = useState(false);
  const [otoTimeLeft, setOtoTimeLeft] = useState(8 * 60); // 8 minutes in seconds
  const [otoAccepted, setOtoAccepted] = useState(false);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [success, setSuccess] = useState(false);
  const otoTriggered = useRef(false);

  useEffect(() => {
    async function fetchOffer() {
      try {
        const res = await fetch('/api/offers');
        const data = await res.json();
        const found = data.offers.find((o: any) => o.id === offerId);
        setOffer(found);
      } catch (err) {
        console.error('Failed to fetch offer');
      } finally {
        setLoading(false);
      }
    }
    fetchOffer();
  }, [offerId]);

  // OTO countdown timer
  useEffect(() => {
    if (!showOto || otoAccepted) return;
    const interval = setInterval(() => {
      setOtoTimeLeft(prev => {
        if (prev <= 1) {
          setShowOto(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [showOto, otoAccepted]);

  const toggleBump = (id: string) => {
    setSelectedBumps(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const bumpsTotal = Array.from(selectedBumps).reduce((sum, id) => {
    const bump = BUMPS.find(b => b.id === id);
    return sum + (bump?.price || 0);
  }, 0);

  const getBaseAmount = () => {
    if (!offer) return 0;
    return paymentOption === 'full' 
      ? offer.paid_in_full_price 
      : offer.deposit;
  };

  const getTotalAmount = () => getBaseAmount() + bumpsTotal;

  const handleAccept = async () => {
    if (!email || !email.includes('@')) {
      alert('Please enter a valid email address.');
      return;
    }
    
    setProcessing(true);
    try {
      const custRes = await fetch('/api/customers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name })
      });
      const custData = await custRes.json();
      
      if (custData.status !== 'success') {
        throw new Error(custData.message || 'Failed to create customer');
      }

      const customerId = custData.data.id;
      const bumpsList = Array.from(selectedBumps).map(id => {
        const bump = BUMPS.find(b => b.id === id);
        return bump ? { id: bump.id, name: bump.name, price: bump.price } : null;
      }).filter(Boolean);
      const baseAmount = getBaseAmount();
      const otoAmount = otoAccepted ? OTO_OFFER.price : 0;

      const invRes = await fetch('/api/invoices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerId,
          amount: baseAmount,
          description: `Grand Slam: ${paymentOption === 'full' ? 'Paid in Full' : 'Deposit'} — ${offer.name}`,
          bumps: bumpsList,
          otoAmount,
          otoName: otoAccepted ? OTO_OFFER.name : null,
        })
      });
      const invData = await invRes.json();
      
      if (invData.status === 'success') {
        setSuccess(true);
        if (invData.data.url) {
          window.location.href = invData.data.url;
        }
      } else {
        throw new Error(invData.message || 'Failed to create invoice');
      }
    } catch (err: any) {
      alert(err.message || 'Failed to process. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white font-bold">Loading Premium Offer...</div>;
  if (!offer) return <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white font-bold text-xl">Offer not found</div>;

  if (success) {
    return (
      <main className="min-h-screen bg-slate-900 text-white flex items-center justify-center p-6">
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full bg-white text-slate-900 rounded-[40px] p-12 text-center shadow-2xl"
        >
          <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 size={40} />
          </div>
          <h2 className="text-3xl font-black mb-4 uppercase italic">You're In!</h2>
          <p className="text-slate-500 mb-8 font-medium">
            We've created your secure Stripe payment portal and sent the details to <span className="font-bold text-slate-900">{email}</span>. Once the deposit is confirmed, we'll get your project started immediately and you'll have access to your client dashboard within 24 hours.
          </p>
          <button 
            onClick={() => router.push('/delivery/')}
            className="w-full py-4 bg-slate-900 text-white rounded-2xl font-bold hover:bg-slate-800 transition-all"
          >
            Go to Client Dashboard
          </button>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-900 text-white selection:bg-emerald-500 selection:text-white">
      <AnimatePresence>
        {/* OTO Modal */}
        {showOto && !otoAccepted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-slate-900/90 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative bg-white text-slate-900 rounded-[32px] p-10 md:p-14 max-w-lg w-full shadow-2xl text-center"
            >
              <button 
                onClick={() => setShowOto(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={24} />
              </button>

              {/* Timer */}
              <div className="flex items-center justify-center gap-2 text-red-600 font-black text-sm mb-4 uppercase tracking-widest">
                <Clock size={16} />
                Offer expires in
                <span className="text-2xl tabular-nums">{formatTime(otoTimeLeft)}</span>
              </div>

              <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center text-white mx-auto mb-6">
                <Zap size={28} />
              </div>

              <p className="text-[10px] font-black text-red-600 uppercase tracking-widest mb-2">One-Time Add-On</p>
              <h3 className="text-2xl md:text-3xl font-black mb-3">{OTO_OFFER.name}</h3>
              <p className="text-slate-500 mb-6 font-medium">{OTO_OFFER.description}</p>

              <div className="flex items-center justify-center gap-3 mb-8">
                <span className="text-4xl font-black">${OTO_OFFER.price.toLocaleString()}</span>
                <div className="text-left">
                  <span className="block text-sm font-bold line-through text-slate-300">${OTO_OFFER.originalPrice.toLocaleString()}</span>
                  <span className="block text-xs font-black text-emerald-600">Save ${OTO_OFFER.savings}</span>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => { setOtoAccepted(true); setShowOto(false); }}
                  className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black hover:bg-emerald-700 transition-all"
                >
                  YES — Add to My Order
                </button>
                <button
                  onClick={() => setShowOto(false)}
                  className="w-full py-3 text-slate-400 font-bold hover:text-slate-600 transition-colors text-sm"
                >
                  No thanks, I'll skip this
                </button>
              </div>

              <p className="mt-6 text-[10px] text-slate-400 font-medium uppercase tracking-widest">
                This offer will not be extended. Not available later.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-600/20 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12 md:py-24">
        <Link href="/" className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-12">
          <ArrowLeft size={16} />
          Back to Audit
        </Link>

        {/* Hero Section */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 font-bold text-xs uppercase tracking-widest mb-6"
          >
            <Flame size={14} />
            Limited Time — Paid in Full Offer
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-black mb-6 leading-tight uppercase italic tracking-tighter"
          >
            The <span className="text-emerald-400 underline decoration-emerald-400/30">Grand Slam</span> Package
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-400 max-w-2xl mx-auto font-medium"
          >
            {offer.description}
          </motion.p>
        </div>

        {/* Offer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/50 p-8 rounded-3xl"
          >
            <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-400 mb-6">
              <Zap size={24} />
            </div>
            <h3 className="text-2xl font-bold mb-6 uppercase tracking-tight">What You Get</h3>
            <ul className="space-y-4">
            {offer.deliverables && offer.deliverables.map((detail: string, i: number) => (
              <li key={i} className="flex gap-3 text-slate-300">
                <CheckCircle2 className="text-emerald-400 shrink-0" size={20} />
                <span className="font-medium">{detail}</span>
              </li>
            ))}
            </ul>

            {offer.excluded && offer.excluded.length > 0 && (
            <div className="mt-6 pt-6 border-t border-slate-700">
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-3">Not Included</p>
              <ul className="space-y-2">
                {offer.excluded.map((ex: string, i: number) => (
                  <li key={i} className="flex gap-3 text-slate-500 text-sm">
                    <span className="text-slate-600 shrink-0">—</span>
                    <span>{ex}</span>
                  </li>
                ))}
              </ul>
            </div>
            )}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-emerald-500/5 backdrop-blur-sm border border-emerald-500/20 p-8 rounded-3xl"
          >
            <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-400 mb-6">
              <ShieldCheck size={24} />
            </div>
            <h3 className="text-2xl font-bold mb-6 uppercase tracking-tight">The Completion Guarantee</h3>
            <div className="space-y-6">
            {offer.guarantee && (
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-emerald-50 text-lg leading-relaxed">
                  {offer.guarantee}
                </p>
              </div>
            )}
            {offer.flat_fee_guarantee && (
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                <span className="block text-[10px] font-black text-blue-400 uppercase tracking-widest mb-2">Revisions</span>
                <p className="text-blue-50 text-base leading-relaxed">
                  {offer.flat_fee_guarantee}
                </p>
              </div>
            )}
            {offer.cancellation_policy && (
              <div className="p-4 bg-white/5 rounded-2xl border border-white/10">
                <span className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Cancellations</span>
                <p className="text-slate-300 text-base leading-relaxed">
                  {offer.cancellation_policy}
                </p>
              </div>
            )}
            </div>

            {offer.bonuses && offer.bonuses.length > 0 && (
              <div className="mt-8 p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20">
                <div className="flex items-center gap-2 mb-3">
                  <Gift className="text-emerald-400" size={20} />
                  <span className="block font-black text-emerald-400 uppercase tracking-widest text-xs">Paid in Full Bonus</span>
                </div>
                <ul className="space-y-2">
                  {offer.bonuses.map((bonus: string, i: number) => (
                    <li key={i} className="flex gap-2 text-emerald-100/80 text-sm">
                      <CheckCircle2 className="text-emerald-400 shrink-0" size={16} />
                      {bonus}
                    </li>
                  ))}
                </ul>
                {offer.bonus_condition && (
                  <p className="mt-3 text-[10px] text-emerald-400/60 font-medium uppercase tracking-widest">
                    {offer.bonus_condition}
                  </p>
                )}
              </div>
            )}
          </motion.div>
        </div>

        {/* Payment Options */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white text-slate-900 rounded-[40px] p-10 md:p-16 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 p-8">
             <div className="flex items-center gap-2 text-slate-300 font-bold text-xs uppercase opacity-40">
               <CreditCard size={16} />
               Secure Checkout
             </div>
          </div>
          
          <h2 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 mb-8">Choose Your Plan</h2>
          
          {/* Payment Option Toggle */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {/* Paid in Full */}
            <button
              onClick={() => {
                setPaymentOption('full');
                if (!otoTriggered.current) {
                  otoTriggered.current = true;
                  setShowOto(true);
                }
              }}
              className={`relative p-6 rounded-2xl border-2 text-left transition-all ${
                paymentOption === 'full'
                  ? 'border-slate-900 bg-slate-50 shadow-lg'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              {paymentOption === 'full' && (
                <div className="absolute -top-3 left-4">
                  <span className="bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                    Best Value
                  </span>
                </div>
              )}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">Paid in Full</p>
                  <span className="text-4xl font-black tracking-tighter">
                    ${offer.paid_in_full_price?.toLocaleString()}
                  </span>
                </div>
                {offer.paid_in_full_savings && (
                  <span className="text-xs font-black text-white bg-emerald-500 px-2 py-1 rounded">
                    Save ${offer.paid_in_full_savings.toLocaleString()}
                  </span>
                )}
              </div>
              <p className="text-sm text-slate-500 font-medium mb-4">
                {offer.split?.label || 'One payment, done today'}
              </p>
              <div className="space-y-1">
                {offer.bonuses?.map((bonus: string, i: number) => (
                  <div key={i} className="flex items-center gap-2 text-emerald-700 text-sm font-medium">
                    <CheckCircle2 className="text-emerald-500" size={14} />
                    {bonus}
                  </div>
                ))}
              </div>
            </button>

            {/* Split Payment */}
            <button
              onClick={() => setPaymentOption('split')}
              className={`p-6 rounded-2xl border-2 text-left transition-all ${
                paymentOption === 'split'
                  ? 'border-slate-900 bg-slate-50 shadow-lg'
                  : 'border-slate-200 hover:border-slate-300'
              }`}
            >
              <div className="mb-4">
                <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Split Payment</p>
                <span className="text-4xl font-black tracking-tighter">
                  ${offer.deposit?.toLocaleString()}
                </span>
                <span className="text-lg font-bold text-slate-400"> today</span>
              </div>
              <p className="text-sm text-slate-500 font-medium mb-1">
                {offer.split?.label || '$3,000 when your site goes live'}
              </p>
              <p className="text-sm text-slate-400 font-medium">
                Total: ${offer.total_price?.toLocaleString()}
              </p>
              <p className="text-xs text-slate-500 font-medium mt-2 flex items-center gap-1">
                <AlertCircle size={12} />
                Site goes live when payment is received
              </p>
            </button>
          </div>

          {/* Immediate Bumps */}
          <div className="mb-10">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Add-Ons</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {BUMPS.map(bump => (
                <button
                  key={bump.id}
                  onClick={() => toggleBump(bump.id)}
                  className={`flex items-start gap-4 p-4 rounded-2xl border-2 text-left transition-all ${
                    selectedBumps.has(bump.id)
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className={`shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${
                    selectedBumps.has(bump.id) ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {bump.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between gap-2 mb-1">
                      <p className="font-black text-slate-900 text-sm">{bump.name}</p>
                      <span className="font-black text-slate-900 text-sm shrink-0">${bump.price.toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">{bump.description}</p>
                  </div>
                  {selectedBumps.has(bump.id) && (
                    <CheckCircle2 className="text-emerald-500 shrink-0 mt-1" size={16} />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Order Total */}
          {bumpsTotal > 0 && (
            <div className="mb-6 p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between">
              <div>
                <p className="text-sm font-bold text-slate-500">Selected add-ons</p>
                <p className="text-xs text-slate-400">{Array.from(selectedBumps).map(id => BUMPS.find(b => b.id === id)?.name).join(', ')}</p>
              </div>
              <span className="text-xl font-black text-slate-900">+${bumpsTotal.toLocaleString()}</span>
            </div>
          )}

          {/* Form + CTA */}
          <div className="max-w-md mx-auto space-y-4">
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="text" 
                placeholder="Your Full Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-slate-900 outline-none transition-all font-bold"
              />
            </div>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="email" 
                placeholder="Work Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-slate-900 outline-none transition-all font-bold"
              />
            </div>

            <div className="flex items-center gap-2 text-slate-500 text-xs py-4 justify-center font-medium">
              <AlertCircle size={14} />
              <span>Payments handled securely via Stripe.</span>
            </div>
            
            <button 
              onClick={handleAccept}
              disabled={processing}
              className="w-full py-6 bg-slate-900 text-white rounded-2xl text-xl font-black hover:bg-slate-800 transition-all shadow-xl flex items-center justify-center gap-3 group disabled:opacity-50"
            >
              {processing ? 'PROCESSING...' : (
                <>
                  {paymentOption === 'full' ? 'SECURE PAID IN FULL SPOT' : 'SECURE YOUR DEPOSIT'}
                  {selectedBumps.size > 0 && <span className="text-sm font-normal opacity-70">(+${bumpsTotal.toLocaleString()} add-ons)</span>}
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
            <p className="mt-4 text-[10px] text-slate-400 font-bold uppercase tracking-widest text-center">
              {paymentOption === 'full'
                ? 'Payment links sent immediately. Limited time offer.'
                : 'Site goes live when second payment is received.'}
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 border-t border-slate-100">
             {['High Performance', 'Mobile Optimized', 'Lead Focused', '24/7 Support'].map((badge, i) => (
               <div key={i} className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                 {badge}
               </div>
             ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
}