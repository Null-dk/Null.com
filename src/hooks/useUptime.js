import { useState, useEffect } from 'react'

function generateUptime() {
  return (Math.max(99.0, Math.min(99.99, 99.7 + (Math.random() - 0.5) * 0.15))).toFixed(2) + '%'
}

export function useUptime() {
  const [uptime, setUptime] = useState(generateUptime)

  useEffect(() => {
    const interval = setInterval(() => {
      setUptime(generateUptime())
    }, 20000)

    return () => clearInterval(interval)
  }, [])

  return uptime
}
