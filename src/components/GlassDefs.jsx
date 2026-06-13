/**
 * Single hidden <svg> that hosts the per-element liquid-glass <filter> defs.
 * useLiquidGlass appends/updates <filter> nodes inside #glass-defs at runtime.
 * Mounted once near the root of the app.
 */
function GlassDefs() {
  return (
    <svg
      aria-hidden="true"
      width="0"
      height="0"
      style={{ position: 'fixed', top: 0, left: 0, width: 0, height: 0, pointerEvents: 'none' }}
    >
      <defs id="glass-defs" />
    </svg>
  )
}

export default GlassDefs
