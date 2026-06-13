import { useEffect } from 'react'
import { generateSquircleDisplacement } from '../lib/squircleDisplacement'

const SVGNS = 'http://www.w3.org/2000/svg'
const XLINKNS = 'http://www.w3.org/1999/xlink'

let nextId = 0
let _supported = null

/**
 * True only where an SVG filter can be used as a `backdrop-filter` — currently
 * Chromium. Safari/Firefox keep the pure-CSS glass base instead.
 */
function refractionSupported() {
  if (_supported !== null) return _supported
  if (typeof window === 'undefined' || typeof CSS === 'undefined') {
    _supported = false
    return _supported
  }
  const ua = navigator.userAgent
  const isChromium = !!window.chrome && !/Firefox|FxiOS/.test(ua)
  const supportsBackdrop =
    CSS.supports?.('backdrop-filter', 'blur(1px)') ||
    CSS.supports?.('-webkit-backdrop-filter', 'blur(1px)')
  const supportsUrl = CSS.supports?.('backdrop-filter', 'url(#x)')
  _supported = !!(isChromium && supportsBackdrop && supportsUrl)
  return _supported
}

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

const isTouch = () =>
  typeof window !== 'undefined' &&
  ('ontouchstart' in window || navigator.maxTouchPoints > 0)

/**
 * Layers a real refraction (SVG displacement) backdrop-filter onto a glass
 * element, regenerating the displacement map to match the element's size.
 * No-op everywhere it isn't supported/appropriate, leaving the CSS glass base.
 */
export function useLiquidGlass(ref, { enabled = true, radius = 22, depth = 14, scale = 12 } = {}) {
  useEffect(() => {
    if (!enabled) return
    const el = ref.current
    if (!el) return
    if (!refractionSupported() || prefersReducedMotion() || isTouch()) return

    const defs = document.getElementById('glass-defs')
    if (!defs) return

    const id = `glass-${nextId++}`
    const filter = document.createElementNS(SVGNS, 'filter')
    filter.setAttribute('id', id)
    filter.setAttribute('color-interpolation-filters', 'sRGB')
    filter.setAttribute('x', '-20%')
    filter.setAttribute('y', '-20%')
    filter.setAttribute('width', '140%')
    filter.setAttribute('height', '140%')

    const feImage = document.createElementNS(SVGNS, 'feImage')
    feImage.setAttribute('preserveAspectRatio', 'none')
    feImage.setAttribute('result', 'map')

    const feDisp = document.createElementNS(SVGNS, 'feDisplacementMap')
    feDisp.setAttribute('in', 'SourceGraphic')
    feDisp.setAttribute('in2', 'map')
    feDisp.setAttribute('xChannelSelector', 'R')
    feDisp.setAttribute('yChannelSelector', 'G')
    feDisp.setAttribute('scale', String(scale))

    filter.appendChild(feImage)
    filter.appendChild(feDisp)
    defs.appendChild(filter)

    const update = () => {
      const rect = el.getBoundingClientRect()
      const w = Math.round(rect.width)
      const h = Math.round(rect.height)
      if (w < 2 || h < 2) return false
      const url = generateSquircleDisplacement({ width: w, height: h, radius, depth })
      if (!url) return false
      feImage.setAttribute('href', url)
      feImage.setAttributeNS(XLINKNS, 'xlink:href', url)
      feImage.setAttribute('x', '0')
      feImage.setAttribute('y', '0')
      feImage.setAttribute('width', String(w))
      feImage.setAttribute('height', String(h))
      return true
    }

    // Generate once before activating, so the first paint isn't an empty map.
    if (!update()) {
      filter.remove()
      return
    }

    document.documentElement.classList.add('refraction-on')
    const backdrop = `blur(1px) saturate(150%) url(#${id})`
    el.style.backdropFilter = backdrop
    el.style.WebkitBackdropFilter = backdrop

    let frame = 0
    const schedule = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(update)
    }
    const ro = new ResizeObserver(schedule)
    ro.observe(el)

    return () => {
      cancelAnimationFrame(frame)
      ro.disconnect()
      filter.remove()
      el.style.backdropFilter = ''
      el.style.WebkitBackdropFilter = ''
    }
  }, [ref, enabled, radius, depth, scale])
}
