import { useRef } from 'react'
import { useParticleField } from '../hooks/useParticleField'

function ParticleField() {
  const canvasRef = useRef(null)
  useParticleField(canvasRef)

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: -2 }}
      aria-hidden="true"
    />
  )
}

export default ParticleField
