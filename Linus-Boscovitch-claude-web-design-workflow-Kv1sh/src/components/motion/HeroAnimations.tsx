'use client'

import { useEffect } from 'react'

export function HeroAnimations() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('.hero-animate')
    if (!elements.length) return

    elements.forEach((el, i) => {
      el.style.opacity = '0'
      el.style.transform = 'translateY(30px) scale(0.97)'

      const delay = i * 120

      setTimeout(() => {
        el.style.transition = 'opacity 0.7s ease-out, transform 0.7s ease-out'
        el.style.opacity = '1'
        el.style.transform = 'translateY(0px) scale(1)'
      }, delay)
    })
  }, [])

  return null
}
