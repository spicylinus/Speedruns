'use client'

import { useState } from 'react'

// ─────────────────────────────────────────────────────────────
// GHL WEBHOOK URL
// In GHL: Automation → Create Workflow → Trigger: Webhook
// Copy the webhook URL and paste it here.
// ─────────────────────────────────────────────────────────────
const GHL_WEBHOOK_URL = 'YOUR_GHL_WEBHOOK_URL'
// ─────────────────────────────────────────────────────────────

type Status = 'idle' | 'sending' | 'success' | 'error'

export function ContactForm() {
  const [status, setStatus] = useState<Status>('idle')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    message: '',
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')

    try {
      const res = await fetch(GHL_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          // Standard GHL contact fields
          firstName: formData.name.split(' ')[0] ?? formData.name,
          lastName: formData.name.split(' ').slice(1).join(' ') ?? '',
          email: formData.email,
          message: formData.message,
          // Custom fields — map to your GHL custom field IDs if needed
          service_interest: formData.service,
          source: 'sociallinus.com/contact',
        }),
      })

      if (res.ok) {
        setStatus('success')
        setFormData({ name: '', email: '', service: '', message: '' })
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <div className="rounded-xl border border-cobalt/20 bg-frost p-8 text-center">
        <p className="font-display font-semibold text-void mb-2" style={{ fontSize: '20px' }}>
          Message received.
        </p>
        <p className="text-slate text-sm">We&apos;ll be in touch within one business day.</p>
      </div>
    )
  }

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="eyebrow text-slate block mb-2">Name</label>
        <input
          name="name"
          type="text"
          required
          value={formData.name}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-slate/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cobalt"
          placeholder="Your name"
        />
      </div>
      <div>
        <label className="eyebrow text-slate block mb-2">Email</label>
        <input
          name="email"
          type="email"
          required
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-slate/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cobalt"
          placeholder="your@email.com"
        />
      </div>
      <div>
        <label className="eyebrow text-slate block mb-2">Service Interest</label>
        <select
          name="service"
          value={formData.service}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-slate/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cobalt bg-white"
        >
          <option value="">Select a service</option>
          <option value="web-design">Web Design</option>
          <option value="seo">SEO</option>
          <option value="lead-generation">Lead Generation</option>
          <option value="all">All Three</option>
          <option value="unsure">Not Sure Yet</option>
        </select>
      </div>
      <div>
        <label className="eyebrow text-slate block mb-2">Message</label>
        <textarea
          name="message"
          rows={4}
          required
          value={formData.message}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-slate/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cobalt resize-none"
          placeholder="Tell us about your business and what you're trying to accomplish."
        />
      </div>

      {status === 'error' && (
        <p className="text-sm text-red-600">
          Something went wrong. Email us directly at hello@sociallinus.com.
        </p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full bg-cobalt hover:bg-cobalt-hover disabled:opacity-60 text-white font-medium px-6 py-3 rounded-lg transition-colors"
      >
        {status === 'sending' ? 'Sending…' : 'Send Message →'}
      </button>
    </form>
  )
}
