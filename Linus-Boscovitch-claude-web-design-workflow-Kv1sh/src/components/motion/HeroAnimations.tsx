'use client'

import { useEffect } from 'react'
import { animate } from 'motion'

export function HeroAnimations() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('.hero-animate')
    if (!elements.length) return

    elements.forEach((el, i) => {
      animate(
        el,
        { opacity: [0, 1], y: [30, 0], scale: [0.97, 1] },
        { duration: 0.7, delay: i * 0.12, easing: 'ease-out' }
      )
    })
  }, [])

  return null
}
