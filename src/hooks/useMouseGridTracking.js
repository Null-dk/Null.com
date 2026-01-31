import { useEffect, useRef } from 'react'

const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)
const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function useMouseGridTracking() {
  const rafRef = useRef(null)
  const currentRef = useRef(24)
  const targetRef = useRef(24)

  useEffect(() => {
    if (isTouchDevice || prefersReducedMotion) return

    const handleMouseMove = (e) => {
      targetRef.current = 20 + (e.clientX / window.innerWidth) * 8
    }

    function animate() {
      currentRef.current += (targetRef.current - currentRef.current) * 0.08
      document.documentElement.style.setProperty('--grid-size', `${currentRef.current}px`)
      rafRef.current = requestAnimationFrame(animate)
    }

    document.addEventListener('mousemove', handleMouseMove, { passive: true })
    rafRef.current = requestAnimationFrame(animate)

    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current)
          rafRef.current = null
        }
      } else if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(animate)
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])
}
