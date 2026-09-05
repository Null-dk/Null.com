import { useEffect } from 'react'

const SPACING = 34

function noise(x, y) {
  const value = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453
  return value - Math.floor(value)
}

export function useParticleField(canvasRef) {
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext('2d')

    function draw() {
      const width = window.innerWidth
      const height = window.innerHeight
      const ratio = Math.min(window.devicePixelRatio || 1, 2)

      canvas.width = Math.round(width * ratio)
      canvas.height = Math.round(height * ratio)
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      context.setTransform(ratio, 0, 0, ratio, 0, 0)
      context.clearRect(0, 0, width, height)

      const columns = Math.ceil(width / SPACING) + 1
      const rows = Math.ceil(height / SPACING) + 1

      for (let row = 0; row < rows; row += 1) {
        for (let column = 0; column < columns; column += 1) {
          const variation = noise(column, row)
          if (variation < 0.3) continue

          const x = column * SPACING
          const y = row * SPACING
          const nx = (x / width - 0.5) * 2
          const ny = (y / height - 0.46) * 2.15
          const distance = Math.sqrt(nx * nx * 0.9 + ny * ny * 0.78)
          const vignette = Math.max(0, 1 - Math.pow(distance, 1.7))
          const alpha = vignette * (0.025 + variation * 0.06)

          if (alpha < 0.004) continue

          context.beginPath()
          context.arc(x, y, 0.45 + variation * 0.32, 0, Math.PI * 2)
          context.fillStyle = `rgba(255,255,255,${alpha.toFixed(3)})`
          context.fill()
        }
      }
    }

    draw()
    window.addEventListener('resize', draw)
    return () => window.removeEventListener('resize', draw)
  }, [canvasRef])
}
