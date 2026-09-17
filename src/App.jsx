import BackgroundEffects from './components/BackgroundEffects'
import GlassDefs from './components/GlassDefs'
import GlassPet from './components/GlassPet'
import Header from './components/Header'
import DomainCard from './components/DomainCard'
import About from './components/About'

const domainMetadata = [
  {
    name: 'mi6.tf',
    url: 'https://mi6.tf',
    description: 'URL shortener and temporary file hosting service. Fast, simple, and ephemeral.',
    preview: '/previews/mi6.png',
    quip: [
      'links and files that expire. on purpose.',
      'nothing here is meant to last.',
      'upload, share, forget.',
      'the files leave before you do.',
      'short links, shorter lifespans.',
    ],
  },
  {
    name: 'justexplain.cv',
    url: 'https://justexplain.cv',
    description: 'AI-powered explanations at the comprehension level you choose.',
    preview: '/previews/justexplain.png',
    quip: [
      'it explains things properly. i just float.',
      'pick a level. it adjusts.',
      'for when the docs assume too much.',
      'ask it something hard.',
      'explains anything. patiently.',
    ],
  },
  {
    name: 'fxlive.cc',
    url: 'https://fxlive.cc',
    description: 'Real-time currency converter with live FX rates, short-term charts, and ticker history.',
    preview: '/previews/fxlive.png',
    quip: [
      'rates that refuse to sit still.',
      'numbers, moving. endlessly.',
      'watch a currency have a bad day.',
      'live rates, tiny charts.',
      'money, but as a line graph.',
    ],
  },
  {
    name: 'altraic.com',
    url: 'https://altraic.com',
    description: 'Early-access landing page for Altraic, currently running a public waitlist before launch.',
    preview: '/previews/altraic.png',
    quip: [
      'still a waitlist. patience is the feature.',
      'not open yet. soon-ish.',
      "a door that isn't open yet.",
      'leave your email, wait nicely.',
      'coming. eventually.',
    ],
  },
  {
    name: 'vistraic.com',
    url: 'https://vistraic.com',
    description: 'A streamlined control dashboard for managing Minecraft accounts.',
    preview: '/previews/vistraic.png',
    quip: [
      'minecraft accounts, one pane of glass.',
      'a dashboard for a very specific problem.',
      'accounts, managed. tidily.',
      'someone needed this. now it exists.',
      'control panel energy.',
    ],
  },
  {
    name: 'obscurapdf.com',
    description: 'Currently unavailable.',
    offline: true,
    quip: [
      "this one's offline. it happens.",
      'retired. no plans.',
      "we don't speak of this one.",
      'it had a good run.',
      'gone, but still listed. honest.',
    ],
  },
  {
    name: 'n-ulllabs.com',
    url: 'https://n-ulllabs.com',
    description: 'A home for focused browser tools, including a universal media downloader and a private clipboard image downloader.',
    preview: '/previews/null-labs.png',
    quip: [
      'small tools. one job each.',
      'the drawer where experiments live.',
      'browser tools, no accounts.',
      'download things. quietly.',
      'built for one problem, kept for many.',
    ],
  },
]

function App() {
  return (
    <>
      <GlassDefs />
      <BackgroundEffects />
      <GlassPet />

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
                quip={domain.quip}
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
