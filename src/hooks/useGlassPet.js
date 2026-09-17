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
const STICKY = 120
const SPOKEN_PENALTY = 260
const POINTER_PULL = 0.18
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

const LEDGE_DROP = 210
const CONTACT_REACH = 26
const CONTACT_FALLOFF = 1.4
const WINK_CHANCE = 0.15
const POSE_MIN = 6000
const POSE_SPREAD = 8000
const POSE_HOLD = 900
const POSE_HOLD_SPREAD = 900
const POSE_SQUINT = 0.6
const POSE_EASE = 7
const BUSINESS_MIN = 9000
const BUSINESS_SPREAD = 11000
const HOP_IMPULSE = 270
const PACE_MS = 2500
const LEAN_MS = 1200
const LEAN_DROP = 14

const STIFFNESS_FAST = 150
const DAMPING_FAST = 19
const STIFFNESS_DRAG = 620
const DAMPING_DRAG = 34
const URGENT_MS = 900
const SETTLE_FAST = 140
const HOVER_COOLDOWN = 700
const HOVER_MIN_GAP = 200
const DISPLACED_MS = 12000
const SUBSTEP = 1 / 120
const DRAG_THRESHOLD = 6
const THROW_MAX = 2600

const HOVER_SCALE = 1.14
const RESTITUTION = 0.25
const COLLIDE_MIN_WIDTH = 720

const IDLE_LINES = [
  'still here.',
  'take your time.',
  "i don't need much.",
  "i'm mostly refraction.",
  'nothing happens if you scroll faster.',
  'i live in the gaps.',
  "i've read all of these.",
  'no notifications up here. peaceful.',
  'the light comes from over there.',
  'this edge is a good edge.',
  'i keep the corners warm.',
  "i don't do much. by design.",
  'scroll. i will follow.',
  'somewhere below is a dead project.',
  'i count pixels when it is slow.',
  'nothing needs your attention.',
  'a nice dark page, this.',
  'you can click things, you know.',
  'i was compiled, not born.',
  'still glass. still here.',
]

const POKE_LINES = [
  'hi.',
  "careful, i'm glass.",
  'that did nothing. nice though.',
  'poke received.',
  'again? fine.',
  'i felt that.',
  'boop returned.',
  'you may poke twice more.',
  'ow. metaphorically.',
  'noted.',
  'this is our thing now.',
  'i have no buttons.',
  'keep going, see what happens.',
  'nothing happens. sorry.',
  'stop that. continue.',
  'that tickles, conceptually.',
  'pressed. no effect.',
  'you found my one interaction.',
  'hello down there.',
  'ok ok.',
]

const WAKE_LINES = [
  'oh. hi.',
  'i was resting.',
  "didn't hear you come back.",
  'back already?',
  'give me a second.',
  'i was dreaming about squircles.',
  'awake. mostly.',
  'what did i miss?',
  'five more minutes.',
  'right. working.',
  'you were gone a while.',
  'still dark out.',
  'reboot complete.',
  'i kept your place.',
  'nothing happened while you were away.',
  'that was a good nap.',
  'yawn. glassily.',
  'ah, company.',
  'i drifted off.',
  'present.',
]

const FAREWELL_LINES = [
  'say hi to {name} for me.',
  '{name}. good choice.',
  'off you go then.',
  "{name}'s a good one.",
  "don't be long.",
  'i will hold the page.',
  'new tab. brave.',
  'tell {name} i sent you.',
  "i'll be here.",
  'go on then.',
  'that one still works, i think.',
  'bring back a souvenir.',
  'mind the loading screen.',
  'see you in a minute.',
  '{name} it is.',
  'i approve.',
  'try not to break it.',
  'godspeed.',
  'the door is open.',
  'take notes.',
]

const GRAB_LINES = [
  'put me down.',
  'oh. we are doing this.',
  'unhand me.',
  'wheee.',
  'i am not a toy.',
  'this is undignified.',
  'still glass, by the way.',
  'where are we going?',
  'i have no legs for this.',
  'weightless. unpleasant.',
  'fine. carry me.',
  'the view is different up here.',
  'i did not consent to this.',
  'this counts as exercise.',
  'do a loop.',
  'i get motion sick.',
  'my edges are delicate.',
  'release me somewhere nice.',
  'you are enjoying this.',
  'careful. careful.',
]

const DROP_LINES = [
  'landed.',
  'ow.',
  'never again.',
  'i am fine. thank you for asking.',
  'good throw.',
  'that was a lot of air.',
  'still in one piece.',
  'ten out of ten.',
  'again, but gentler.',
  'i forgive you.',
  'physics.',
  'nice arc.',
  'i meant to do that.',
  'stuck the landing.',
  'that is going in the log.',
  'whee. ow.',
  'i will find my own way back.',
  'do not do that again.',
  'ok that was fun.',
  'my rim is chipped. probably.',
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
    let hoverTarget = null
    let urgentUntil = 0
    let hurried = false
    let displacedUntil = 0
    let anchorX = null
    let anchorY = null
    let restingSince = 0
    let dragging = false
    let dragArmed = false
    let dragMoved = false
    let grabDX = 0
    let grabDY = 0
    let dragPX = 0
    let dragPY = 0
    let dragVX = 0
    let dragVY = 0
    let dragAt = 0
    let grabOriginX = 0
    let grabOriginY = 0
    let awaitingLanding = false
    let releasedAt = 0
    let suppressClickUntil = 0
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
    let asymL = 1
    let asymR = 1
    let poseL = 1
    let poseR = 1
    let poseUntil = 0
    let poseAt = performance.now() + POSE_MIN
    let winkEye = null
    let errandX = 0
    let errandY = 0
    let errandUntil = 0
    let errandAt = performance.now() + BUSINESS_MIN
    let contact = 0
    let contactX = 0
    let contactY = 0
    let contactRot = 0
    let last = performance.now()
    let frame = 0
    const saidAt = new WeakMap()
    const saidCount = new WeakMap()
    const lastPicked = new Map()

    // Random, but never the same line twice running.
    const pick = (bank) => {
      if (bank.length < 2) return bank[0]
      let index = Math.floor(Math.random() * bank.length)
      if (index === lastPicked.get(bank)) index = (index + 1) % bank.length
      lastPicked.set(bank, index)
      return bank[index]
    }

    // A section may register several lines, pipe-separated; work through them.
    const lineFor = (el) => {
      const options = (el.dataset.petLine ?? '').split('|').map((part) => part.trim()).filter(Boolean)
      if (!options.length) return null
      const seen = saidCount.get(el) ?? 0
      saidCount.set(el, seen + 1)
      return options[seen % options.length]
    }

    // The most-read section: mostly-visible and near the middle. Side-by-side
    // cards tie on every vertical measure, so recency and the pointer break it —
    // otherwise a right-column card could never win and would never speak.
    const pickSubject = (now) => {
      const height = window.innerHeight
      const pointerFresh = now - pointerSeenAt < GAZE_POINTER_MS
      let best = null
      let bestScore = -Infinity
      for (const el of document.querySelectorAll('[data-pet-line]')) {
        const rect = el.getBoundingClientRect()
        const visible = Math.min(rect.bottom, height) - Math.max(rect.top, 0)
        if (visible < 80) continue
        const offCenter = Math.abs((rect.top + rect.bottom) / 2 - height / 2)
        let score = visible - offCenter * 0.6
        if (el === subject) score += STICKY
        if (now - (saidAt.get(el) ?? -Infinity) < REPEAT_MS) score -= SPOKEN_PENALTY
        if (pointerFresh) score -= Math.abs((rect.left + rect.right) / 2 - pointerX) * POINTER_PULL
        if (score > bestScore) {
          best = el
          bestScore = score
        }
      }
      return best
    }

    const nearestSection = (px, py) => {
      let best = null
      let bestDistance = Infinity
      for (const el of document.querySelectorAll('[data-pet-line]')) {
        const r = el.getBoundingClientRect()
        if (r.bottom < 0 || r.top > window.innerHeight) continue
        const dx = px - Math.min(Math.max(px, r.left), r.right)
        const dy = py - Math.min(Math.max(py, r.top), r.bottom)
        const distance = Math.hypot(dx, dy)
        if (distance < bestDistance) {
          bestDistance = distance
          best = el
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
      let spot
      if (art) {
        const box = art.getBoundingClientRect()
        spot = nearestLedge(box, px, py, half + 2)
        // Dangling under a card looks wrong — drop onto the ledge below if there is one.
        if (spot.y > box.bottom) {
          let ledge = null
          for (const r of rects) {
            if (r.top <= spot.y || spot.x < r.left || spot.x > r.right) continue
            if (r.top - spot.y > LEDGE_DROP) continue
            if (!ledge || r.top < ledge.top) ledge = r
          }
          if (ledge) spot = { x: spot.x, y: ledge.top - (half + 2) }
        }
      } else {
        spot = { x: rect.right - INSET, y: rect.bottom - INSET }
      }

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

      // Hovering a card hands it over at once — waiting on the scoring pass
      // is what made it feel slow to follow your attention.
      if (!dragging && hoverTarget && hoverTarget !== subject) {
        subject = hoverTarget
        subjectSince = now
        pickedAt = now
        urgentUntil = now + URGENT_MS
        hurried = true
        displacedUntil = 0
        anchorX = null
        windUpUntil = 0
      }

      // Just dropped somewhere: adopt whatever it landed next to and stay put,
      // instead of trudging back to the perch it came from.
      if (!dragging && now < displacedUntil) {
        const local = nearestSection(x, y)
        if (local && local !== subject) {
          subject = local
          subjectSince = now
          hurried = false
        }
      }

      if (!dragging && now > displacedUntil && now - pickedAt > PICK_MS) {
        pickedAt = now
        const next = pickSubject(now)
        if (next !== subject) {
          hurried = false
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

      const displaced = !dragging && now < displacedUntil
      const perch = displaced && anchorX !== null
        ? { x: anchorX, y: anchorY }
        : perchFor(subject, rects, half, x, y)
      let targetX = perch.x
      let targetY = perch.y

      // Just dropped: no pull at all until it comes to rest, or it would be
      // hauled straight back to the ledge it came from.
      if (displaced && anchorX === null) {
        targetX = x
        targetY = y
      }

      if (now < windUpUntil) {
        targetX = windUpX
        targetY = windUpY
      } else if (!asleep) {
        // Never perfectly still — two unrelated periods so it doesn't read as a loop.
        targetX += Math.sin(now / 4300) * DRIFT_X
        targetY += Math.sin(now / 6700 + 1.3) * DRIFT_Y
        if (now < errandUntil) {
          targetX += errandX
          targetY += errandY
        }
      }

      // Keep the goal itself legal, or the spring fights the collision forever.
      if (colliding()) {
        const legal = pushOut(targetX, targetY, rects, half)
        targetX = clampX(legal.x, half)
        targetY = clampY(legal.y, half)
      }

      if (dragging) {
        targetX = dragPX + grabDX
        targetY = dragPY + grabDY
      }

      const stiffness = dragging ? STIFFNESS_DRAG : now < urgentUntil ? STIFFNESS_FAST : STIFFNESS
      const damping = dragging ? DAMPING_DRAG : now < urgentUntil ? DAMPING_FAST : DAMPING

      // Fixed sub-steps: a stiff spring on a long frame would otherwise blow up.
      let remaining = dt
      while (remaining > 0) {
        const step = Math.min(remaining, SUBSTEP)
        vx += ((targetX - x) * stiffness - vx * damping) * step
        vy += ((targetY - y) * stiffness - vy * damping) * step
        x += vx * step
        y += vy * step
        remaining -= step
      }

      // Cards are solid: push clear and lose a little speed on the bump.
      if (colliding() && !dragging) {
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

      if (displaced && anchorX === null) {
        const coasting = Math.hypot(vx, vy)
        restingSince = coasting < 40 ? (restingSince || now) : 0
        if (restingSince && now - restingSince > 180) {
          const settled = colliding() ? pushOut(x, y, rects, half) : { x, y }
          anchorX = clampX(settled.x, half)
          anchorY = clampY(settled.y, half)
        }
      }

      const drifting = Math.hypot(vx, vy)
      stillSince = drifting < STILL_SPEED ? (stillSince || now) : 0
      const arrived =
        (Math.hypot(perch.x - x, perch.y - y) < 60 && drifting < 90) ||
        (stillSince > 0 && now - stillSince > STILL_MS)

      const settle = hurried ? SETTLE_FAST : SETTLE_MS
      const cooldown = hurried ? HOVER_COOLDOWN : REPEAT_MS
      const ready =
        !!subject?.dataset.petLine &&
        !asleep &&
        !dragging &&
        now - subjectSince > settle &&
        now - lastSaid > HOVER_MIN_GAP &&
        now - (saidAt.get(subject) ?? -Infinity) > cooldown &&
        (hurried || arrived)

      if (ready) {
        // A hover is an explicit request, so it cuts off whatever is on screen.
        saidAt.set(subject, now)
        say(lineFor(subject), now)
      } else if (!sayUntil && !asleep && !dragging && now - lastSaid > IDLE_MS && document.hasFocus()) {
        say(pick(IDLE_LINES), now)
      }

      if (sayUntil && now > sayUntil) {
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
          winkEye = Math.random() < WINK_CHANCE ? (Math.random() < 0.5 ? 'l' : 'r') : null
        }
        if (now >= doubleAt) {
          blinkStart = now
          doubleAt = Infinity
        }
        const phase = (now - blinkStart) / BLINK_MS
        if (phase >= 1) winkEye = null
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
        if (awaitingLanding) {
          awaitingLanding = false
          say(pick(DROP_LINES), now)
        }
      }
      // A gentle release never triggers an impact, so land the line anyway.
      if (awaitingLanding && now - releasedAt > 900 && speed < IMPACT_TO) {
        awaitingLanding = false
        say(pick(DROP_LINES), now)
      }
      const impact = (now - squashAt) / SQUASH_MS
      if (impact >= 0 && impact < 1) {
        stretch -= SQUASH_DEPTH * (1 - impact) * Math.cos(impact * Math.PI * 3)
      }

      hover += ((hovering ? HOVER_SCALE : 1) - hover) * (1 - Math.exp(-12 * dt))

      root.style.transform = `translate3d(${(x - half).toFixed(1)}px, ${(y - half).toFixed(1)}px, 0)`
      // Contact — nearest surface in any direction, since it wedges against
      // side edges as often as it sits on top of one.
      let touch = null
      for (const r of rects) {
        const nx = x - Math.min(Math.max(x, r.left), r.right)
        const ny = y - Math.min(Math.max(y, r.top), r.bottom)
        const reach = Math.hypot(nx, ny)
        const distance = reach - half
        if (distance < -1 || distance > CONTACT_REACH) continue
        if (!touch || distance < touch.distance) {
          const length = reach || 1
          touch = { distance, nx: nx / length, ny: ny / length }
        }
      }
      const wanted = touch ? Math.pow(1 - Math.max(touch.distance, 0) / CONTACT_REACH, CONTACT_FALLOFF) : 0
      contact += (wanted - contact) * (1 - Math.exp(-10 * dt))
      if (touch) {
        contactX = -touch.nx * half
        contactY = -touch.ny * half
        contactRot = Math.abs(touch.nx) > Math.abs(touch.ny) ? 90 : 0
      }

      // Eyes drift out of symmetry now and then — identical twins read as a machine.
      if (!asleep && now >= poseAt) {
        poseAt = now + POSE_MIN + Math.random() * POSE_SPREAD
        poseUntil = now + POSE_HOLD + Math.random() * POSE_HOLD_SPREAD
        const narrow = Math.random() < 0.5
        poseL = narrow ? POSE_SQUINT : 1
        poseR = narrow ? 1 : POSE_SQUINT
      }
      if (now > poseUntil) {
        poseL = 1
        poseR = 1
      }
      const poseEase = 1 - Math.exp(-POSE_EASE * dt)
      asymL += (poseL - asymL) * poseEase
      asymR += (poseR - asymR) * poseEase

      // Idle business — a creature that only breathes is furniture.
      if (!asleep && !sayUntil && arrived && now >= errandAt) {
        errandAt = now + BUSINESS_MIN + Math.random() * BUSINESS_SPREAD
        const pick = Math.random()
        if (pick < 0.34) {
          vy -= HOP_IMPULSE
          excite = Math.max(excite, 0.6)
        } else if (pick < 0.7) {
          errandX = (Math.random() < 0.5 ? -1 : 1) * (60 + Math.random() * 80)
          errandY = 0
          errandUntil = now + PACE_MS
        } else {
          errandX = 0
          errandY = LEAN_DROP
          errandUntil = now + LEAN_MS
        }
      }

      const openL = winkEye === 'r' ? 1 : lid
      const openR = winkEye === 'l' ? 1 : lid
      root.style.setProperty('--pet-eye-x', `${eyeX.toFixed(2)}px`)
      root.style.setProperty('--pet-eye-y', `${eyeY.toFixed(2)}px`)
      root.style.setProperty('--pet-eye-sx', (1 + excite * EXCITE_WIDTH).toFixed(3))
      root.style.setProperty('--pet-eye-l', ((1 + excite * EXCITE_HEIGHT) * asymL * openL).toFixed(3))
      root.style.setProperty('--pet-eye-r', ((1 + excite * EXCITE_HEIGHT) * asymR * openR).toFixed(3))
      root.style.setProperty('--pet-contact', contact.toFixed(3))
      root.style.setProperty('--pet-contact-x', `${contactX.toFixed(1)}px`)
      root.style.setProperty('--pet-contact-y', `${contactY.toFixed(1)}px`)
      root.style.setProperty('--pet-contact-rot', `${contactRot}deg`)
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
      if (wake(now)) say(pick(WAKE_LINES), now)
    }

    const onPoke = () => {
      const now = performance.now()
      if (now < suppressClickUntil) return
      wake(now)
      excite = 1
      say(pick(POKE_LINES), now)
    }

    const onLeaving = (event) => {
      const link = event.target.closest?.('a[data-pet-line]')
      if (!link) return
      const now = performance.now()
      wake(now)
      excite = 1
      const name = link.querySelector('h2')?.textContent ?? 'that one'
      say(pick(FAREWELL_LINES).replace('{name}', name), now)
    }

    const onHoverSection = (event) => {
      if (dragging) return
      hoverTarget = event.target.closest?.('[data-pet-line]') ?? null
    }

    const onGrab = (event) => {
      dragArmed = true
      dragMoved = false
      grabOriginX = event.clientX
      grabOriginY = event.clientY
      dragPX = event.clientX
      dragPY = event.clientY
      grabDX = x - event.clientX
      grabDY = y - event.clientY
      dragAt = performance.now()
      dragVX = 0
      dragVY = 0
    }

    const onDragMove = (event) => {
      if (!dragArmed) return
      const now = performance.now()
      const elapsed = Math.max((now - dragAt) / 1000, 0.001)
      dragVX = (event.clientX - dragPX) / elapsed
      dragVY = (event.clientY - dragPY) / elapsed
      dragPX = event.clientX
      dragPY = event.clientY
      dragAt = now
      lastActivity = now

      if (!dragMoved && Math.hypot(event.clientX - grabOriginX, event.clientY - grabOriginY) > DRAG_THRESHOLD) {
        dragMoved = true
        dragging = true
        hoverTarget = null
        excite = 1
        wake(now)
        root.classList.add('glass-pet--held')
        say(pick(GRAB_LINES), now)
      }
    }

    const onRelease = () => {
      if (!dragArmed) return
      dragArmed = false
      if (!dragging) return
      dragging = false
      root.classList.remove('glass-pet--held')
      const now = performance.now()
      vx = Math.max(-THROW_MAX, Math.min(THROW_MAX, dragVX))
      vy = Math.max(-THROW_MAX, Math.min(THROW_MAX, dragVY))
      excite = 1
      lastActivity = now
      releasedAt = now
      displacedUntil = now + DISPLACED_MS
      anchorX = null
      anchorY = null
      restingSince = 0
      awaitingLanding = true
      suppressClickUntil = now + 250
    }

    const onEnter = () => { hovering = true }
    const onLeave = () => { hovering = false }

    body.addEventListener('click', onPoke)
    body.addEventListener('pointerdown', onGrab)
    window.addEventListener('pointermove', onDragMove, { passive: true })
    window.addEventListener('pointerup', onRelease)
    window.addEventListener('pointercancel', onRelease)
    document.addEventListener('pointerover', onHoverSection, { passive: true })
    body.addEventListener('pointerenter', onEnter)
    body.addEventListener('pointerleave', onLeave)
    document.addEventListener('click', onLeaving, true)
    window.addEventListener('scroll', onActivity, { passive: true })
    window.addEventListener('pointermove', onActivity, { passive: true })
    frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      body.removeEventListener('click', onPoke)
      body.removeEventListener('pointerdown', onGrab)
      window.removeEventListener('pointermove', onDragMove)
      window.removeEventListener('pointerup', onRelease)
      window.removeEventListener('pointercancel', onRelease)
      document.removeEventListener('pointerover', onHoverSection)
      body.removeEventListener('pointerenter', onEnter)
      body.removeEventListener('pointerleave', onLeave)
      document.removeEventListener('click', onLeaving, true)
      window.removeEventListener('scroll', onActivity)
      window.removeEventListener('pointermove', onActivity)
    }
  }, [rootRef, bodyRef, bubbleRef])
}
