import { useEffect, useRef, useCallback } from 'react'
import BackgroundEffects from './components/BackgroundEffects'
import Header from './components/Header'
import DomainCard from './components/DomainCard'
import StatusBar from './components/StatusBar'
import Ticker from './components/Ticker'
import { useMouseGridTracking } from './hooks/useMouseGridTracking'
import { useGlitchEffect } from './hooks/useGlitchEffect'

const domains = [
  { name: 'circuit.menu', url: 'https://circuit.menu', description: 'Digital Menu Platform' },
  { name: 'coolstorydidntask.com', url: 'https://coolstorydidntask.com', description: 'Testing' },
  { name: 'obscurapdf.com', url: 'https://obscurapdf.com', description: 'PDF Tools' },
  { name: 'mi6.tf', url: 'https://mi6.tf', description: null },
]

const placeholders = [
  { name: 'Coming soon', description: 'In development' },
  { name: 'Coming soon', description: 'In development' },
]

const cardDelays = ['0.3s', '0.4s', '0.5s', '0.6s', '0.7s', '0.8s']

function App() {
  const domainNameRefs = useRef([])
  useMouseGridTracking()
  useGlitchEffect(domainNameRefs)

  const setDomainNameRef = useCallback((index) => (el) => {
    domainNameRefs.current[index] = el
  }, [])

  return (
    <>
      <BackgroundEffects />

      <main className="flex flex-col items-center justify-center min-h-screen w-full px-4 py-20 sm:px-5 md:pt-24 md:pb-20">
        <Header />

        <section
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-[1200px] w-[90%] mx-auto p-4 md:p-5 animate-fade-in-up"
          style={{ animationDelay: '0.2s' }}
          aria-label="Projects"
        >
          {domains.map((domain, index) => (
            <DomainCard
              key={domain.name}
              name={domain.name}
              url={domain.url}
              description={domain.description}
              index={index}
              animationDelay={cardDelays[index]}
              domainNameRef={setDomainNameRef(index)}
            />
          ))}
          {placeholders.map((placeholder, index) => (
            <DomainCard
              key={`placeholder-${index}`}
              name={placeholder.name}
              description={placeholder.description}
              isPlaceholder
              animationDelay={cardDelays[domains.length + index]}
            />
          ))}
        </section>
      </main>

      <StatusBar />
      <Ticker />
    </>
  )
}

export default App
