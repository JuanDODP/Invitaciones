import { useRef } from 'react'
import Box from '@mui/material/Box'
import { brand } from '@/utils'
import { gsap, motionOk, useGSAP } from '@/utils/gsap'

/** Barra fina de progreso de lectura, arriba de todo, con el gradiente festivo. */
export function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const mm = gsap.matchMedia()
    mm.add(motionOk, () => {
      gsap.fromTo(
        bar.current,
        { scaleX: 0 },
        { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } },
      )
    })
  })

  return (
    <Box
      ref={bar}
      aria-hidden="true"
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        zIndex: 1300,
        transformOrigin: 'left',
        transform: 'scaleX(0)',
        background: `linear-gradient(90deg, ${brand.coral}, ${brand.amber}, ${brand.mint})`,
        '@media (prefers-reduced-motion: reduce)': { display: 'none' },
      }}
    />
  )
}
