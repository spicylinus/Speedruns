'use client'

import { motion } from 'motion/react'

interface Post {
  title: string
  excerpt: string
  category: string
  target: string
}

const categoryColor: Record<string, string> = {
  'Web Design': 'text-cobalt bg-cobalt/8',
  'SEO': 'text-cobalt bg-cobalt/8',
  'Lead Generation': 'text-cobalt bg-cobalt/8',
}

export function PostGrid({ posts }: { posts: Post[] }) {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
      {posts.map((post, i) => (
        <motion.div
          key={post.title}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.45, delay: i * 0.07 }}
          className="bg-frost rounded-2xl p-6 border border-frost hover:border-cobalt/20 transition-colors flex flex-col"
        >
          <div className="flex items-center justify-between mb-4">
            <span className={`eyebrow px-2 py-1 rounded text-xs ${categoryColor[post.category]}`}>{post.category}</span>
            <span className="eyebrow text-slate/50 text-xs bg-slate/8 px-2 py-1 rounded">Coming Soon</span>
          </div>
          <h3 className="font-display font-semibold text-void mb-3 flex-1" style={{ fontSize: '17px', letterSpacing: '-0.01em', lineHeight: '1.3' }}>{post.title}</h3>
          <p className="text-slate text-sm leading-relaxed mb-4">{post.excerpt}</p>
          <p className="font-mono text-slate/40" style={{ fontSize: '10px', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Target: {post.target}</p>
        </motion.div>
      ))}
    </div>
  )
}
