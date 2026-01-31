function BackgroundEffects() {
  return (
    <>
      {/* Animated orbs — larger, more diffuse */}
      <div
        className="bg-orb fixed rounded-full pointer-events-none -z-3 animate-float"
        style={{ width: 500, height: 500, top: '-15%', left: '-10%', filter: 'blur(100px)', opacity: 0.35, background: 'radial-gradient(circle, rgba(255,255,255,0.06), transparent 70%)' }}
        aria-hidden="true"
      />
      <div
        className="bg-orb fixed rounded-full pointer-events-none -z-3 animate-float"
        style={{ width: 400, height: 400, bottom: '-10%', right: '-10%', filter: 'blur(100px)', opacity: 0.3, background: 'radial-gradient(circle, rgba(255,255,255,0.04), transparent 70%)', animationDelay: '-10s' }}
        aria-hidden="true"
      />
      <div
        className="bg-orb fixed rounded-full pointer-events-none -z-3 animate-float hidden md:block"
        style={{ width: 300, height: 300, top: '40%', right: '20%', filter: 'blur(120px)', opacity: 0.15, background: 'radial-gradient(circle, rgba(255,255,255,0.05), transparent 70%)', animationDelay: '-5s' }}
        aria-hidden="true"
      />

      {/* Grid */}
      <div className="bg-grid fixed inset-0 w-full h-full -z-3" aria-hidden="true" />

      {/* Noise */}
      <div className="noise-overlay fixed inset-0 w-full h-full pointer-events-none z-[1000]" aria-hidden="true" />

      {/* Scan lines */}
      <div className="scan-lines-wrapper fixed inset-0 w-full h-full pointer-events-none z-90 overflow-hidden" aria-hidden="true">
        <div className="scan-line absolute left-0 w-full h-[2px] opacity-0 animate-scanline" />
      </div>
    </>
  )
}

export default BackgroundEffects
