'use client'

import { motion } from 'motion/react'
import { Button } from '@/components/ui/Button'

export function HeroAnimated() {
  return (
    <div className="max-w-5xl mx-auto w-full">
      <motion.p
        className="eyebrow text-cobalt mb-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        Web Design · SEO · Lead Generation — Atlanta &amp; The Southeast
      </motion.p>
      <motion.h1
        className="font-heading font-bold text-white mb-6 leading-none"
        style={{ fontSize: '72px', letterSpacing: '-0.04em' }}
        initial={{ opacity: 0, y: 24, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, delay: 0.1, ease: 'easeOut' }}
      >
        Your competitors are ranking.
        <br />
        You should be too.
      </motion.h1>
      <motion.p
        className="text-white/70 mb-10 max-w-2xl"
        style={{ fontSize: '18px', lineHeight: '1.6' }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.25, ease: 'easeOut' }}
      >
        We build websites that generate leads, run SEO that drives revenue, and deliver qualified prospects to B2B service companies where every deal matters.
      </motion.p>
      <motion.div
        className="flex flex-wrap gap-4"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4, ease: 'easeOut' }}
      >
        <Button href="/book-a-call" size="lg">Book a Call →</Button>
        <Button href="/results" variant="ghost" size="lg">See Our Results</Button>
      </motion.div>
    </div>
  )
}
