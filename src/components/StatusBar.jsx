import { useState, useRef, useEffect, useCallback } from 'react'

function LanguagePicker({ language, languageOptions, onLanguageChange }) {
  const [open, setOpen] = useState(false)
  const [focusedIndex, setFocusedIndex] = useState(-1)
  const containerRef = useRef(null)
  const listRef = useRef(null)
  const currentLabel = languageOptions.find((o) => o.code === language)?.label ?? language.toUpperCase()

  const close = useCallback(() => {
    setOpen(false)
    setFocusedIndex(-1)
  }, [])

  const select = useCallback((code) => {
    onLanguageChange(code)
    close()
  }, [onLanguageChange, close])

  // Close on outside click
  useEffect(() => {
    if (!open) return
    const handler = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) close()
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [open, close])

  // Keyboard navigation
  const handleKeyDown = useCallback((e) => {
    if (!open) {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
        e.preventDefault()
        setOpen(true)
        setFocusedIndex(languageOptions.findIndex((o) => o.code === language))
      }
      return
    }
    if (e.key === 'Escape') { e.preventDefault(); close(); return }
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setFocusedIndex((i) => Math.min(i + 1, languageOptions.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setFocusedIndex((i) => Math.max(i - 1, 0))
    } else if (e.key === 'Enter' && focusedIndex >= 0) {
      e.preventDefault()
      select(languageOptions[focusedIndex].code)
    } else if (e.key === 'Tab') {
      close()
    }
  }, [open, close, focusedIndex, languageOptions, language, select])

  // Scroll focused item into view
  useEffect(() => {
    if (!open || focusedIndex < 0 || !listRef.current) return
    const item = listRef.current.children[focusedIndex]
    if (item) item.scrollIntoView({ block: 'nearest' })
  }, [focusedIndex, open])

  return (
    <div
      ref={containerRef}
      className="relative"
      onKeyDown={handleKeyDown}
    >
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => { setOpen((v) => !v); if (!open) setFocusedIndex(languageOptions.findIndex((o) => o.code === language)) }}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-label={`Language: ${currentLabel}`}
        className={`
          group flex items-center gap-1.5 font-mono text-[0.6rem] sm:text-[0.65rem] tracking-wider
          border transition-all duration-200 cursor-pointer select-none
          px-2.5 py-1 rounded-sm
          ${open
            ? 'border-white/20 text-accent opacity-90'
            : 'border-white/10 text-text-secondary opacity-50 hover:opacity-80 hover:border-white/15'
          }
        `}
        style={{ background: 'transparent' }}
      >
        {/* Terminal prompt prefix */}
        <span
          className={`transition-opacity duration-150 ${open ? 'opacity-60' : 'opacity-0 group-hover:opacity-40'}`}
          aria-hidden="true"
        >
          &gt;
        </span>
        <span className="uppercase">{currentLabel}</span>
        {/* Caret */}
        <span
          className={`inline-block w-px h-[0.7em] bg-current transition-all duration-200 ${open ? 'opacity-80' : 'opacity-0 group-hover:opacity-50'}`}
          style={{ animation: open ? 'lang-cursor-blink 1s step-end infinite' : 'none' }}
          aria-hidden="true"
        />
      </button>

      {/* Dropdown panel */}
      {open && (
        <div
          role="listbox"
          aria-label="Select language"
          ref={listRef}
          className="absolute right-0 top-full mt-1.5 z-50 overflow-y-auto"
          style={{
            width: '120px',
            maxHeight: '224px',
            background: 'rgba(10,10,10,0.96)',
            border: '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)',
            animation: 'lang-panel-in 0.12s ease-out forwards',
          }}
        >
          {/* Scanline top accent */}
          <div
            className="sticky top-0 left-0 right-0 h-px"
            style={{ background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)' }}
            aria-hidden="true"
          />
          {languageOptions.map((option, i) => {
            const isSelected = option.code === language
            const isFocused = i === focusedIndex
            return (
              <div
                key={option.code}
                role="option"
                aria-selected={isSelected}
                onClick={() => select(option.code)}
                onMouseEnter={() => setFocusedIndex(i)}
                className="flex items-center gap-1.5 px-2.5 py-[5px] cursor-pointer font-mono text-[0.6rem] tracking-wider transition-colors duration-100"
                style={{
                  color: isSelected
                    ? 'rgba(255,255,255,0.9)'
                    : isFocused
                      ? 'rgba(255,255,255,0.7)'
                      : 'rgba(255,255,255,0.3)',
                  background: isFocused ? 'rgba(255,255,255,0.05)' : 'transparent',
                }}
              >
                <span
                  className="w-3 shrink-0 text-[0.55rem]"
                  style={{ opacity: isSelected ? 0.8 : isFocused ? 0.5 : 0 }}
                  aria-hidden="true"
                >
                  {isSelected ? '●' : '>'}
                </span>
                <span className="uppercase truncate">{option.label}</span>
              </div>
            )
          })}
        </div>
      )}

      <style>{`
        @keyframes lang-cursor-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes lang-panel-in {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}

function StatusBar({ copy, language, languageOptions, onLanguageChange }) {
  return (
    <nav className="fixed top-0 left-0 right-0 z-100 animate-fade-in" style={{ animationDelay: '0.2s' }}>
      <div className="flex items-center justify-between px-5 sm:px-8 py-4 sm:py-5">
        <div className="font-mono text-[0.7rem] sm:text-xs text-text-secondary tracking-wider opacity-40">
          {copy.brand}
        </div>

        <div className="flex items-center gap-3 sm:gap-4">
          <LanguagePicker
            language={language}
            languageOptions={languageOptions}
            onLanguageChange={onLanguageChange}
          />

          <a
            href="https://n-ull.com"
            className="font-mono text-[0.65rem] sm:text-[0.7rem] text-text-secondary tracking-wider opacity-40 hover:opacity-80 transition-opacity duration-300"
          >
            {copy.linkLabel}
          </a>
        </div>
      </div>
    </nav>
  )
}

export default StatusBar
