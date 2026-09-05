import { useEffect, useMemo, useState } from 'react'
import BackgroundEffects from './components/BackgroundEffects'
import GlassDefs from './components/GlassDefs'
import Header from './components/Header'
import DomainCard from './components/DomainCard'
import About from './components/About'
import { useMouseGridTracking } from './hooks/useMouseGridTracking'
import { DEFAULT_LANGUAGE, getLanguageOptions, getLocaleCopy } from './i18n'

const domainMetadata = [
  {
    name: 'altraic.com',
    url: 'https://altraic.com',
    tag: 'Beta',
    icon: '&',
  },
  {
    name: 'vistraic.com',
    url: 'https://vistraic.com',
    description: 'A streamlined control dashboard for managing Minecraft accounts.',
    tag: 'Beta',
    icon: '+',
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
    description: '',
    tag: 'Beta',
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
  },
  {
    name: 'n-ulllabs.com',
    url: 'https://n-ulllabs.com',
    tag: 'Beta',
    icon: '%',
  }
]

function App() {
  const [language, setLanguage] = useState(() => {
    if (typeof window === 'undefined') return DEFAULT_LANGUAGE
    return localStorage.getItem('preferred-language') || DEFAULT_LANGUAGE
  })
  const copy = useMemo(() => getLocaleCopy(language).copy, [language])
  const defaultCopy = useMemo(() => getLocaleCopy(DEFAULT_LANGUAGE).copy, [])
  const languageOptions = useMemo(() => getLanguageOptions(), [])
  useMouseGridTracking()

  const domains = domainMetadata.map((domain) => ({
    ...domain,
    description: domain.description ?? copy.domains[domain.name] ?? defaultCopy.domains[domain.name],
  }))

  // Sort domains: Live/Beta first, then Offline, then placeholders
  const sortedDomains = [...domains].sort((a, b) => {
    const order = { Live: 0, Beta: 1, Offline: 2 }
    return (order[a.tag] ?? 3) - (order[b.tag] ?? 3)
  })

  useEffect(() => {
    document.documentElement.lang = language
    localStorage.setItem('preferred-language', language)
  }, [language])

  return (
    <>
      <GlassDefs />
      <BackgroundEffects />

      <div className="min-h-screen flex flex-col">
        <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
          <Header copy={copy.header} />

          <section
            className="project-gallery max-w-[1180px] w-full mx-auto animate-fade-in-up"
            style={{ animationDelay: '0.4s' }}
            aria-label={copy.app.projectsAria}
          >
            {sortedDomains.map((domain, index) => (
              <DomainCard
                key={domain.name}
                name={domain.name}
                url={domain.url}
                description={domain.description}
                icon={domain.icon}
                animationDelay={`${0.5 + index * 0.1}s`}
                featured={index === 0 || index === sortedDomains.length - 1}
              />
            ))}
          </section>

          <About copy={copy.about} language={language} languageOptions={languageOptions} onLanguageChange={setLanguage} />
        </main>
      </div>
    </>
  )
}

export default App
