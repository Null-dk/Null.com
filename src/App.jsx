import { useRef, useCallback, useEffect, useState } from 'react'
import BackgroundEffects from './components/BackgroundEffects'
import Header from './components/Header'
import DomainCard from './components/DomainCard'
import StatusBar from './components/StatusBar'
import Ticker from './components/Ticker'
import About from './components/About'
import { useMouseGridTracking } from './hooks/useMouseGridTracking'
import { useGlitchEffect } from './hooks/useGlitchEffect'

const domains = [
  {
    name: 'circuit.menu',
    url: 'https://circuit.menu',
    description: 'A GTA 5 mod menu. Feature-rich, regularly updated, and built for performance.',
    tag: 'Offline',
    icon: '~',
  },
  {
    name: 'coolstorydidntask.com',
    url: 'https://coolstorydidntask.com',
    description: 'Testing environment for testing projects before they go live. Public preview.',
    tag: 'Beta',
    icon: '>',
  },
  {
    name: 'altraic.com',
    url: 'https://altraic.com',
    description: 'Early-access landing page for Altraic, currently running a public waitlist before launch.',
    tag: 'Beta',
    icon: '&',
  },
  {
    name: 'mi6.tf',
    url: 'https://mi6.tf',
    description: 'URL shortener and temporary file hosting service. Fast, simple, and ephemeral.',
    tag: 'Live',
    icon: '!',
  },
  {
    name: 'obscurapdf.com',
    url: 'https://obscurapdf.com',
    description: 'Privacy-focused PDF tools. Redact, encrypt, and process documents securely.',
    tag: 'Live',
    icon: '#',
  },
  {
    name: 'justexplain.cv',
    url: 'https://justexplain.cv',
    description: 'AI-powered explanations at the comprehension level you choose.',
    tag: 'Live',
    icon: '*',
  }
]

const placeholders = [
  { name: 'Coming soon', description: 'New project currently in development. Stay tuned for updates.', icon: '?' },
  { name: 'Coming soon', description: 'Another project brewing in the lab. Check back later.', icon: '...' },
]

function App() {
  const domainNameRefs = useRef([])
  const [showScrollHint, setShowScrollHint] = useState(false)
  useMouseGridTracking()
  useGlitchEffect(domainNameRefs)

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

  return (
    <>
      <BackgroundEffects />

      <div className="min-h-screen flex flex-col">
        <StatusBar />

        <main className="flex-1 flex flex-col items-center justify-center w-full px-4 sm:px-6 lg:px-8 py-24 sm:py-28 md:py-32">
          <Header />

          {showScrollHint && (
            <div
              className="mb-10 md:mb-12 flex items-center gap-4 text-text-secondary text-xs font-mono tracking-wider opacity-40 animate-fade-in"
              style={{ animationDelay: '1.2s' }}
            >
              <span className="h-px w-8 bg-white/20" />
              <span>SCROLL FOR MORE</span>
              <span className="h-px w-8 bg-white/20" />
            </div>
          )}

          <section
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 max-w-[1100px] w-full mx-auto animate-fade-in-up"
            style={{ animationDelay: '0.4s' }}
            aria-label="Projects"
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
              />
            ))}
          </section>

          <About />
        </main>

        <Ticker />
      </div>
    </>
  )
}

export default App
