import { useRef } from 'react'
import { useGlassPet } from '../hooks/useGlassPet'
import { useLiquidGlass } from '../hooks/useLiquidGlass'

const SIZE = 36

function GlassPet() {
  const rootRef = useRef(null)
  const bodyRef = useRef(null)
  const bubbleRef = useRef(null)

  useLiquidGlass(bodyRef, { radius: SIZE / 2, depth: 9, scale: 11 })
  useGlassPet({ rootRef, bodyRef, bubbleRef })

  return (
    <div ref={rootRef} className="glass-pet" aria-hidden="true">
      <span className="glass-pet__shadow" />
      <div ref={bodyRef} className="glass-pet__body" style={{ width: SIZE, height: SIZE }}>
        <span className="glass-pet__eye glass-pet__eye--left" />
        <span className="glass-pet__eye glass-pet__eye--right" />
      </div>
      <p ref={bubbleRef} className="glass-pet__say" />
    </div>
  )
}

export default GlassPet
