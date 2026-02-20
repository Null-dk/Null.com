import ParticleField from './ParticleField'

function BackgroundEffects() {
  return (
    <>
      {/* Primary light source — top left, large and intentional */}
      <div
        className="bg-orb fixed rounded-full pointer-events-none -z-3 animate-float"
        style={{
          width: 700,
          height: 700,
          top: '-20%',
          left: '-15%',
          filter: 'blur(120px)',
          opacity: 0.5,
          background: 'radial-gradient(circle at 40% 40%, rgba(255,255,255,0.09), rgba(255,255,255,0.03) 50%, transparent 70%)',
        }}
        aria-hidden="true"
      />

      {/* Secondary light source — bottom right */}
      <div
        className="bg-orb fixed rounded-full pointer-events-none -z-3 animate-float"
        style={{
          width: 600,
          height: 600,
          bottom: '-15%',
          right: '-12%',
          filter: 'blur(110px)',
          opacity: 0.4,
          background: 'radial-gradient(circle at 60% 60%, rgba(255,255,255,0.07), rgba(255,255,255,0.02) 50%, transparent 70%)',
          animationDelay: '-12s',
        }}
        aria-hidden="true"
      />

      {/* Tertiary accent — mid-right */}
      <div
        className="bg-orb fixed rounded-full pointer-events-none -z-3 animate-float hidden lg:block"
        style={{
          width: 350,
          height: 350,
          top: '35%',
          right: '5%',
          filter: 'blur(90px)',
          opacity: 0.22,
          background: 'radial-gradient(circle, rgba(255,255,255,0.06), transparent 65%)',
          animationDelay: '-7s',
        }}
        aria-hidden="true"
      />

      {/* Canvas: magnetic dot field + click ripples (replaces CSS bg-grid) */}
      <ParticleField />

      {/* Noise grain */}
      <div className="noise-overlay fixed inset-0 w-full h-full pointer-events-none z-[1000]" aria-hidden="true" />

      {/* Corner vignette */}
      <div className="bg-vignette fixed inset-0 w-full h-full pointer-events-none -z-2" aria-hidden="true" />
    </>
  )
}

export default BackgroundEffects
