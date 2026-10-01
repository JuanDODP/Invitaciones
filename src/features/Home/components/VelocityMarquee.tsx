import { useRef } from 'react'
import Box from '@mui/material/Box'
import { brand, fontFamily } from '@/utils'
import { gsap, motionOk, ScrollTrigger, useGSAP } from '@/utils/gsap'

const occasions = ['Bodas', 'XV Años', 'Cumpleaños', 'Bautizos', 'Graduaciones', 'Festivales', 'Baby showers', 'Aniversarios']

function Spark({ color }: { color: string }) {
  return (
    <svg width="0.7em" height="0.7em" viewBox="0 0 20 20" aria-hidden="true" style={{ flexShrink: 0 }}>
      <path d="M10 0 Q10 10 20 10 Q10 10 10 20 Q10 10 0 10 Q10 10 10 0 Z" fill={color} />
    </svg>
  )
}

const tapes = [
  { bg: brand.coral, color: brand.cassis, spark: brand.white, rotate: -3, reverse: false },
  { bg: brand.violet, color: brand.white, spark: brand.amber, rotate: 2.5, reverse: true },
]

/**
 * Dos "cintas" de fiesta cruzadas con los tipos de evento. Se mueven solas
 * y reaccionan a la velocidad del scroll: aceleran, cambian de sentido al
 * subir y se inclinan (skew) con el impulso.
 */
export function VelocityMarquee() {
  const scope = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(motionOk, () => {
        const tracks = gsap.utils.toArray<HTMLElement>('[data-tape-track]')
        const loops = tracks.map((track, i) =>
          gsap.fromTo(
            track,
            { xPercent: tapes[i].reverse ? -50 : 0 },
            { xPercent: tapes[i].reverse ? 0 : -50, duration: 28, ease: 'none', repeat: -1 },
          ),
        )
        const skewTo = gsap.quickTo('[data-tape-track]', 'skewX', { duration: 0.5, ease: 'power3.out' })
        let direction = 1
        // Al dejar de hacer scroll, vuelve a su ritmo normal (manteniendo el sentido).
        const settle = gsap
          .delayedCall(0.25, () => {
            loops.forEach((loop) => gsap.to(loop, { timeScale: direction, duration: 0.8, overwrite: true }))
            skewTo(0)
          })
          .pause()

        ScrollTrigger.create({
          trigger: scope.current,
          start: 'top bottom',
          end: 'bottom top',
          onUpdate: (self) => {
            const velocity = self.getVelocity()
            direction = velocity < 0 ? -1 : 1
            const boost = 1 + Math.min(Math.abs(velocity) / 400, 6)
            loops.forEach((loop) => gsap.to(loop, { timeScale: boost * direction, duration: 0.25, overwrite: true }))
            skewTo(gsap.utils.clamp(-14, 14, velocity / -220))
            settle.restart(true)
          },
        })
      })
    },
    { scope },
  )

  return (
    <Box component="section" ref={scope} aria-label="Para todo tipo de celebración" sx={{ position: 'relative', py: { xs: 8, md: 12 }, overflow: 'hidden' }}>
      {tapes.map((tape, i) => (
        <Box
          key={i}
          sx={{
            position: 'relative',
            zIndex: i === 0 ? 2 : 1,
            mt: i === 0 ? 0 : { xs: -3, md: -5 },
            mx: '-5vw',
            rotate: `${tape.rotate}deg`,
            bgcolor: tape.bg,
            color: tape.color,
            py: { xs: 1.5, md: 2.5 },
            boxShadow: '0 20px 40px -20px rgba(30,24,34,0.45)',
          }}
        >
          <Box data-tape-track aria-hidden={i === 1 || undefined} sx={{ display: 'flex', width: 'max-content' }}>
            {[0, 1].map((copy) => (
              <Box
                key={copy}
                aria-hidden={copy === 1 || undefined}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5em',
                  pr: '0.5em',
                  fontFamily: fontFamily.display,
                  fontWeight: 800,
                  fontSize: 'clamp(2rem, 6vw, 5.5rem)',
                  lineHeight: 1,
                  letterSpacing: '-0.03em',
                  whiteSpace: 'nowrap',
                }}
              >
                {occasions.map((occasion) => (
                  <Box key={occasion} component="span" sx={{ display: 'inline-flex', alignItems: 'center', gap: '0.5em' }}>
                    {occasion}
                    <Spark color={tape.spark} />
                  </Box>
                ))}
              </Box>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  )
}
