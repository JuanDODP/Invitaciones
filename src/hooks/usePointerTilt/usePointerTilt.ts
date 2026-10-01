import type { PointerEvent } from 'react'
import { useMotionTemplate, useMotionValue, useSpring, useTransform } from 'motion/react'
import { spring } from '@/utils'

/**
 * Inclinación 3D que sigue al puntero, sin re-renders de React: todo vive
 * en motion values que se escriben directo en `style`.
 *
 * Solo responde a ratón (en táctil, inclinar al arrastrar se siente roto).
 * Devuelve también la posición de un reflejo de luz para el brillo.
 */
export function usePointerTilt(maxDegrees = 10) {
  const pointerX = useMotionValue(0)
  const pointerY = useMotionValue(0)
  const x = useSpring(pointerX, spring.smooth)
  const y = useSpring(pointerY, spring.smooth)

  const rotateY = useTransform(x, [-0.5, 0.5], [-maxDegrees, maxDegrees])
  const rotateX = useTransform(y, [-0.5, 0.5], [maxDegrees, -maxDegrees])
  const glareX = useTransform(x, [-0.5, 0.5], [0, 100])
  const glareY = useTransform(y, [-0.5, 0.5], [0, 100])
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255,255,255,0.35), transparent 55%)`

  const onPointerMove = (event: PointerEvent<HTMLElement>) => {
    if (event.pointerType !== 'mouse') return
    const rect = event.currentTarget.getBoundingClientRect()
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5)
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5)
  }

  const onPointerLeave = () => {
    pointerX.set(0)
    pointerY.set(0)
  }

  return { rotateX, rotateY, glare, handlers: { onPointerMove, onPointerLeave } }
}
