import { useEffect } from 'react'

const EDGE = 30
const INSET = 44
const APPROACH = 4.2
const PICK_MS = 120
const SETTLE_MS = 700
const SAY_MS = 4800
const REPEAT_MS = 60000
const IDLE_MS = 45000

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
    let subject = null
    let subjectSince = 0
    let pickedAt = 0
    let sayUntil = 0
    let lastSaid = performance.now()
    let idleIndex = -1
    let pokeIndex = -1
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

      if (now - pickedAt > PICK_MS) {
        pickedAt = now
        const next = pickSubject()
        if (next !== subject) {
          subject = next
          subjectSince = now
        }
      }

      const half = body.offsetWidth / 2
      let targetX = window.innerWidth - EDGE - half
      let targetY = window.innerHeight * 0.6

      if (subject) {
        const rect = subject.getBoundingClientRect()
        targetX = rect.right - INSET
        targetY = rect.bottom - INSET
      }

      targetX = Math.min(Math.max(targetX, EDGE + half), window.innerWidth - EDGE - half)
      targetY = Math.min(Math.max(targetY, EDGE + half), window.innerHeight - EDGE - half)

      const ease = 1 - Math.exp(-APPROACH * dt)
      const settling = Math.hypot(targetX - x, targetY - y) < 60
      x += (targetX - x) * ease
      y += (targetY - y) * ease

      if (!sayUntil) {
        const line = subject?.dataset.petLine
        if (line && settling && now - subjectSince > SETTLE_MS && now - (saidAt.get(subject) ?? -Infinity) > REPEAT_MS) {
          saidAt.set(subject, now)
          say(line, now)
        } else if (now - lastSaid > IDLE_MS && document.hasFocus()) {
          idleIndex = (idleIndex + 1) % IDLE_LINES.length
          say(IDLE_LINES[idleIndex], now)
        }
      } else if (now > sayUntil) {
        bubble.classList.remove('is-visible')
        sayUntil = 0
      }

      bubble.classList.toggle('glass-pet__say--left', x > window.innerWidth * 0.55)

      const bob = settling ? Math.sin(now / 1100) * 2.4 : 0
      root.style.transform = `translate3d(${(x - half).toFixed(1)}px, ${(y - half + bob).toFixed(1)}px, 0)`
    }

    const onPoke = () => {
      pokeIndex = (pokeIndex + 1) % POKE_LINES.length
      say(POKE_LINES[pokeIndex], performance.now())
    }

    body.addEventListener('click', onPoke)
    frame = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(frame)
      body.removeEventListener('click', onPoke)
    }
  }, [rootRef, bodyRef, bubbleRef])
}
