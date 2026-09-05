import BackgroundEffects from './components/BackgroundEffects'
import Header from './components/Header'
import DomainCard from './components/DomainCard'
import About from './components/About'
import { useMouseGridTracking } from './hooks/useMouseGridTracking'

const domainMetadata = [
  {
    name: 'mi6.tf',
    url: 'https://mi6.tf',
    description: 'URL shortener and temporary file hosting service. Fast, simple, and ephemeral.',
    preview: '/previews/mi6.png',
  },
  {
    name: 'justexplain.cv',
    url: 'https://justexplain.cv',
    description: 'AI-powered explanations at the comprehension level you choose.',
    preview: '/previews/justexplain.png',
  },
  {
    name: 'fxlive.cc',
    url: 'https://fxlive.cc',
    description: 'Real-time currency converter with live FX rates, short-term charts, and ticker history.',
    preview: '/previews/fxlive.png',
  },
  {
    name: 'altraic.com',
    url: 'https://altraic.com',
    description: 'Early-access landing page for Altraic, currently running a public waitlist before launch.',
    preview: '/previews/altraic.png',
  },
  {
    name: 'vistraic.com',
    url: 'https://vistraic.com',
    description: 'A streamlined control dashboard for managing Minecraft accounts.',
    preview: '/previews/vistraic.png',
  },
  {
    name: 'obscurapdf.com',
    description: 'Currently unavailable.',
    offline: true,
  },
  {
    name: 'n-ulllabs.com',
    url: 'https://n-ulllabs.com',
    description: 'A home for focused browser tools, including a universal media downloader and a private clipboard image downloader.',
    preview: '/previews/null-labs.png',
  },
]

function App() {
  useMouseGridTracking()

  return (
    <>
      <BackgroundEffects />

      <div className="min-h-screen flex flex-col">
        <main className="flex-1 w-full px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20">
          <Header />

          <section
            className="project-gallery max-w-[1180px] w-full mx-auto animate-fade-in-up"
            style={{ animationDelay: '0.4s' }}
            aria-label="Projects"
          >
            {domainMetadata.map((domain, index) => (
              <DomainCard
                key={domain.name}
                name={domain.name}
                url={domain.url}
                description={domain.description}
                preview={domain.preview}
                offline={domain.offline}
                animationDelay={`${0.5 + index * 0.1}s`}
                featured={index === 0 || index === domainMetadata.length - 1}
              />
            ))}
          </section>

          <About />
        </main>
      </div>
    </>
  )
}

export default App
