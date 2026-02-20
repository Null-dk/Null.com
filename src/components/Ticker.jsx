import { useEffect, useRef, useState } from 'react'

function TickerContent({ isClone = false, items }) {
  return (
    <div className="flex items-center gap-0 pr-0">
      {items.map((item, i) => (
        <div key={i} className="flex items-center">
          {i > 0 && (
            <span className="mx-6 text-white/10 text-[0.6rem]" aria-hidden="true">&bull;</span>
          )}
          {item.type === 'link' ? (
            <a
              href={item.href}
              className="ticker-link font-mono text-[0.75rem] text-accent/80 no-underline transition-all duration-300 whitespace-nowrap hover:text-accent"
              tabIndex={isClone ? -1 : undefined}
            >
              {item.value}
            </a>
          ) : (
            <span className="font-mono text-[0.75rem] text-text-secondary/50 uppercase tracking-wider whitespace-nowrap">
              {item.value}
            </span>
          )}
        </div>
      ))}
      <span className="mx-6 text-white/10 text-[0.6rem]" aria-hidden="true">&bull;</span>
    </div>
  )
}

function Ticker({ copy }) {
  const contentRef = useRef(null)
  const [loopWidth, setLoopWidth] = useState(0)
  const [chunkCount, setChunkCount] = useState(4)

  useEffect(() => {
    const measureTicker = () => {
      const contentWidth = contentRef.current?.offsetWidth ?? 0
      if (!contentWidth) return

      const viewportWidth = window.innerWidth || document.documentElement.clientWidth
      const requiredChunks = Math.max(4, Math.ceil(viewportWidth / contentWidth) + 2)

      setLoopWidth((previousWidth) => (Math.abs(previousWidth - contentWidth) < 1 ? previousWidth : contentWidth))
      setChunkCount((previousCount) => (previousCount === requiredChunks ? previousCount : requiredChunks))
    }

    measureTicker()
    window.addEventListener('resize', measureTicker)

    return () => {
      window.removeEventListener('resize', measureTicker)
    }
  }, [])

  return (
    <footer
      className="ticker-footer fixed bottom-0 left-0 w-full border-t border-white/5 overflow-hidden backdrop-blur-[16px] z-50 animate-fade-in"
      style={{
        background: 'linear-gradient(180deg, rgba(10,10,10,0.6), rgba(10,10,10,0.95))',
        animationDelay: '0.8s',
      }}
      aria-label={copy.aria}
    >
      <div className="py-3.5">
        <div
          className="ticker-track flex w-max animate-ticker-scroll hover:[animation-play-state:paused] will-change-transform"
          style={{ '--ticker-loop-width': `${loopWidth || 0}px` }}
        >
          {Array.from({ length: chunkCount }, (_, index) => (
            <div
              key={`ticker-content-${index}`}
              ref={index === 0 ? contentRef : null}
              className="shrink-0"
              aria-hidden={index > 0}
            >
              <TickerContent isClone={index > 0} items={copy.items} />
            </div>
          ))}
        </div>
      </div>
    </footer>
  )
}

export default Ticker
