import { useEffect } from 'react'

const EDGE = 30
const INSET = 44
const STIFFNESS = 58
const DAMPING = 11
const ANTICIPATE_MS = 170
const ANTICIPATE_PULL = 11
const LAUNCH_DISTANCE = 130
const DRIFT_X = 3
const DRIFT_Y = 4
const PICK_MS = 120
const SETTLE_MS = 700
const SAY_MS = 4800
const REPEAT_MS = 60000
const IDLE_MS = 45000
const SLEEP_MS = 60000
const WAKE_QUIET_MS = 20000

const GAZE_RANGE = 3.6
const GAZE_POINTER_MS = 2500
const SACCADE_MS = 55
const SACCADE_MIN = 0.9
const HOLD_MIN = 180
const HOLD_SPREAD = 420
const EXCITE_DECAY = 2.4
const EXCITE_HEIGHT = 0.18
const EXCITE_WIDTH = 0.07
const BLINK_MS = 170
const BLINK_CLOSE = 0.4
const DOUBLE_BLINK_CHANCE = 0.3
const DOUBLE_BLINK_GAP = 60
const BLINK_MIN = 2400
const BLINK_SPREAD = 4800
const SHUT = 0.04

const STRETCH_MAX = 0.12
const STRETCH_DIVISOR = 6000
const SQUASH_MS = 300
const SQUASH_DEPTH = 0.13
const IMPACT_FROM = 260
const IMPACT_TO = 130

const GLANCE_MIN = 1200
const GLANCE_SPREAD = 2600
const GLANCE_RANGE = 0.55
const PEAK_DECAY = 1.6
const STILL_SPEED = 12
const STILL_MS = 600

const HOVER_SCALE = 1.14
const RESTITUTION = 0.25
const COLLIDE_MIN_WIDTH = 720

const IDLE_LINES = [
  'still here.',
  'take your time.',
  "i don't need much.",
  "i'm mostly refraction.",
]

const POKE_LINES = [
  'hi.',
  "careful, i'm glass.",
  'that did nothing. nice though.',
  'poke received.',
]

const WAKE_LINES = [
  'oh. hi.',
  'i was resting.',
  "didn't hear you come back.",
]

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Perches the pet on whichever `[data-pet-line]` section is being read and
 * lets it remark on it. Any element can host the pet by declaring a line.
 */
export function useGlassPet({ rootRef, bodyRef, bubbleRef }) {
  useEffect(() => {
    const root = rootRef.current
    const body = bodyRef.current
    const bubble = bubbleRef.current
    if (!root || !body || !bubble || prefersReducedMotion()) return

    let x = window.innerWidth * 0.5
    let y = window.innerHeight * 0.55
    let vx = 0
    let vy = 0
    let subject = null
    let subjectSince = 0
    let pickedAt = 0
    let windUpUntil = 0
    let windUpX = 0
    let windUpY = 0
    let sayUntil = 0
    let lastSaid = performance.now()
    let lastActivity = performance.now()
    let asleep = false
    let sleptAt = 0
    let idleIndex = -1
    let pokeIndex = -1
    let wakeIndex = -1
    let pointerX = 0
    let pointerY = 0
    let pointerSeenAt = -Infinity
    let eyeX = 0
    let eyeY = 0
    let fixX = 0
    let fixY = 0
    let saccadeFromX = 0
    let saccadeFromY = 0
    let saccadeStart = -Infinity
    let holdUntil = 0
    let excite = 0
    let blinkAt = performance.now() + BLINK_MIN
    let blinkStart = -Infinity
    let doubleAt = Infinity
    let travelAngle = 0
    let peakSpeed = 0
    let stillSince = 0
    let glanceAt = 0
    let glanceX = 0
    let glanceY = 0
    let squashAt = -Infinity
    let hover = 1
    let hovering = false
    let last = performance.now()
    let frame = 0
    const saidAt = new WeakMap()

    // The most-read section: mostly-visible, and nearest the vertical middle.
    const pickSubject = () => {
      const height = window.innerHeight
      let best = null
      let bestScore = -Infinity
      for (const el of document.querySelectorAll('[data-pet-line]')) {
        const rect = el.getBoundingClientRect()
        const visible = Math.min(rect.bottom, height) - Math.max(rect.top, 0)
        if (visible < 80) continue
        const offCenter = Math.abs((rect.top + rect.bottom) / 2 - height / 2)
        const score = visible - offCenter * 0.6
        if (score > bestScore) {
          best = el
          bestScore = score
        }
      }
      return best
    }

    // The bordered art box is the solid thing on screen — the copy below it isn't.
    const surfaces = () =>
      [...document.querySelectorAll('.project-art')].map((el) => el.getBoundingClientRect())

    const colliding = () => window.innerWidth >= COLLIDE_MIN_WIDTH

    // Shove a point clear of any card it's sitting in, via the shallowest side.
    const pushOut = (px, py, rects, pad) => {
      for (const r of rects) {
        if (px <= r.left - pad || px >= r.right + pad || py <= r.top - pad || py >= r.bottom + pad) continue
        const toLeft = px - (r.left - pad)
        const toRight = (r.right + pad) - px
        const toTop = py - (r.top - pad)
        const toBottom = (r.bottom + pad) - py
        const shallowest = Math.min(toLeft, toRight, toTop, toBottom)
        if (shallowest === toLeft) px = r.left - pad
        else if (shallowest === toRight) px = r.right + pad
        else if (shallowest === toTop) py = r.top - pad
        else py = r.bottom + pad
      }
      return { x: px, y: py }
    }

    // Nearest spot on a card's outline — always reachable in a straight line,
    // unlike a fixed corner that may sit on the far side of a solid card.
    const nearestLedge = (box, px, py, pad) => {
      if (px < box.left || px > box.right || py < box.top || py > box.bottom) {
        const ox = Math.min(Math.max(px, box.left), box.right)
        const oy = Math.min(Math.max(py, box.top), box.bottom)
        const dx = px - ox
        const dy = py - oy
        const distance = Math.hypot(dx, dy) || 1
        return { x: ox + (dx / distance) * pad, y: oy + (dy / distance) * pad }
      }
      return pushOut(px, py, [box], pad)
    }

    const clampX = (px, half) =>
      Math.min(Math.max(px, EDGE + half), window.innerWidth - EDGE - half)
    const clampY = (py, half) =>
      Math.min(Math.max(py, EDGE + half), window.innerHeight - EDGE - half)

    const perchFor = (el, rects, half, px, py) => {
      if (!el) return { x: clampX(window.innerWidth, half), y: clampY(window.innerHeight * 0.6, half) }

      const art = el.querySelector('.project-art')
      const rect = el.getBoundingClientRect()
      const spot = art
        ? nearestLedge(art.getBoundingClientRect(), px, py, half + 2)
        : { x: rect.right - INSET, y: rect.bottom - INSET }

      const clear = colliding() ? pushOut(spot.x, spot.y, rects, half) : spot
      return { x: clampX(clear.x, half), y: clampY(clear.y, half) }
    }

    const say = (line, now) => {
      bubble.textContent = line
      bubble.classList.add('is-visible')
      sayUntil = now + SAY_MS
      lastSaid = now
    }

    const tick = (now) => {
      frame = requestAnimationFrame(tick)
      const dt = Math.min((now - last) / 1000, 0.05)
      last = now

      const half = body.offsetWidth / 2
      const rects = surfaces()

      if (now - pickedAt > PICK_MS) {
        pickedAt = now
        const next = pickSubject()
        if (next !== subject) {
          subject = next
          subjectSince = now

          // Lean away before a long trip, so the launch reads as intent.
          const spot = perchFor(next, rects, half, x, y)
          const distance = Math.hypot(spot.x - x, spot.y - y)
          if (distance > LAUNCH_DISTANCE) {
            windUpX = x - ((spot.x - x) / distance) * ANTICIPATE_PULL
            windUpY = y - ((spot.y - y) / distance) * ANTICIPATE_PULL
            windUpUntil = now + ANTICIPATE_MS
          }
        }
      }

      if (!asleep && now - lastActivity > SLEEP_MS) {
        asleep = true
        sleptAt = now
        root.classList.add('glass-pet--asleep')
      }

      const perch = perchFor(subject, rects, half, x, y)
      let targetX = perch.x
      let targetY = perch.y

      if (now < windUpUntil) {
        targetX = windUpX
        targetY = windUpY
      } else if (!asleep) {
        // Never perfectly still — two unrelated periods so it doesn't read as a loop.
        targetX += Math.sin(now / 4300) * DRIFT_X
        targetY += Math.sin(now / 6700 + 1.3) * DRIFT_Y
      }

      vx += ((targetX - x) * STIFFNESS - vx * DAMPING) * dt
      vy += ((targetY - y) * STIFFNESS - vy * DAMPING) * dt
      x += vx * dt
      y += vy * dt

      // Cards are solid: push clear and lose a little speed on the bump.
      if (colliding()) {
        const clear = pushOut(x, y, rects, half)
        if (clear.x !== x) {
          x = clear.x
          vx = -vx * RESTITUTION
        }
        if (clear.y !== y) {
          y = clear.y
          vy = -vy * RESTITUTION
        }
      }

      x = clampX(x, half)
      y = clampY(y, half)

      const drifting = Math.hypot(vx, vy)
      stillSince = drifting < STILL_SPEED ? (stillSince || now) : 0
      const arrived =
        (Math.hypot(perch.x - x, perch.y - y) < 60 && drifting < 90) ||
        (stillSince > 0 && now - stillSince > STILL_MS)

      if (!sayUntil) {
        const line = subject?.dataset.petLine
        if (line && arrived && !asleep && now - subjectSince > SETTLE_MS && now - (saidAt.get(subject) ?? -Infinity) > REPEAT_MS) {
          saidAt.set(subject, now)
          say(line, now)
        } else if (!asleep && now - lastSaid > IDLE_MS && document.hasFocus()) {
          idleIndex = (idleIndex + 1) % IDLE_LINES.length
          say(IDLE_LINES[idleIndex], now)
        }
      } else if (now > sayUntil) {
        bubble.classList.remove('is-visible')
        sayUntil = 0
      }

      bubble.classList.toggle('glass-pet__say--left', x > window.innerWidth * 0.55)

      // Gaze — at you if you're around, then where it's headed, then what it's sat on.
      const speed = Math.hypot(vx, vy)
      let wantX = 0
      let wantY = 0
      if (!asleep) {
        let aimX = null
        let aimY = null
        if (now - pointerSeenAt < GAZE_POINTER_MS) {
          aimX = pointerX
          aimY = pointerY
        } else if (speed > 60) {
          wantX = (vx / speed) * GAZE_RANGE
          wantY = (vy / speed) * GAZE_RANGE
        } else if (subject) {
          const rect = subject.getBoundingClientRect()
          aimX = (rect.left + rect.right) / 2
          aimY = (rect.top + rect.bottom) / 2
        } else {
          wantX = Math.sin(now / 3100) * GAZE_RANGE * 0.45
          wantY = Math.cos(now / 4700) * GAZE_RANGE * 0.3
        }
        if (aimX !== null) {
          const dx = aimX - x
          const dy = aimY - y
          const distance = Math.hypot(dx, dy) || 1
          wantX = (dx / distance) * GAZE_RANGE
          wantY = (dy / distance) * GAZE_RANGE
        }

        // Eyes never sit perfectly still, even on a motionless cursor.
        if (now >= glanceAt) {
          glanceAt = now + GLANCE_MIN + Math.random() * GLANCE_SPREAD
          glanceX = (Math.random() - 0.5) * GAZE_RANGE * GLANCE_RANGE * 2
          glanceY = (Math.random() - 0.5) * GAZE_RANGE * GLANCE_RANGE
        }
        wantX = Math.max(-GAZE_RANGE, Math.min(GAZE_RANGE, wantX + glanceX))
        wantY = Math.max(-GAZE_RANGE, Math.min(GAZE_RANGE, wantY + glanceY))
      }

      // Eyes jump and then fixate — a smooth glide is the dead giveaway of a fake.
      if (now > holdUntil && Math.hypot(wantX - fixX, wantY - fixY) > SACCADE_MIN) {
        saccadeFromX = eyeX
        saccadeFromY = eyeY
        fixX = wantX
        fixY = wantY
        saccadeStart = now
        holdUntil = now + SACCADE_MS + HOLD_MIN + Math.random() * HOLD_SPREAD
      }
      const jump = (now - saccadeStart) / SACCADE_MS
      if (jump >= 0 && jump < 1) {
        const eased = jump * jump * (3 - 2 * jump)
        eyeX = saccadeFromX + (fixX - saccadeFromX) * eased
        eyeY = saccadeFromY + (fixY - saccadeFromY) * eased
      } else {
        eyeX = fixX
        eyeY = fixY
      }

      // Blink — irregular, so it doesn't read as a metronome.
      let lid = 1
      if (asleep) {
        lid = SHUT
      } else {
        if (now >= blinkAt) {
          blinkStart = now
          blinkAt = now + BLINK_MIN + Math.random() * BLINK_SPREAD
          doubleAt = Math.random() < DOUBLE_BLINK_CHANCE ? now + BLINK_MS + DOUBLE_BLINK_GAP : Infinity
        }
        if (now >= doubleAt) {
          blinkStart = now
          doubleAt = Infinity
        }
        const phase = (now - blinkStart) / BLINK_MS
        if (phase >= 0 && phase < 1) {
          // Snaps shut, opens slower — an even close looks mechanical.
          const shut = phase < BLINK_CLOSE
            ? phase / BLINK_CLOSE
            : 1 - (phase - BLINK_CLOSE) / (1 - BLINK_CLOSE)
          lid = 1 - shut * shut * (3 - 2 * shut) * (1 - SHUT)
        }
      }

      excite *= Math.exp(-EXCITE_DECAY * dt)

      // Stretch along travel, squash on arrival.
      if (speed > 120) travelAngle = Math.atan2(vy, vx)
      let stretch = Math.min(speed / STRETCH_DIVISOR, STRETCH_MAX)
      peakSpeed = Math.max(peakSpeed * Math.exp(-PEAK_DECAY * dt), speed)
      if (peakSpeed > IMPACT_FROM && speed < IMPACT_TO && now - squashAt > 400) {
        squashAt = now
        blinkStart = now
        excite = 1
        peakSpeed = 0
      }
      const impact = (now - squashAt) / SQUASH_MS
      if (impact >= 0 && impact < 1) {
        stretch -= SQUASH_DEPTH * (1 - impact) * Math.cos(impact * Math.PI * 3)
      }

      hover += ((hovering ? HOVER_SCALE : 1) - hover) * (1 - Math.exp(-12 * dt))

      root.style.transform = `translate3d(${(x - half).toFixed(1)}px, ${(y - half).toFixed(1)}px, 0)`
      root.style.setProperty('--pet-eye-x', `${eyeX.toFixed(2)}px`)
      root.style.setProperty('--pet-eye-y', `${eyeY.toFixed(2)}px`)
      root.style.setProperty('--pet-eye-sx', (1 + excite * EXCITE_WIDTH).toFixed(3))
      root.style.setProperty('--pet-eye-sy', ((1 + excite * EXCITE_HEIGHT) * lid).toFixed(3))
      body.style.transform =
        `rotate(${travelAngle.toFixed(3)}rad) scale(${((1 + stretch) * hover).toFixed(3)}, ${((1 - stretch * 0.72) * hover).toFixed(3)}) rotate(${(-travelAngle).toFixed(3)}rad)`
    }

    const wake = (now) => {
      lastActivity = now
      if (!asleep) return false
      asleep = false
      root.classList.remove('glass-pet--asleep')
      return now - sleptAt > WAKE_QUIET_MS
    }

    const onActivity = (event) => {
      const now = performance.now()
      if (event?.clientX != null) {
        pointerX = event.clientX
        pointerY = event.clientY
        pointerSeenAt = now
      }
      if (wake(now)) {
        wakeIndex = (wakeIndex + 1) % WAKE_LINES.length
        say(WAKE_LINES[wakeIndex], now)
      }
    }

    const onPoke = () => {
      const now = performance.now()
      wake(now)
      excite = 1
      pokeIndex = (pokeIndex + 1) % POKE_LINES.length
      say(POKE_LINES[pokeIndex], now)
    }

    const onEnter = () => { hovering = true }
    const onLeave = () => { hovering = false }

    body.addEventListener('click', onPoke)
    body.addEventListener('pointerenter', onEnter)
    body.addEventListener('pointerleave', onLeave)
    window.addEventListener('scroll', onActivity, { passive: true })
    window.addEventListener('pointermove', onActivity, { passive: true })
    frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      body.removeEventListener('click', onPoke)
      body.removeEventListener('pointerenter', onEnter)
      body.removeEventListener('pointerleave', onLeave)
      window.removeEventListener('scroll', onActivity)
      window.removeEventListener('pointermove', onActivity)
    }
  }, [rootRef, bodyRef, bubbleRef])
}
