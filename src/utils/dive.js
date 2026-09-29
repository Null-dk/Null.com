const EASE_OUT_EXPO = 'cubic-bezier(0.16, 1, 0.3, 1)'
const DURATION = 750

// Coming back via the back button restores the page from bfcache with the
// expanded preview still covering everything.
window.addEventListener('pageshow', (event) => {
  if (event.persisted) document.querySelectorAll('.dive-shell').forEach((node) => node.remove())
})

// Expands a card's preview to fill the screen, then navigates to the site so
// the real page loads in place of its screenshot.
export function diveInto(event, url) {
  if (event.defaultPrevented || event.button !== 0) return
  if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  const art = event.currentTarget.querySelector('.project-art')
  const img = art?.querySelector('img')
  if (!art || !img) return

  event.preventDefault()

  const rect = art.getBoundingClientRect()
  const computed = getComputedStyle(img)
  const shell = document.createElement('div')
  const clone = document.createElement('img')
  shell.className = 'dive-shell'
  clone.src = img.currentSrc || img.src
  clone.alt = ''
  shell.append(clone)
  document.body.append(shell)

  const timing = { duration: DURATION, easing: EASE_OUT_EXPO, fill: 'forwards' }

  shell.animate(
    [
      {
        left: `${rect.left}px`,
        top: `${rect.top}px`,
        width: `${rect.width}px`,
        height: `${rect.height}px`,
        boxShadow: '0 0 0 100vmax rgba(10,10,10,0)',
      },
      {
        left: '0px',
        top: '0px',
        width: `${document.documentElement.clientWidth}px`,
        height: `${window.innerHeight}px`,
        boxShadow: '0 0 0 100vmax rgba(10,10,10,1)',
      },
    ],
    timing,
  )

  clone
    .animate(
      [
        { objectPosition: computed.objectPosition, filter: computed.filter },
        { objectPosition: 'center top', filter: 'none' },
      ],
      timing,
    )
    .finished.then(() => {
      window.location.href = url
    })
}
