'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'motion/react'

interface StatCounterProps {
  value: number
  suffix?: string
  prefix?: string
  isText?: boolean
  displayText?: string
}

export function StatCounter({ value, suffix = '', prefix = '', isText = false, displayText }: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })
  const [count, setCount] = useState(0)
  const hasStarted = useRef(false)

  useEffect(() => {
    if (!isInView || hasStarted.current || isText) return
    hasStarted.current = true

    const duration = 1200
    const startTime = performance.now()

    function tick(now: number) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * value))
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [isInView, value, isText])

  if (isText && displayText) {
    return <span ref={ref}>{displayText}</span>
  }

  return (
    <span ref={ref}>
      {prefix}{count}{suffix}
    </span>
  )
}
