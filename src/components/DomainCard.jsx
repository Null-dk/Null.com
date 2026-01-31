import { useRef, useCallback } from 'react'

const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)
const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

function ExternalLinkIcon() {
  return (
    <svg
      className="external-link-icon shrink-0 w-4 h-4 opacity-0 translate-x-[-4px] translate-y-[4px] transition-all duration-300 ease-[var(--ease-out-expo)] text-text-secondary"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  )
}

function TerminalCursor() {
  return (
    <span
      className="inline-block w-[2px] h-[1em] bg-accent ml-1 align-text-bottom animate-cursor-blink"
      style={{ boxShadow: '0 0 8px rgba(255, 255, 255, 0.4)' }}
      aria-hidden="true"
    />
  )
}

function DomainCard({ name, url, description, index, isPlaceholder, animationDelay, domainNameRef }) {
  const cardRef = useRef(null)

  const handleMouseMove = useCallback((e) => {
    if (isTouchDevice || prefersReducedMotion || isPlaceholder) return
    const card = cardRef.current
    if (!card) return
    const rect = card.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    card.style.transform = `translateY(-6px) perspective(1000px) rotateX(${y * 4}deg) rotateY(${-x * 4}deg)`
  }, [isPlaceholder])

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current
    if (card) card.style.transform = ''
  }, [])

  const handleMouseDown = useCallback(() => {
    const card = cardRef.current
    if (card && !isPlaceholder) card.style.transform = 'translateY(-2px) scale(0.98)'
  }, [isPlaceholder])

  const handleMouseUp = useCallback(() => {
    const card = cardRef.current
    if (card) card.style.transform = ''
  }, [])

  const cardClasses = `domain-card ${isPlaceholder ? 'placeholder-card' : ''} bg-glass-bg border border-glass-border rounded-2xl py-7 px-6 relative overflow-hidden flex flex-col backdrop-blur-[12px] text-text-primary no-underline animate-fade-in-up cursor-pointer max-sm:py-6 max-sm:px-5`

  const content = (
    <>
      <div className="card-shine" aria-hidden="true" />
      <div className="flex items-start justify-between gap-3">
        <h2 className="font-mono text-[1.3rem] font-bold mb-1.5 relative text-accent leading-[1.3] break-words transition-colors duration-300 max-[480px]:text-[1.1rem]">
          <span className="domain-name-text" ref={domainNameRef}>{name}</span>
          <TerminalCursor />
        </h2>
        {url && <ExternalLinkIcon />}
      </div>
      {description && (
        <p className="domain-explainer text-[0.8rem] text-text-secondary opacity-70 mt-2 leading-[1.4] transition-opacity duration-300 max-[480px]:text-[0.75rem]">
          {description}
        </p>
      )}
      {typeof index === 'number' && (
        <span className="card-index absolute bottom-2.5 right-3.5 font-mono text-[0.65rem] text-text-secondary opacity-30 transition-opacity duration-300">
          {String(index + 1).padStart(2, '0')}
        </span>
      )}
    </>
  )

  if (isPlaceholder) {
    return (
      <div
        ref={cardRef}
        className={cardClasses}
        style={{ animationDelay }}
      >
        {content}
      </div>
    )
  }

  return (
    <a
      ref={cardRef}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cardClasses}
      style={{ animationDelay }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      {content}
    </a>
  )
}

export default DomainCard
