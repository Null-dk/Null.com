import { useEffect } from 'react'

const clamp01 = (value) => Math.min(1, Math.max(0, value))
const lerp = (from, to, t) => from + (to - from) * t
const easeInOut = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
const easeInOutSine = (t) => -(Math.cos(Math.PI * t) - 1) / 2

const PERSPECTIVE = 1800
// Pose of the pile in the hero.
const PILE_TILT_X = 58
const PILE_TILT_Z = -40
// Pose a pane hovers in above its card before it lays down flat.
const HOVER_TILT_X = 34
const HOVER_TILT_Z = -8
const HOVER_LIFT = 90
const STAGGER = 0.07
// Viewport fraction a dealt card must scroll above before it fades in.
const REVEAL_AT = 0.9
// How quickly the animation catches up with the scroll position (per second).
const DAMPING = 7

// Transition snap: if the user stops scrolling partway through the scatter,
// glide to one end so it never rests half-done. Moving past SNAP_COMMIT of the
// way commits to the far end; a smaller nudge settles back where they came from.
// Input is never blocked; touching the scroll again cancels the glide.
const SNAP_IDLE_MS = 140
const SNAP_GLIDE_MS = 900
const SNAP_COMMIT = 0.15

// Each pane leaves the pile slightly after the one above it.
const paneScatter = (scatter, i, count) => clamp01((scatter - i * STAGGER) / (1 - (count - 1) * STAGGER))

// One-way progress: follows the scroll forward, and if the user reverses
// mid-way it finishes the motion instead of playing it backwards.
const forward = (value, target) => (target >= value ? target : value > 0 ? 1 : value)

const poseTransform = (rotateX, rotateZ, z) =>
  `perspective(${PERSPECTIVE}px) rotateX(${rotateX}deg) rotateZ(${rotateZ}deg) translateZ(${z}px)`

function attachTransitionSnap(gallery) {
  let cameFromEnd = false
  let idleTimer = 0
  let glide = 0

  const zone = () => {
    const vh = window.innerHeight
    const top = gallery.getBoundingClientRect().top + window.scrollY
    return { start: top - vh, end: top - vh * 0.15 }
  }

  const cancelGlide = () => {
    cancelAnimationFrame(glide)
    glide = 0
  }

  const glideTo = (target, span) => {
    const from = window.scrollY
    const duration = Math.max(350, SNAP_GLIDE_MS * Math.min(1, Math.abs(target - from) / span))
    const startTime = performance.now()

    const step = (now) => {
      const t = Math.min(1, (now - startTime) / duration)
      window.scrollTo({ top: lerp(from, target, easeInOutSine(t)), behavior: 'instant' })
      glide = t < 1 ? requestAnimationFrame(step) : 0
    }

    glide = requestAnimationFrame(step)
  }

  const snapIfMidway = () => {
    const y = window.scrollY
    const { start, end } = zone()
    if (y <= start + 1 || y >= end - 1) return
    const span = end - start
    const travelled = cameFromEnd ? (end - y) / span : (y - start) / span
    const goToEnd = cameFromEnd ? travelled < SNAP_COMMIT : travelled >= SNAP_COMMIT
    glideTo(goToEnd ? end : start, span)
  }

  const onScroll = () => {
    if (glide) return
    const y = window.scrollY
    const { start, end } = zone()
    if (y <= start + 1) cameFromEnd = false
    else if (y >= end - 1) cameFromEnd = true
    clearTimeout(idleTimer)
    idleTimer = setTimeout(snapIfMidway, SNAP_IDLE_MS)
  }

  const onUserInput = () => {
    if (glide) cancelGlide()
  }

  window.addEventListener('scroll', onScroll, { passive: true })
  window.addEventListener('wheel', onUserInput, { passive: true })
  window.addEventListener('touchstart', onUserInput, { passive: true })
  window.addEventListener('keydown', onUserInput)

  return () => {
    cancelGlide()
    clearTimeout(idleTimer)
    window.removeEventListener('scroll', onScroll)
    window.removeEventListener('wheel', onUserInput)
    window.removeEventListener('touchstart', onUserInput)
    window.removeEventListener('keydown', onUserInput)
  }
}

// Drives the hero stack in three beats, all moving with the scroll direction:
// 1. while the stage is pinned, the pile explodes apart;
// 2. the pile then drifts down into the page, each pane heading for the spot
//    just above its card (flying in a fixed layer);
// 3. once there, the pane is handed to the card itself, which hovers tilted
//    and lays down flat as it scrolls into view. This last beat runs on the
//    in-flow element so it stays glued to the page without scroll jitter.
// Scrolling back up through the scatter plays the deal in reverse, but a card
// sitting in the gallery never tilts back up: its lay-down only plays forward.
export function useProjectStack(stageRef, paneRefs, galleryRef, names, enabled) {
  useEffect(() => {
    const stage = stageRef.current
    const gallery = galleryRef.current
    if (!enabled || !stage || !gallery) return

    const slots = names.map((name) => gallery.querySelector(`[data-slot="${CSS.escape(name)}"]`))
    const panes = paneRefs.current
    const count = names.length

    // Match each pane's crop and grade to its card so the handoff is seamless.
    slots.forEach((slot, i) => {
      const slotImg = slot?.querySelector('img')
      const paneImg = panes[i]?.querySelector('img')
      if (!slotImg || !paneImg) return
      const computed = getComputedStyle(slotImg)
      paneImg.style.objectPosition = computed.objectPosition
      paneImg.style.filter = computed.filter
    })

    gallery.dataset.stack = ''

    const measure = () => {
      const vh = window.innerHeight
      const stageRect = stage.getBoundingClientRect()
      const galleryTop = gallery.getBoundingClientRect().top
      const pinTravel = stageRect.height - vh * 0.7
      return {
        explode: easeInOut(clamp01((vh * 0.3 - stageRect.top) / (pinTravel * 0.8))),
        scatter: clamp01((vh - galleryTop) / (vh * 0.75)),
        settle: slots.map((slot) => (slot ? clamp01((vh - slot.getBoundingClientRect().top) / (vh * 0.55)) : 0)),
      }
    }

    let current = measure()
    let frame = 0
    let lastTime = 0

    const render = () => {
      const vw = document.documentElement.clientWidth
      const vh = window.innerHeight
      const stageRect = stage.getBoundingClientRect()

      const width = Math.min(620, vw * 0.78)
      const height = width * 0.625
      const pileX = vw / 2 + (vw > 900 ? vw * 0.1 : 0)
      const pileY = Math.min(Math.max(stageRect.top, 0), stageRect.bottom - vh) + vh / 2
      const spread = lerp(9, Math.max(46, width * 0.14), current.explode)
      const pileTiltZ = lerp(PILE_TILT_Z, PILE_TILT_Z + 8, current.explode)
      const label = clamp01(current.explode * 1.4 - 0.3) * (1 - clamp01(current.scatter * 3))

      panes.forEach((pane, i) => {
        const slot = slots[i]
        if (!pane || !slot) return

        // Only the lead card is dealt in view, so only it lays down from a tilt.
        const lead = i === 0
        const settle = lead ? easeInOutSine(current.settle[i]) : 1
        const hoverX = lerp(HOVER_TILT_X, 0, settle)
        const hoverZ = lerp(HOVER_TILT_Z, 0, settle)
        const hoverLift = lerp(HOVER_LIFT, 0, settle)
        const scatter = paneScatter(current.scatter, i, count)
        const handedOff = scatter >= 1
        const wasLanded = slot.hasAttribute('data-landed')

        pane.style.visibility = handedOff ? 'hidden' : 'visible'
        slot.toggleAttribute('data-landed', handedOff)

        if (handedOff) {
          const flat = settle >= 1
          slot.style.transform = flat ? '' : poseTransform(hoverX, hoverZ, hoverLift)
          slot.style.transition = flat ? '' : 'none'
          // Cards landing off screen fade in the first time they scroll into
          // view; one already on screen at handoff shows straight away.
          const top = slot.getBoundingClientRect().top
          const revealed = lead || (wasLanded ? slot.hasAttribute('data-revealed') || top < vh * REVEAL_AT : top < vh)
          slot.toggleAttribute('data-revealed', revealed)
          return
        }

        slot.style.transform = ''
        slot.style.transition = ''
        slot.removeAttribute('data-revealed')

        const t = easeInOutSine(scatter)
        const target = slot.getBoundingClientRect()
        const paneWidth = lerp(width, target.width, t)
        const paneHeight = lerp(height, target.height, t)
        const x = lerp(pileX, target.left + target.width / 2, t) - paneWidth / 2
        const y = lerp(pileY, target.top + target.height / 2, t) - paneHeight / 2
        const rotateX = lerp(PILE_TILT_X, hoverX, t)
        const rotateZ = lerp(pileTiltZ, hoverZ, t)
        const z = lerp(((count - 1) / 2 - i) * spread, hoverLift, t)

        pane.style.width = `${paneWidth}px`
        pane.style.height = `${paneHeight}px`
        pane.style.transform = `translate3d(${x}px, ${y}px, 0) ${poseTransform(rotateX, rotateZ, z)}`
        pane.style.setProperty('--label', (label * (1 - clamp01(scatter * 4))).toFixed(3))
      })
    }

    const tick = (time) => {
      const dt = lastTime ? Math.min((time - lastTime) / 1000, 0.05) : 1 / 60
      lastTime = time
      const alpha = 1 - Math.exp(-DAMPING * dt)
      const target = measure()
      let settled = true

      const approach = (from, to) => {
        const next = from + (to - from) * alpha
        if (Math.abs(to - next) < 0.001) return to
        settled = false
        return next
      }

      current = {
        explode: approach(current.explode, target.explode),
        scatter: approach(current.scatter, target.scatter),
        settle: current.settle.map((value, i) =>
          approach(value, paneScatter(current.scatter, i, count) >= 1 ? forward(value, target.settle[i]) : target.settle[i]),
        ),
      }

      render()
      frame = settled ? 0 : requestAnimationFrame(tick)
      if (settled) lastTime = 0
    }

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(tick)
    }

    render()
    const detachSnap = attachTransitionSnap(gallery)
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)

    return () => {
      cancelAnimationFrame(frame)
      detachSnap()
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      delete gallery.dataset.stack
      slots.forEach((slot) => {
        if (!slot) return
        slot.removeAttribute('data-landed')
        slot.removeAttribute('data-revealed')
        slot.style.transform = ''
        slot.style.transition = ''
      })
    }
  }, [stageRef, paneRefs, galleryRef, names, enabled])
}
