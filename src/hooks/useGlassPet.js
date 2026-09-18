import { useEffect } from 'react'

const EDGE = 30
const INSET = 44
const STIFFNESS = 58
const DAMPING = 11
const ANTICIPATE_MS = 170
const ANTICIPATE_PULL = 11
const LAUNCH_DISTANCE = 130
const DRIFT_X = 1.2
const DRIFT_Y = 1.6
const SETTLE_MS = 700
const SAY_MS = 4800
const REPEAT_MS = 60000
const IDLE_MS = 45000
const SLEEP_MS = 60000
const STICKY = 120
const WAKE_QUIET_MS = 20000
const SCROLL_SETTLE_MS = 260
const DECISION_MIN = 8000
const DECISION_SPREAD = 10000
const RELOCATE_COOLDOWN_MIN = 20000
const RELOCATE_COOLDOWN_SPREAD = 20000

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
const HOP_IMPULSE = 270

const STIFFNESS_DRAG = 620
const DAMPING_DRAG = 34
const HOVER_COOLDOWN = 700
const HOVER_MIN_GAP = 200
const HOVER_INTENT_MS = 520
const DISPLACED_MS = 12000
const SUBSTEP = 1 / 120
const DRAG_THRESHOLD = 6
const THROW_MAX = 2600

const HOVER_SCALE = 1.14
const COLLIDE_MIN_WIDTH = 720
const ROAM_DURATION = 2800
const ROAM_DURATION_SPREAD = 1800
const ROAM_MARGIN = 66
const ROAM_DISTANCE_MIN = 90
const ROAM_DISTANCE_SPREAD = 170
const RIGHT_TERRITORY = 0.68
const RARE_MIN = 65000
const RARE_SPREAD = 65000
const RARE_DURATION = 8500
const LONG_PRESS_MS = 680

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

const DOUBLE_POKE_LINES = [
  'double boop.',
  'two. i counted.',
  'a very deliberate poke.',
  'is this a code?',
]

const POKE_COMBO_LINES = [
  'combo detected.',
  'okay, speedy.',
  'that was a lot of you at once.',
  'achievement: persistent finger.',
]

const HOLD_LINES = [
  'this is strangely calming.',
  'you can let go whenever.',
  'warm hands.',
  '...comfortable, actually.',
]

const THROW_COMBO_LINES = [
  'i am learning to fly against my will.',
  'frequent flyer status achieved.',
  'you have discovered momentum.',
  'my insurance will hear about this.',
]

const RARE_EVENTS = [
  { name: 'prism', lines: ['oh. colours.', 'briefly spectacular.', 'the light did something strange.'] },
  { name: 'phase', lines: ['between pixels. back soon.', 'i appear to be optional.', 'do not adjust your screen.'] },
  { name: 'zoomies', lines: ['one moment. important business.', 'sudden appointment.', 'i have somewhere to be.'] },
]

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

/**
 * Runs a small weighted behavior engine around static screen-space anchors.
 * `[data-pet-line]` elements provide dialogue and surfaces, while pointer
 * attention remains completely separate from locomotion.
 */
export function useGlassPet({ rootRef, bodyRef, bubbleRef }) {
  useEffect(() => {
    const root = rootRef.current
    const body = bodyRef.current
    const bubble = bubbleRef.current
    if (!root || !body || !bubble || prefersReducedMotion()) return

    const spawnInset = Math.max(72, Math.min(150, window.innerWidth * 0.1))
    let x = window.innerWidth - spawnInset
    let y = window.innerHeight * 0.7
    let vx = 0
    let vy = 0
    let subject = null
    let subjectSince = 0
    let scrollRequested = false
    let scrollAt = -Infinity
    let frozen = !document.hasFocus() || document.visibilityState !== 'visible'
    let windUpUntil = 0
    let windUpX = 0
    let windUpY = 0
    let sayUntil = 0
    let lastSaid = performance.now()
    let lastActivity = performance.now()
    let asleep = false
    let sleptAt = 0
    let hoverTarget = null
    let hoverPending = null
    let hoverPendingSince = 0
    let displacedUntil = 0
    let anchorX = x
    let anchorY = y
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
    let contact = 0
    let contactX = 0
    let contactY = 0
    let contactRot = 0
    let mood = 'content'
    let moodUntil = 0
    let roamX = 0
    let roamY = 0
    let roamUntil = 0
    let decisionAt = performance.now() + DECISION_MIN
    let relocateAllowedAt = performance.now() + RELOCATE_COOLDOWN_MIN
    let rareAt = performance.now() + RARE_MIN + Math.random() * RARE_SPREAD
    let rareUntil = 0
    let rareKind = ''
    let holdTimer = 0
    let holdTriggered = false
    const pokeTimes = []
    const throwTimes = []
    let last = performance.now()
    let frame = 0
    const saidAt = new WeakMap()
    const saidCount = new WeakMap()
    const lastPicked = new Map()

    const setMood = (next, now, duration = 5000) => {
      mood = next
      moodUntil = now + duration
      root.dataset.mood = next
    }

    const territoryMinX = () =>
      window.innerWidth * (window.innerWidth <= 720 ? 0.55 : RIGHT_TERRITORY)

    const rightTerritoryPoint = () => ({
      x: territoryMinX() + Math.random() * Math.max(1, window.innerWidth - ROAM_MARGIN - territoryMinX()),
      y: ROAM_MARGIN + Math.random() * Math.max(1, window.innerHeight - ROAM_MARGIN * 2),
    })

    const nearbyPoint = (wide = false) => {
      if (wide) return rightTerritoryPoint()
      const angle = Math.random() * Math.PI * 2
      const distance = ROAM_DISTANCE_MIN + Math.random() * ROAM_DISTANCE_SPREAD
      return {
        x: Math.min(Math.max(x + Math.cos(angle) * distance, territoryMinX()), window.innerWidth - ROAM_MARGIN),
        y: Math.min(Math.max(y + Math.sin(angle) * distance, ROAM_MARGIN), window.innerHeight - ROAM_MARGIN),
      }
    }

    const startRoam = (now, duration = ROAM_DURATION + Math.random() * ROAM_DURATION_SPREAD, wide = false) => {
      const point = nearbyPoint(wide)
      roamX = point.x
      roamY = point.y
      roamUntil = now + duration
      decisionAt = roamUntil + DECISION_MIN + Math.random() * DECISION_SPREAD
    }

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

    // The most-read section is based on scroll position only. Pointer location
    // may affect the eyes and dialogue, but never chooses the pet's home.
    const pickSubject = () => {
      const height = window.innerHeight
      let best = null
      let bestScore = -Infinity
      for (const el of document.querySelectorAll('[data-pet-line]')) {
        const rect = el.getBoundingClientRect()
        const visible = Math.min(rect.bottom, height) - Math.max(rect.top, 0)
        if (visible < 80) continue
        const offCenter = Math.abs((rect.top + rect.bottom) / 2 - height / 2)
        let score = visible - offCenter * 0.6
        if (el.dataset.petBehavior) score += 180
        score += ((rect.left + rect.right) / 2 / window.innerWidth) * 220
        if (el === subject) score += STICKY
        if (score > bestScore) {
          best = el
          bestScore = score
        }
      }
      return best
    }

    const subjectIsVisible = (el) => {
      if (!el) return false
      const rect = el.getBoundingClientRect()
      return rect.bottom > 80 && rect.top < window.innerHeight - 80
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

    // Move a short distance along the edge already under the pet. This is the
    // common autonomous movement; it never chooses a new card or chases input.
    const shuffleAlongSurface = (el, half) => {
      const art = el?.querySelector('.project-art')
      if (!art) return null
      const box = art.getBoundingClientRect()
      const pad = half + 2
      const sides = [
        { side: 'top', distance: Math.abs(y - (box.top - pad)) },
        { side: 'right', distance: Math.abs(x - (box.right + pad)) },
        { side: 'bottom', distance: Math.abs(y - (box.bottom + pad)) },
        { side: 'left', distance: Math.abs(x - (box.left - pad)) },
      ].sort((a, b) => a.distance - b.distance)
      const delta = (Math.random() < 0.5 ? -1 : 1) * (20 + Math.random() * 50)

      if (sides[0].side === 'top' || sides[0].side === 'bottom') {
        const minX = Math.max(box.left + half, territoryMinX())
        const maxX = box.right - half
        if (maxX < minX) return null
        return {
          x: clampX(Math.min(Math.max(x + delta, minX), maxX), half),
          y: clampY(sides[0].side === 'top' ? box.top - pad : box.bottom + pad, half),
        }
      }
      const sideX = sides[0].side === 'left' ? box.left - pad : box.right + pad
      if (sideX < territoryMinX()) return null
      return {
        x: clampX(sideX, half),
        y: clampY(Math.min(Math.max(y + delta, box.top + half), box.bottom - half), half),
      }
    }

    const nearbySurface = (rects, half) => {
      const candidates = [...document.querySelectorAll('[data-pet-line]')]
        .filter((el) => el !== subject && subjectIsVisible(el))
        .map((el) => ({ el, spot: perchFor(el, rects, half, x, y) }))
        .map((entry) => ({ ...entry, distance: Math.hypot(entry.spot.x - x, entry.spot.y - y) }))
        .filter((entry) => entry.distance < 520 && entry.spot.x >= territoryMinX())
        .sort((a, b) => a.distance - b.distance)
      if (!candidates.length) return null
      return candidates[Math.floor(Math.random() * Math.min(2, candidates.length))]
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
      const active = !frozen && document.visibilityState === 'visible' && document.hasFocus()

      const roaming = !dragging && now < roamUntil

      if (mood !== 'content' && !asleep && now > moodUntil) setMood('content', now, 0)

      if (active && !rareKind && now >= rareAt && !asleep && !dragging) {
        const event = RARE_EVENTS[Math.floor(Math.random() * RARE_EVENTS.length)]
        rareKind = event.name
        rareUntil = now + RARE_DURATION
        rareAt = rareUntil + RARE_MIN + Math.random() * RARE_SPREAD
        root.dataset.event = rareKind
        setMood(rareKind === 'zoomies' ? 'mischievous' : 'curious', now, RARE_DURATION)
        say(pick(event.lines), now)
        if (rareKind === 'zoomies') startRoam(now, RARE_DURATION, true)
      } else if (rareKind && now > rareUntil) {
        rareKind = ''
        delete root.dataset.event
      }

      // Surfaces are sampled only after scrolling stops. Between these moments,
      // the anchor is fixed in screen space instead of chasing moving DOM boxes.
      if (active && !dragging && now > displacedUntil && scrollRequested &&
        now - scrollAt > SCROLL_SETTLE_MS) {
        const next = subjectIsVisible(subject) ? subject : pickSubject()
        if (next) {
          const spot = perchFor(next, rects, half, x, y)
          subject = next
          subjectSince = now
          anchorX = spot.x
          anchorY = spot.y
          const distance = Math.hypot(spot.x - x, spot.y - y)
          if (distance > LAUNCH_DISTANCE) {
            windUpX = x - ((spot.x - x) / distance) * ANTICIPATE_PULL
            windUpY = y - ((spot.y - y) / distance) * ANTICIPATE_PULL
            windUpUntil = now + ANTICIPATE_MS
          }
        }
        scrollRequested = false
        decisionAt = now + DECISION_MIN + Math.random() * DECISION_SPREAD
      }

      const settledForDecision =
        anchorX !== null &&
        Math.hypot(anchorX - x, anchorY - y) < 36 &&
        Math.hypot(vx, vy) < 70

      // Shimeji-style weighted actions. Most decisions are deliberately
      // non-locomotive; every movement gets a long quiet interval afterward.
      if (active && !asleep && !dragging && !roaming && now > displacedUntil &&
        settledForDecision && now >= decisionAt) {
        decisionAt = now + DECISION_MIN + Math.random() * DECISION_SPREAD
        const choice = Math.random()

        if (choice < 0.45) {
          // Stay put. Blinks, gaze and asymmetric eye poses carry the life here.
          poseAt = Math.min(poseAt, now + 350)
        } else if (choice < 0.7) {
          // Small in-place action.
          if (Math.random() < 0.45) vy -= HOP_IMPULSE * 0.55
          else excite = Math.max(excite, 0.55)
        } else if (choice < 0.85) {
          const spot = shuffleAlongSurface(subject, half)
          if (spot) {
            anchorX = spot.x
            anchorY = spot.y
          }
        } else if (choice < 0.93) {
          const behavior = subject?.dataset.petBehavior ?? ''
          if ((behavior === 'ephemeral' || behavior === 'ghost') && !rareKind) {
            rareKind = 'phase'
            rareUntil = now + 2200
            root.dataset.event = rareKind
          } else if (behavior === 'patrol' || behavior === 'ticker') {
            const spot = shuffleAlongSurface(subject, half)
            if (spot) {
              anchorX = spot.x
              anchorY = spot.y
            }
          } else if (behavior === 'waiting') {
            setMood('calm', now, 4200)
          } else if (behavior === 'experiment') {
            vy -= HOP_IMPULSE * 0.7
            excite = 0.8
          } else {
            poseAt = Math.min(poseAt, now + 200)
          }
        } else if (choice < 0.98) {
          startRoam(now)
        } else if (now >= relocateAllowedAt) {
          const next = nearbySurface(rects, half)
          if (next) {
            subject = next.el
            subjectSince = now
            anchorX = next.spot.x
            anchorY = next.spot.y
            relocateAllowedAt = now + RELOCATE_COOLDOWN_MIN + Math.random() * RELOCATE_COOLDOWN_SPREAD
            decisionAt = relocateAllowedAt
          }
        }
      }

      if (active && !asleep && now - lastActivity > SLEEP_MS) {
        asleep = true
        sleptAt = now
        root.classList.add('glass-pet--asleep')
        root.dataset.mood = 'sleepy'
      }

      const displaced = !dragging && now < displacedUntil
      const perch = anchorX !== null
        ? { x: anchorX, y: anchorY }
        : { x, y }
      let targetX = perch.x
      let targetY = perch.y

      // Card edges are home, not a leash. Regular roaming and special events
      // can choose any safe viewport point, including points over the cards.
      if (roaming) {
        targetX = roamX
        targetY = roamY
      }

      // Just dropped: no pull at all until it comes to rest, or it would be
      // hauled straight back to the ledge it came from.
      if (displaced && anchorX === null) {
        targetX = x
        targetY = y
      }

      if (!active) {
        targetX = x
        targetY = y
        vx = 0
        vy = 0
      } else if (now < windUpUntil) {
        targetX = windUpX
        targetY = windUpY
      } else if (!asleep) {
        // A tiny breathing drift is visual life, not locomotion.
        targetX += Math.sin(now / 4300) * DRIFT_X
        targetY += Math.sin(now / 6700 + 1.3) * DRIFT_Y
      }
      root.dataset.behavior = subject?.dataset.petBehavior ?? ''

      targetX = clampX(targetX, half)
      targetY = clampY(targetY, half)

      if (dragging) {
        targetX = dragPX + grabDX
        targetY = dragPY + grabDY
      }

      const stiffness = dragging ? STIFFNESS_DRAG : STIFFNESS
      const damping = dragging ? DAMPING_DRAG : DAMPING

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

      x = clampX(x, half)
      y = clampY(y, half)

      if (displaced && anchorX === null) {
        const coasting = Math.hypot(vx, vy)
        restingSince = coasting < 40 ? (restingSince || now) : 0
        if (restingSince && now - restingSince > 180) {
          anchorX = clampX(x, half)
          anchorY = clampY(y, half)
          const local = nearestSection(x, y)
          if (local) {
            subject = local
            subjectSince = now
            scrollRequested = false
          }
          decisionAt = now + DECISION_MIN + Math.random() * DECISION_SPREAD
        }
      }

      const drifting = Math.hypot(vx, vy)
      stillSince = drifting < STILL_SPEED ? (stillSince || now) : 0
      const arrived =
        (Math.hypot(perch.x - x, perch.y - y) < 60 && drifting < 90) ||
        (stillSince > 0 && now - stillSince > STILL_MS)

      const hoverReady =
        !!hoverPending?.dataset.petLine &&
        active &&
        !asleep &&
        !dragging &&
        now - hoverPendingSince > HOVER_INTENT_MS &&
        hoverPending.matches(':hover') &&
        now - lastSaid > HOVER_MIN_GAP &&
        now - (saidAt.get(hoverPending) ?? -Infinity) > HOVER_COOLDOWN
      const ready =
        !!subject?.dataset.petLine &&
        !asleep &&
        !dragging &&
        active &&
        now - subjectSince > SETTLE_MS &&
        now - lastSaid > HOVER_MIN_GAP &&
        now - (saidAt.get(subject) ?? -Infinity) > REPEAT_MS &&
        arrived

      if (hoverReady) {
        saidAt.set(hoverPending, now)
        say(lineFor(hoverPending), now)
        hoverPending = null
        hoverPendingSince = 0
      } else if (ready) {
        saidAt.set(subject, now)
        say(lineFor(subject), now)
      } else if (!sayUntil && !asleep && !dragging && now - lastSaid > IDLE_MS &&
        active) {
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
      setMood('curious', now, 5000)
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

    const onScroll = () => {
      const now = performance.now()
      scrollRequested = true
      scrollAt = now
      roamUntil = 0
      windUpUntil = 0
      anchorX = x
      anchorY = y
      vx = 0
      vy = 0
      lastActivity = now
      if (wake(now)) say(pick(WAKE_LINES), now)
    }

    const onPoke = () => {
      const now = performance.now()
      if (now < suppressClickUntil) return
      wake(now)
      excite = 1
      pokeTimes.push(now)
      while (pokeTimes.length && now - pokeTimes[0] > 1600) pokeTimes.shift()

      if (pokeTimes.length >= 5) {
        pokeTimes.length = 0
        setMood('dizzy', now, 6500)
        startRoam(now, 3000)
        vy -= HOP_IMPULSE * 0.8
        say(pick(POKE_COMBO_LINES), now)
      } else if (pokeTimes.length === 3 && now - pokeTimes[0] < 900) {
        setMood('mischievous', now, 5000)
        vy -= HOP_IMPULSE
        say(pick(POKE_COMBO_LINES), now)
      } else if (pokeTimes.length === 2 && now - pokeTimes[0] < 420) {
        setMood('excited', now, 4000)
        say(pick(DOUBLE_POKE_LINES), now)
      } else {
        setMood('curious', now, 3500)
        say(pick(POKE_LINES), now)
      }
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
      const next = event.target.closest?.('[data-pet-line]') ?? null
      if (next === hoverTarget) return
      const now = performance.now()
      hoverTarget = next
      hoverPending = next
      hoverPendingSince = next ? now : 0
      if (next) setMood('curious', now, 3200)
    }

    const onLeaveSection = (event) => {
      const from = event.target.closest?.('[data-pet-line]') ?? null
      const to = event.relatedTarget?.closest?.('[data-pet-line]') ?? null
      if (!from || from !== hoverTarget || to === from) return
      hoverTarget = null
      hoverPending = null
      hoverPendingSince = 0
    }

    const clearHover = () => {
      hoverTarget = null
      hoverPending = null
      hoverPendingSince = 0
      hovering = false
      bubble.classList.remove('is-visible')
      sayUntil = 0
    }

    const freeze = () => {
      const now = performance.now()
      frozen = true
      clearHover()
      vx = 0
      vy = 0
      roamUntil = 0
      windUpUntil = 0
      dragging = false
      dragArmed = false
      awaitingLanding = false
      anchorX = x
      anchorY = y
      displacedUntil = 0
      decisionAt = now + DECISION_MIN + Math.random() * DECISION_SPREAD
      root.classList.remove('glass-pet--held')

      if (rareKind) {
        rareKind = ''
        rareUntil = 0
        rareAt = now + RARE_MIN + Math.random() * RARE_SPREAD
        delete root.dataset.event
      }
    }

    const resume = () => {
      if (document.visibilityState !== 'visible') return
      const now = performance.now()
      frozen = false
      last = now
      lastActivity = now
      if (rareAt < now) rareAt = now + RARE_MIN + Math.random() * RARE_SPREAD
      scrollRequested = !subjectIsVisible(subject)
      scrollAt = now - SCROLL_SETTLE_MS
    }

    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') resume()
      else freeze()
    }

    const onGrab = (event) => {
      const now = performance.now()
      dragArmed = true
      dragMoved = false
      holdTriggered = false
      grabOriginX = event.clientX
      grabOriginY = event.clientY
      dragPX = event.clientX
      dragPY = event.clientY
      grabDX = x - event.clientX
      grabDY = y - event.clientY
      dragAt = now
      dragVX = 0
      dragVY = 0
      if (awaitingLanding) {
        awaitingLanding = false
        setMood('excited', now, 4500)
        say('caught me.', now)
      }
      window.clearTimeout(holdTimer)
      holdTimer = window.setTimeout(() => {
        if (!dragArmed || dragMoved) return
        holdTriggered = true
        suppressClickUntil = performance.now() + 400
        setMood('calm', performance.now(), 6500)
        say(pick(HOLD_LINES), performance.now())
      }, LONG_PRESS_MS)
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
        window.clearTimeout(holdTimer)
        dragMoved = true
        dragging = true
        hoverTarget = null
        hoverPending = null
        hoverPendingSince = 0
        excite = 1
        wake(now)
        root.classList.add('glass-pet--held')
        setMood('startled', now, 4500)
        say(pick(GRAB_LINES), now)
      }
    }

    const onRelease = () => {
      if (!dragArmed) return
      window.clearTimeout(holdTimer)
      dragArmed = false
      if (!dragging) {
        if (holdTriggered) suppressClickUntil = performance.now() + 350
        return
      }
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
      throwTimes.push(now)
      while (throwTimes.length && now - throwTimes[0] > 10000) throwTimes.shift()
      if (throwTimes.length >= 3) {
        throwTimes.length = 0
        setMood('dizzy', now, 7000)
        say(pick(THROW_COMBO_LINES), now)
      } else {
        setMood('excited', now, 4500)
      }
    }

    const onEnter = () => { hovering = true }
    const onLeave = () => { hovering = false }

    body.addEventListener('click', onPoke)
    body.addEventListener('pointerdown', onGrab)
    window.addEventListener('pointermove', onDragMove, { passive: true })
    window.addEventListener('pointerup', onRelease)
    window.addEventListener('pointercancel', onRelease)
    document.addEventListener('pointerover', onHoverSection, { passive: true })
    document.addEventListener('pointerout', onLeaveSection, { passive: true })
    document.addEventListener('visibilitychange', onVisibilityChange)
    window.addEventListener('blur', freeze)
    window.addEventListener('focus', resume)
    window.addEventListener('pagehide', freeze)
    document.documentElement.addEventListener('pointerleave', clearHover)
    body.addEventListener('pointerenter', onEnter)
    body.addEventListener('pointerleave', onLeave)
    document.addEventListener('click', onLeaving, true)
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('pointermove', onActivity, { passive: true })
    frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(holdTimer)
      body.removeEventListener('click', onPoke)
      body.removeEventListener('pointerdown', onGrab)
      window.removeEventListener('pointermove', onDragMove)
      window.removeEventListener('pointerup', onRelease)
      window.removeEventListener('pointercancel', onRelease)
      document.removeEventListener('pointerover', onHoverSection)
      document.removeEventListener('pointerout', onLeaveSection)
      document.removeEventListener('visibilitychange', onVisibilityChange)
      window.removeEventListener('blur', freeze)
      window.removeEventListener('focus', resume)
      window.removeEventListener('pagehide', freeze)
      document.documentElement.removeEventListener('pointerleave', clearHover)
      body.removeEventListener('pointerenter', onEnter)
      body.removeEventListener('pointerleave', onLeave)
      document.removeEventListener('click', onLeaving, true)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('pointermove', onActivity)
    }
  }, [rootRef, bodyRef, bubbleRef])
}
