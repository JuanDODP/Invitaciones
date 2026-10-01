import { useMemo, useRef } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import { brand, brandAccessible, burstFromElement, fontFamily } from '@/utils'
import { gsap, motionOk, useGSAP } from '@/utils/gsap'
import { createQrMatrix, templates } from '../utils'
import { InvitationCard } from './InvitationCard'
import { PhoneFrame } from './PhoneFrame'

const steps = [
  {
    word: 'Diseña',
    title: 'Diseña en minutos',
    text: 'Elige una plantilla, cambia colores y letras, agrega música y stickers. Se ve increíble en cualquier teléfono.',
    background: brand.cream,
    accent: brandAccessible.coralText,
  },
  {
    word: 'Comparte',
    title: 'Comparte por WhatsApp',
    text: 'Cada invitado recibe su enlace personal y confirma con un toque. Tú ves las respuestas al instante.',
    background: '#FFEDE8',
    accent: brand.violet,
  },
  {
    word: 'Celebra',
    title: 'Celebra sin filas',
    text: 'El día del evento, su pase QR abre la puerta y le dice en qué mesa sentarse.',
    background: '#E4FAF2',
    accent: brandAccessible.mintText,
  },
]

const screenSx = { position: 'absolute', inset: 0 } as const

function DesignScreen() {
  return (
    <Box sx={screenSx} data-screen="0">
      {[templates[1], templates[3], templates[0]].map((template, i) => (
        <Box key={template.id} data-design-layer={i} sx={{ position: 'absolute', inset: 0 }}>
          <InvitationCard template={template} radius={0} />
        </Box>
      ))}
    </Box>
  )
}

function ShareScreen() {
  const replies = [
    { name: 'Tía Carmen', text: '¡Ahí estaremos los cuatro!' },
    { name: 'Rodrigo', text: 'Confirmo, llevo a Paula' },
    { name: 'Abuela Rosa', text: 'No me lo pierdo por nada' },
  ]
  return (
    <Box sx={{ ...screenSx, bgcolor: '#F1ECE4', display: 'flex', flexDirection: 'column', containerType: 'inline-size' }} data-screen="1">
      <Box sx={{ bgcolor: brand.cassis, color: brand.white, pt: '16cqi', pb: '4cqi', px: '5cqi', display: 'flex', alignItems: 'center', gap: '3cqi' }}>
        <Box sx={{ width: '10cqi', height: '10cqi', borderRadius: '50%', bgcolor: brand.coral, display: 'grid', placeItems: 'center', fontWeight: 800, fontSize: '4.5cqi' }}>F</Box>
        <Box>
          <Box sx={{ fontWeight: 700, fontSize: '4.6cqi' }}>Familia García</Box>
          <Box sx={{ fontSize: '3.4cqi', opacity: 0.7 }}>12 participantes</Box>
        </Box>
      </Box>
      <Box sx={{ p: '4cqi', display: 'grid', gap: '3cqi', alignContent: 'start' }}>
        <Box data-chat sx={{ justifySelf: 'end', width: '78%', bgcolor: '#D9FDD3', borderRadius: '4cqi 4cqi 1cqi 4cqi', p: '2cqi', boxShadow: '0 1px 1px rgba(0,0,0,0.08)' }}>
          <Box sx={{ borderRadius: '3cqi', overflow: 'hidden', mb: '2cqi' }}>
            <InvitationCard template={templates[0]} aspectRatio="16 / 10" radius={0} />
          </Box>
          <Box sx={{ fontSize: '3.6cqi', fontWeight: 700, color: brand.cassis }}>Nos casamos: Ana & Leo</Box>
          <Box sx={{ fontSize: '3.2cqi', color: 'rgba(30,24,34,0.6)' }}>Toca para confirmar tu asistencia</Box>
        </Box>
        {replies.map((reply) => (
          <Box key={reply.name} data-chat sx={{ justifySelf: 'start', maxWidth: '82%', bgcolor: brand.white, borderRadius: '4cqi 4cqi 4cqi 1cqi', px: '3.5cqi', py: '2.5cqi', boxShadow: '0 1px 1px rgba(0,0,0,0.08)' }}>
            <Box sx={{ fontSize: '3.2cqi', fontWeight: 700, color: brand.violet }}>{reply.name}</Box>
            <Box sx={{ fontSize: '3.8cqi', color: brand.cassis }}>{reply.text}</Box>
            <Box sx={{ mt: '1.5cqi', display: 'inline-flex', alignItems: 'center', gap: '1cqi', fontSize: '3cqi', fontWeight: 700, color: brandAccessible.mintText }}>
              <CheckRoundedIcon sx={{ fontSize: '4cqi' }} /> Asistencia confirmada
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  )
}

function CelebrateScreen() {
  const matrix = useMemo(() => createQrMatrix(21, 4), [])
  return (
    <Box sx={{ ...screenSx, bgcolor: brand.cream, containerType: 'inline-size' }} data-screen="2">
      {/* Las unidades cqi se resuelven contra el contenedor ancestro: el padding va en un hijo. */}
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', pt: '16cqi', px: '6cqi', gap: '4cqi' }}>
        <Box sx={{ width: '100%', bgcolor: brand.violet, color: brand.white, borderRadius: '5cqi', p: '5cqi' }}>
          <Box sx={{ fontSize: '3.4cqi', opacity: 0.8 }}>Pase de acceso</Box>
          <Box sx={{ fontFamily: fontFamily.display, fontWeight: 700, fontSize: '6.5cqi' }}>Juan Carlos Méndez</Box>
        </Box>
        <Box data-qr-frame sx={{ position: 'relative', width: '72%', aspectRatio: '1', p: '4cqi', bgcolor: brand.white, borderRadius: '5cqi' }}>
          <svg viewBox="0 0 21 21" width="100%" height="100%" aria-hidden="true">
            {matrix.flatMap((row, y) => row.map((on, x) => (on ? <rect key={`${x}-${y}`} x={x} y={y} width="1.02" height="1.02" fill={brand.cassis} /> : null)))}
          </svg>
          <Box data-qr-laser sx={{ position: 'absolute', left: '6%', right: '6%', top: '4cqi', height: 4, borderRadius: 4, bgcolor: brand.mint, boxShadow: `0 0 14px 3px ${brand.mint}` }} />
          <Box
            data-qr-check
            sx={{ position: 'absolute', inset: 0, borderRadius: '5cqi', bgcolor: 'rgba(0,214,159,0.92)', display: 'grid', placeItems: 'center', color: brand.cassis }}
          >
            <Box sx={{ textAlign: 'center' }}>
              <CheckRoundedIcon sx={{ fontSize: '22cqi' }} />
              <Box sx={{ fontFamily: fontFamily.display, fontWeight: 800, fontSize: '8cqi', lineHeight: 1 }}>Mesa 12</Box>
            </Box>
          </Box>
        </Box>
        <Box sx={{ fontSize: '3.8cqi', color: 'text.secondary', textAlign: 'center' }}>Muestra este código en la entrada</Box>
      </Box>
    </Box>
  )
}

/**
 * "Cómo funciona" al estilo Apple: la sección se queda fija y el scroll
 * cuenta la historia en tres pasos. El teléfono gira y cambia de pantalla,
 * el fondo cambia de color, y una palabra gigante marca el paso actual.
 */
export function HowItWorks() {
  const scope = useRef<HTMLElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(motionOk, () => {
        const q = gsap.utils.selector(scope)
        const tl = gsap.timeline({
          defaults: { ease: 'power2.inOut' },
          scrollTrigger: { trigger: scope.current, start: 'top top', end: '+=320%', scrub: 1, pin: true, anticipatePin: 1 },
        })

        // Estado inicial: solo el paso 1 visible.
        gsap.set(q('[data-step]:not([data-step="0"]), [data-big-word]:not([data-big-word="0"])'), { autoAlpha: 0, yPercent: 30 })
        gsap.set(q('[data-screen="1"], [data-screen="2"]'), { autoAlpha: 0, xPercent: 40 })
        gsap.set(q('[data-design-layer="1"], [data-design-layer="2"]'), { clipPath: 'circle(0% at 50% 50%)' })
        gsap.set(q('[data-chat]'), { autoAlpha: 0, scale: 0.6, transformOrigin: '50% 100%' })
        gsap.set(q('[data-qr-check]'), { autoAlpha: 0, scale: 0.6 })
        gsap.set(q('[data-phone]'), { rotateY: -18, rotateZ: -4 })
        gsap.set(q('[data-progress]'), { scaleX: 0, transformOrigin: 'left' })

        // Paso 1: las plantillas se revelan en círculo, una tras otra.
        tl.to(q('[data-progress="0"]'), { scaleX: 1, duration: 1, ease: 'none' }, 0)
          .to(q('[data-design-layer="1"]'), { clipPath: 'circle(75% at 50% 50%)', duration: 0.35 }, 0.25)
          .to(q('[data-design-layer="2"]'), { clipPath: 'circle(75% at 50% 50%)', duration: 0.35 }, 0.6)

        // Transición a cada paso siguiente.
        ;[1, 2].forEach((step) => {
          const at = step
          tl.to(q(`[data-step="${step - 1}"], [data-big-word="${step - 1}"]`), { autoAlpha: 0, yPercent: -30, duration: 0.25 }, at - 0.05)
            .to(q(`[data-step="${step}"], [data-big-word="${step}"]`), { autoAlpha: 1, yPercent: 0, duration: 0.3 }, at + 0.1)
            .to(q(`[data-screen="${step - 1}"]`), { autoAlpha: 0, xPercent: -40, duration: 0.3 }, at - 0.05)
            .to(q(`[data-screen="${step}"]`), { autoAlpha: 1, xPercent: 0, duration: 0.3 }, at)
            .to(scope.current, { backgroundColor: steps[step].background, duration: 0.3 }, at)
            .to(q('[data-phone]'), { rotateY: step === 1 ? 0 : 16, rotateZ: step === 1 ? 0 : 3, scale: step === 1 ? 1.04 : 1, duration: 0.4 }, at - 0.05)
            .to(q(`[data-progress="${step}"]`), { scaleX: 1, duration: 1, ease: 'none' }, at)
        })

        // Paso 2: llegan las respuestas al chat.
        tl.to(q('[data-chat]'), { autoAlpha: 1, scale: 1, stagger: 0.18, duration: 0.15, ease: 'back.out(2)' }, 1.3)

        // Paso 3: el láser escanea y aparece la mesa, con confeti al avanzar.
        tl.fromTo(q('[data-qr-laser]'), { y: 0 }, { y: () => (q('[data-qr-frame]')[0]?.clientHeight ?? 200) * 0.8, duration: 0.3, ease: 'sine.inOut', yoyo: true, repeat: 1 }, 2.25)
          .to(q('[data-qr-check]'), { autoAlpha: 1, scale: 1, duration: 0.15, ease: 'back.out(2)' }, 2.85)
          .call(
            () => {
              const frame = q('[data-qr-frame]')[0]
              if (frame && tl.scrollTrigger?.direction === 1) burstFromElement(frame, 90)
            },
            undefined,
            2.86,
          )
          .to({}, { duration: 0.15 })
      })
    },
    { scope },
  )

  return (
    <Box
      component="section"
      ref={scope}
      id="como-funciona"
      aria-labelledby="como-funciona-title"
      sx={{ position: 'relative', minHeight: '100svh', bgcolor: brand.cream, overflow: 'hidden' }}
    >
      <Typography id="como-funciona-title" component="h2" sx={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>
        Cómo funciona
      </Typography>

      {/* Palabra gigante del paso actual, detrás del teléfono */}
      <Box aria-hidden="true" sx={{ position: 'absolute', inset: 0, display: 'grid', placeItems: 'center', pointerEvents: 'none', opacity: 0.25 }}>
        {steps.map((step, i) => (
          <Box
            key={step.word}
            data-big-word={i}
            sx={{
              gridArea: '1 / 1',
              fontFamily: fontFamily.display,
              fontWeight: 800,
              fontSize: 'clamp(4.5rem, 22vw, 20rem)',
              letterSpacing: '-0.05em',
              color: 'transparent',
              WebkitTextStroke: `2px ${step.accent}`,
              opacity: i === 0 ? 1 : 0,
              '@media (prefers-reduced-motion: reduce)': { display: i === 0 ? 'block' : 'none' },
            }}
          >
            {step.word}
          </Box>
        ))}
      </Box>

      <Box
        sx={{
          position: 'relative',
          maxWidth: 1200,
          mx: 'auto',
          minHeight: '100svh',
          px: { xs: 2, md: 4 },
          pt: { xs: 13, md: 10 },
          pb: { xs: 4, md: 6 },
          display: 'grid',
          gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'minmax(0, 1fr) minmax(0, 1fr)' },
          gridTemplateRows: { xs: 'auto 1fr', md: '1fr' },
          alignItems: 'center',
          gap: { xs: 3, md: 6 },
        }}
      >
        <Box sx={{ order: { xs: 2, md: 1 } }}>
          <Box sx={{ display: 'flex', gap: 1, mb: { xs: 2.5, md: 4 }, maxWidth: 320 }} aria-hidden="true">
            {steps.map((step, i) => (
              <Box key={step.word} sx={{ flex: 1, height: 5, borderRadius: 9, bgcolor: 'rgba(30,24,34,0.1)', overflow: 'hidden' }}>
                <Box data-progress={i} sx={{ height: '100%', bgcolor: step.accent }} />
              </Box>
            ))}
          </Box>
          <Box sx={{ display: 'grid' }}>
            {steps.map((step, i) => (
              <Box key={step.word} data-step={i} sx={{ gridArea: '1 / 1', '@media (prefers-reduced-motion: reduce)': { gridArea: 'auto', mb: 4 } }}>
                <Typography variant="h3" component="p" sx={{ fontSize: 'clamp(1.9rem, 4.4vw, 3.6rem)', mb: 1.5, color: step.accent }}>
                  {step.title}
                </Typography>
                <Typography sx={{ fontSize: { xs: '1rem', md: '1.1875rem' }, color: 'text.secondary', lineHeight: 1.6, maxWidth: '30em' }}>
                  {step.text}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        <Box sx={{ order: { xs: 1, md: 2 }, justifySelf: 'center', perspective: 1400, width: { xs: 'min(230px, 52vw, 32svh)', md: 'min(330px, calc((100svh - 140px) / 1.9))' } }}>
          <Box data-phone sx={{ transformStyle: 'preserve-3d' }}>
            <PhoneFrame>
              <Box sx={{ position: 'relative', aspectRatio: '9 / 16', overflow: 'hidden' }}>
                <DesignScreen />
                <ShareScreen />
                <CelebrateScreen />
              </Box>
            </PhoneFrame>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
