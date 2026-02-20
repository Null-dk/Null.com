import { useEffect, useRef } from 'react'

const isTouchDevice =
  typeof window !== 'undefined' &&
  ('ontouchstart' in window || navigator.maxTouchPoints > 0)
const prefersReducedMotion =
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const SPACING = 28        // dot grid spacing (px) — matches CSS bg-grid
const DOT_RADIUS = 0.9    // base dot radius
const ATTRACT_RADIUS = 180 // influence zone around cursor
const ATTRACT_STRENGTH = 0.38 // how far dots are pulled (fraction of spacing)
const SPRING = 0.12       // spring stiffness back to origin
const DAMPING = 0.72      // velocity damping

export function useParticleField(canvasRef) {
  const mouseRef = useRef({ x: -9999, y: -9999 })
  const ripplesRef = useRef([])       // { x, y, r, maxR, alpha, speed }
  const dotsRef = useRef([])
  const rafRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let W = 0
    let H = 0

    // ── Build dot grid ────────────────────────────────────────────────────────
    function buildGrid() {
      W = window.innerWidth
      H = window.innerHeight
      canvas.width = W
      canvas.height = H

      const cols = Math.ceil(W / SPACING) + 1
      const rows = Math.ceil(H / SPACING) + 1
      const dots = []

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          const ox = col * SPACING
          const oy = row * SPACING
          dots.push({
            ox, oy,           // origin
            x: ox, y: oy,     // current position
            vx: 0, vy: 0,     // velocity
          })
        }
      }
      dotsRef.current = dots
    }

    // ── Vignette mask opacity for a dot (centre = 1, edges → 0) ──────────────
    function vignetteAlpha(x, y) {
      const nx = (x / W - 0.5) * 2        // -1…1
      const ny = (y / H - 0.45) * 2.22   // shifted slightly upward
      const d = Math.sqrt(nx * nx * 0.9 + ny * ny * 0.8)
      // fade from 1 at d=0 to 0 at d≈1
      return Math.max(0, 1 - Math.pow(d, 1.6))
    }

    // ── Main render loop ──────────────────────────────────────────────────────
    function draw() {
      ctx.clearRect(0, 0, W, H)

      const mx = mouseRef.current.x
      const my = mouseRef.current.y
      const dots = dotsRef.current

      // — update & draw dots ——————————————————————————
      for (let i = 0; i < dots.length; i++) {
        const d = dots[i]

        if (!prefersReducedMotion && !isTouchDevice) {
          const dx = mx - d.ox
          const dy = my - d.oy
          const dist = Math.sqrt(dx * dx + dy * dy)

          if (dist < ATTRACT_RADIUS && dist > 0) {
            // Quadratic falloff attraction — strongest at centre
            const falloff = 1 - dist / ATTRACT_RADIUS
            const strength = falloff * falloff * ATTRACT_STRENGTH * SPACING
            d.vx += (dx / dist) * strength * 0.3
            d.vy += (dy / dist) * strength * 0.3
          }

          // Spring back to origin
          d.vx += (d.ox - d.x) * SPRING
          d.vy += (d.oy - d.y) * SPRING

          // Damp
          d.vx *= DAMPING
          d.vy *= DAMPING

          d.x += d.vx
          d.y += d.vy
        }

        // Opacity: base 0.12, boosted near cursor
        const screenDx = mx - d.x
        const screenDy = my - d.y
        const screenDist = Math.sqrt(screenDx * screenDx + screenDy * screenDy)
        const proximityBoost = Math.max(0, 1 - screenDist / ATTRACT_RADIUS)
        const baseAlpha = vignetteAlpha(d.ox, d.oy) * 0.12
        const alpha = baseAlpha + proximityBoost * proximityBoost * 0.35

        if (alpha < 0.005) continue

        // Radius grows slightly near cursor
        const r = DOT_RADIUS + proximityBoost * 0.8

        ctx.beginPath()
        ctx.arc(d.x, d.y, r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${alpha.toFixed(3)})`
        ctx.fill()
      }

      // — draw ripples ————————————————————————————————
      const ripples = ripplesRef.current
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i]
        rp.r += rp.speed
        rp.alpha -= 0.012 + rp.r * 0.00012

        if (rp.alpha <= 0) { ripples.splice(i, 1); continue }

        ctx.beginPath()
        ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2)
        ctx.strokeStyle = `rgba(255,255,255,${rp.alpha.toFixed(3)})`
        ctx.lineWidth = 0.8
        ctx.stroke()

        // Second inner ring — slightly behind
        if (rp.r > 20) {
          const innerR = rp.r * 0.72
          const innerAlpha = rp.alpha * 0.4
          ctx.beginPath()
          ctx.arc(rp.x, rp.y, innerR, 0, Math.PI * 2)
          ctx.strokeStyle = `rgba(255,255,255,${innerAlpha.toFixed(3)})`
          ctx.lineWidth = 0.5
          ctx.stroke()
        }
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    // ── Events ────────────────────────────────────────────────────────────────
    function onMouseMove(e) {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }

    function onMouseLeave() {
      mouseRef.current = { x: -9999, y: -9999 }
    }

    function onClick(e) {
      if (prefersReducedMotion || isTouchDevice) return
      if (ripplesRef.current.length >= 6) ripplesRef.current.shift()
      ripplesRef.current.push({
        x: e.clientX,
        y: e.clientY,
        r: 4,
        maxR: 260,
        alpha: 0.5,
        speed: 3.2,
      })
    }

    function onResize() {
      buildGrid()
    }

    function onVisibilityChange() {
      if (document.hidden) {
        if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null }
      } else if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(draw)
      }
    }

    // ── Init ──────────────────────────────────────────────────────────────────
    buildGrid()

    if (!isTouchDevice) {
      document.addEventListener('mousemove', onMouseMove, { passive: true })
      document.addEventListener('mouseleave', onMouseLeave)
      document.addEventListener('click', onClick)
    }

    window.addEventListener('resize', onResize)
    document.addEventListener('visibilitychange', onVisibilityChange)
    rafRef.current = requestAnimationFrame(draw)

    return () => {
      if (!isTouchDevice) {
        document.removeEventListener('mousemove', onMouseMove)
        document.removeEventListener('mouseleave', onMouseLeave)
        document.removeEventListener('click', onClick)
      }
      window.removeEventListener('resize', onResize)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [canvasRef])
}
