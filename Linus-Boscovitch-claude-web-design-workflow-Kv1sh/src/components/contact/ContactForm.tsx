'use client'

export function ContactForm() {
  return (
    <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
      <div>
        <label className="eyebrow text-slate block mb-2">Name</label>
        <input
          type="text"
          className="w-full px-4 py-3 border border-slate/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cobalt"
          placeholder="Your name"
        />
      </div>
      <div>
        <label className="eyebrow text-slate block mb-2">Email</label>
        <input
          type="email"
          className="w-full px-4 py-3 border border-slate/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cobalt"
          placeholder="your@email.com"
        />
      </div>
      <div>
        <label className="eyebrow text-slate block mb-2">Service Interest</label>
        <select className="w-full px-4 py-3 border border-slate/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cobalt bg-white">
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
          rows={4}
          className="w-full px-4 py-3 border border-slate/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cobalt resize-none"
          placeholder="Tell us about your business and what you're trying to accomplish."
        />
      </div>
      <button
        type="submit"
        className="w-full bg-cobalt hover:bg-cobalt-hover text-white font-medium px-6 py-3 rounded-lg transition-colors"
      >
        Send Message →
      </button>
    </form>
  )
}
