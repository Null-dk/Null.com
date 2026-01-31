import { useRef, useCallback } from 'react'

const isTouchDevice = typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)
const prefersReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

function ArrowIcon() {
  return (
    <svg
      className="external-link-icon shrink-0 w-4 h-4 opacity-0 -translate-y-0.5 translate-x-0.5 transition-all duration-300 ease-[var(--ease-out-expo)] text-text-secondary"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  )
}

function TerminalCursor() {
  return (
    <span
      className="inline-block w-[2px] h-[0.9em] bg-accent ml-1 align-text-bottom animate-cursor-blink"
      style={{ boxShadow: '0 0 8px rgba(255, 255, 255, 0.4)' }}
      aria-hidden="true"
    />
  )
}

function DomainCard({ name, url, description, tag, icon, index, total, isPlaceholder, animationDelay, domainNameRef }) {
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

  const cardClasses = `domain-card ${isPlaceholder ? 'placeholder-card' : ''} group/card bg-glass-bg border border-glass-border rounded-2xl relative overflow-hidden flex flex-col backdrop-blur-[12px] text-text-primary no-underline animate-fade-in-up`

  const content = (
    <>
      <div className="card-shine" aria-hidden="true" />

      {/* Card header with icon and tag */}
      <div className="flex items-center justify-between px-6 pt-5 pb-0">
        <span className="font-mono text-[0.7rem] text-text-secondary opacity-40 tracking-wider">
          {icon && <span className="mr-1.5 text-accent/40">{icon}</span>}
          {typeof index === 'number' ? `${String(index + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}` : null}
        </span>
        <div className="flex items-center gap-2">
          {tag && (
            <span className={`font-mono text-[0.6rem] tracking-wider uppercase px-2.5 py-1 rounded-full border ${
              tag === 'Live' ? 'text-accent/70 border-white/10 bg-white/5' :
              tag === 'Beta' ? 'text-accent-secondary/60 border-white/8 bg-white/3' :
              'text-text-secondary/50 border-white/6 bg-white/2'
            }`}>
              {tag}
            </span>
          )}
          {url && <ArrowIcon />}
        </div>
      </div>

      {/* Card body */}
      <div className="px-6 pt-4 pb-6 flex-1 flex flex-col">
        <h2 className="font-mono text-lg md:text-xl font-bold relative text-accent leading-tight break-words transition-colors duration-300">
          <span className="domain-name-text" ref={domainNameRef}>{name}</span>
          {!isPlaceholder && <TerminalCursor />}
        </h2>
        {description && (
          <p className="domain-explainer text-[0.8rem] text-text-secondary opacity-50 mt-3 leading-relaxed transition-opacity duration-300 line-clamp-2">
            {description}
          </p>
        )}
      </div>

      {/* Card footer line */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/8 to-transparent" />
      <div className="px-6 py-3 flex items-center justify-between">
        <span className="font-mono text-[0.6rem] text-text-secondary/40 tracking-wider">
          {isPlaceholder ? 'TBD' : url?.replace('https://', '')}
        </span>
        {!isPlaceholder && (
          <span className="font-mono text-[0.55rem] text-text-secondary/30 tracking-wider group-hover/card:text-text-secondary/50 transition-colors duration-300">
            VISIT &rarr;
          </span>
        )}
      </div>
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
