'use client'

export function SubscribeForm() {
  return (
    <form
      className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
      onSubmit={(e) => e.preventDefault()}
    >
      <input
        type="email"
        placeholder="your@email.com"
        className="flex-1 px-4 py-3 border border-slate/20 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-cobalt"
      />
      <button
        type="submit"
        className="bg-cobalt text-white px-6 py-3 rounded-lg text-sm font-medium hover:bg-cobalt-hover transition-colors whitespace-nowrap"
      >
        Subscribe →
      </button>
    </form>
  )
}
