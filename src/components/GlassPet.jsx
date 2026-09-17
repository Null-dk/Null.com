import { useRef } from 'react'
import { useGlassPet } from '../hooks/useGlassPet'
import { useLiquidGlass } from '../hooks/useLiquidGlass'

const SIZE = 26

function GlassPet() {
  const rootRef = useRef(null)
  const bodyRef = useRef(null)
  const bubbleRef = useRef(null)

  useLiquidGlass(bodyRef, { radius: SIZE / 2, depth: 7, scale: 9 })
  useGlassPet({ rootRef, bodyRef, bubbleRef })

  return (
    <div ref={rootRef} className="glass-pet" aria-hidden="true">
      <div ref={bodyRef} className="glass-pet__body" style={{ width: SIZE, height: SIZE }} />
      <p ref={bubbleRef} className="glass-pet__say" />
    </div>
  )
}

export default GlassPet
