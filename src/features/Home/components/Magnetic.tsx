import { useRef, type ReactNode } from 'react'
import Box from '@mui/material/Box'
import { finePointer, gsap, useGSAP } from '@/utils/gsap'

interface MagneticProps {
  children: ReactNode
  /** Cuánto se deja atraer (0–1) hacia el puntero. */
  strength?: number
}

/**
 * Envoltura "magnética": el contenido se inclina hacia el cursor cuando
 * éste se acerca y vuelve con un rebote al salir. Solo con ratón.
 */
export function Magnetic({ children, strength = 0.35 }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(finePointer, () => {
        const element = ref.current
        if (!element) return
        const xTo = gsap.quickTo(element, 'x', { duration: 0.6, ease: 'elastic.out(1, 0.4)' })
        const yTo = gsap.quickTo(element, 'y', { duration: 0.6, ease: 'elastic.out(1, 0.4)' })

        const onMove = (event: PointerEvent) => {
          const rect = element.getBoundingClientRect()
          xTo((event.clientX - (rect.left + rect.width / 2)) * strength)
          yTo((event.clientY - (rect.top + rect.height / 2)) * strength)
        }
        const onLeave = () => {
          xTo(0)
          yTo(0)
        }
        element.addEventListener('pointermove', onMove)
        element.addEventListener('pointerleave', onLeave)
        return () => {
          element.removeEventListener('pointermove', onMove)
          element.removeEventListener('pointerleave', onLeave)
        }
      })
    },
    { scope: ref },
  )

  return (
    <Box ref={ref} sx={{ display: 'inline-block', p: 1.5, m: -1.5 }}>
      {children}
    </Box>
  )
}
