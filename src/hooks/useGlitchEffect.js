import { useEffect } from 'react'

const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function useGlitchEffect(domainNameRefs) {
  useEffect(() => {
    if (prefersReducedMotion) return

    let timeoutId = null

    function triggerGlitch() {
      const refs = domainNameRefs.current.filter(Boolean)
      if (refs.length === 0) return

      const domain = refs[Math.floor(Math.random() * refs.length)]
      const steps = [
        { transform: 'translateX(3px) skewX(-2deg)', opacity: '0.85', duration: 50 },
        { transform: 'translateX(-2px) skewX(1deg)', opacity: '0.9', duration: 50 },
        { transform: 'translateX(1px)', opacity: '0.95', duration: 40 },
        { transform: '', opacity: '', duration: 0 },
      ]

      let i = 0
      function runStep() {
        if (i >= steps.length) return
        domain.style.transform = steps[i].transform
        domain.style.opacity = steps[i].opacity
        if (steps[i].duration > 0) {
          i++
          setTimeout(runStep, steps[i - 1].duration)
        }
      }
      runStep()

      timeoutId = setTimeout(triggerGlitch, Math.random() * 8000 + 4000)
    }

    timeoutId = setTimeout(triggerGlitch, 3000)

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [domainNameRefs])
}
