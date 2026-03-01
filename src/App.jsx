import { useRef, useCallback, useEffect, useMemo, useState } from 'react'
import BackgroundEffects from './components/BackgroundEffects'
import Header from './components/Header'
import DomainCard from './components/DomainCard'
import StatusBar from './components/StatusBar'
import Ticker from './components/Ticker'
import About from './components/About'
import { useMouseGridTracking } from './hooks/useMouseGridTracking'
import { useGlitchEffect } from './hooks/useGlitchEffect'
import { DEFAULT_LANGUAGE, getLanguageOptions, getLocaleCopy } from './i18n'

const domainMetadata = [
  {
    name: 'circuit.menu',
    url: 'https://circuit.menu',
    tag: 'Offline',
    icon: '~',
  },
  {
    name: 'coolstorydidntask.com',
    url: 'https://coolstorydidntask.com',
    tag: 'Beta',
    icon: '>',
  },
  {
    name: 'altraic.com',
    url: 'https://altraic.com',
    tag: 'Beta',
    icon: '&',
  },
  {
    name: 'mi6.tf',
    url: 'https://mi6.tf',
    tag: 'Live',
    icon: '!',
  },
  {
    name: 'obscurapdf.com',
    url: 'https://obscurapdf.com',
    tag: 'Live',
    icon: '#',
  },
  {
    name: 'justexplain.cv',
    url: 'https://justexplain.cv',
    tag: 'Live',
    icon: '*',
  },
  {
    name: 'fxlive.cc',
    url: 'https://fxlive.cc',
    tag: 'Live',
    icon: '$',
  }
]

function App() {
  const domainNameRefs = useRef([])
  const [showScrollHint, setShowScrollHint] = useState(false)
  const [language, setLanguage] = useState(() => {
    if (typeof window === 'undefined') return DEFAULT_LANGUAGE
    return localStorage.getItem('preferred-language') || DEFAULT_LANGUAGE
  })
  const copy = useMemo(() => getLocaleCopy(language).copy, [language])
  const defaultCopy = useMemo(() => getLocaleCopy(DEFAULT_LANGUAGE).copy, [])
  const languageOptions = useMemo(() => getLanguageOptions(), [])
  useMouseGridTracking()
  useGlitchEffect(domainNameRefs)

  const domains = domainMetadata.map((domain) => ({
    ...domain,
    description: copy.domains[domain.name] ?? defaultCopy.domains[domain.name],
  }))

  const placeholders = [
    { name: copy.domainCard.tbd, description: copy.placeholders[0], icon: '?' },
    { name: copy.domainCard.tbd, description: copy.placeholders[1], icon: '...' },
  ]

  const setDomainNameRef = useCallback((index) => (el) => {
    domainNameRefs.current[index] = el
  }, [])

  // Sort domains: Live/Beta first, then Offline, then placeholders
  const sortedDomains = [...domains].sort((a, b) => {
    const order = { Live: 0, Beta: 1, Offline: 2 }
    return (order[a.tag] ?? 3) - (order[b.tag] ?? 3)
  })

  useEffect(() => {
    const updateScrollHint = () => {
      const doc = document.documentElement
      const maxScrollTop = doc.scrollHeight - window.innerHeight
      const hasMoreContent = maxScrollTop > 48
      const isNearBottom = window.scrollY >= maxScrollTop - 64
      setShowScrollHint(hasMoreContent && !isNearBottom)
    }

    updateScrollHint()
    window.addEventListener('resize', updateScrollHint)
    window.addEventListener('scroll', updateScrollHint, { passive: true })

    return () => {
      window.removeEventListener('resize', updateScrollHint)
      window.removeEventListener('scroll', updateScrollHint)
    }
  }, [])

  useEffect(() => {
    document.documentElement.lang = language
    localStorage.setItem('preferred-language', language)
  }, [language])

  return (
    <>
      <BackgroundEffects />

      <div className="min-h-screen flex flex-col">
        <StatusBar
          copy={copy.statusBar}
          language={language}
          languageOptions={languageOptions}
          onLanguageChange={setLanguage}
        />

        <main className="flex-1 flex flex-col items-center justify-center w-full px-4 sm:px-6 lg:px-8 py-24 sm:py-28 md:py-32">
          <Header copy={copy.header} projectCount={domains.length} />

          {showScrollHint && (
            <div
              className="mb-10 md:mb-12 flex items-center gap-4 text-text-secondary text-xs font-mono tracking-wider opacity-40 animate-fade-in"
              style={{ animationDelay: '1.2s' }}
            >
              <span className="h-px w-8 bg-white/20" />
              <span>{copy.app.scrollForMore}</span>
              <span className="h-px w-8 bg-white/20" />
            </div>
          )}

          <section
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-[1100px] w-full mx-auto animate-fade-in-up"
            style={{ animationDelay: '0.4s' }}
            aria-label={copy.app.projectsAria}
          >
            {sortedDomains.map((domain, index) => (
              <DomainCard
                key={domain.name}
                name={domain.name}
                url={domain.url}
                description={domain.description}
                tag={domain.tag}
                icon={domain.icon}
                index={index}
                total={sortedDomains.length + placeholders.length}
                animationDelay={`${0.5 + index * 0.1}s`}
                domainNameRef={setDomainNameRef(index)}
                copy={copy.domainCard}
              />
            ))}
            {placeholders.map((placeholder, index) => (
              <DomainCard
                key={`placeholder-${index}`}
                name={placeholder.name}
                description={placeholder.description}
                icon={placeholder.icon}
                isPlaceholder
                animationDelay={`${0.5 + (sortedDomains.length + index) * 0.1}s`}
                copy={copy.domainCard}
              />
            ))}
          </section>

          <About copy={copy.about} />
        </main>

        <Ticker copy={copy.ticker} />
      </div>
    </>
  )
}

export default App
