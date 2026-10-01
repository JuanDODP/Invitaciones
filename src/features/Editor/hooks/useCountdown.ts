import { useEffect, useState } from 'react'

export interface CountdownParts {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function partsUntil(target: number): CountdownParts {
  const remaining = Math.max(0, target - Date.now())
  return {
    days: Math.floor(remaining / 86_400_000),
    hours: Math.floor(remaining / 3_600_000) % 24,
    minutes: Math.floor(remaining / 60_000) % 60,
    seconds: Math.floor(remaining / 1000) % 60,
  }
}

/** Cuenta regresiva en vivo hasta `targetIso`; se actualiza cada segundo. */
export function useCountdown(targetIso: string): CountdownParts {
  const target = new Date(targetIso).getTime()
  const [parts, setParts] = useState(() => partsUntil(target))

  useEffect(() => {
    const id = window.setInterval(() => setParts(partsUntil(target)), 1000)
    return () => window.clearInterval(id)
  }, [target])

  return parts
}
