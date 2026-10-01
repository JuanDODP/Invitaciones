import { useId, useRef } from 'react'
import { Link as RouterLink } from 'react-router'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded'
import QrCode2RoundedIcon from '@mui/icons-material/QrCode2Rounded'
import StarRoundedIcon from '@mui/icons-material/StarRounded'
import { motion } from 'motion/react'
import { brand, fontFamily, spring } from '@/utils'
import { finePointer, gsap, motionOk, SplitText, useGSAP } from '@/utils/gsap'
import { usePointerTilt } from '../hooks'
import { HEADER_HEIGHT } from '../utils'
import { GradientText } from './GradientText'
import { HeroPhone } from './HeroPhone'
import { Magnetic } from './Magnetic'
import { PartyScene } from './PartyScene'

const WORD = 'FIESTA'
/** Letra en la que "entra" la cámara: la I, el trazo más grueso y vertical. */
const ZOOM_LETTER_INDEX = 1

const badgeBase = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 1,
  px: 1.75,
  py: 1,
  borderRadius: 99,
  fontWeight: 700,
  fontSize: '0.875rem',
  whiteSpace: 'nowrap',
  boxShadow: '0 12px 32px -10px rgba(0,0,0,0.5)',
  cursor: 'default',
} as const

const badges = [
  { label: '48 confirmados hoy', icon: <CheckRoundedIcon fontSize="small" />, bg: brand.mint, color: brand.cassis, position: { top: '8%', left: '-34%' } },
  { label: 'Plantilla destacada', icon: <StarRoundedIcon fontSize="small" />, bg: brand.amber, color: brand.cassis, position: { top: '44%', right: '-30%' } },
  { label: 'Mesa 12 asignada', icon: <QrCode2RoundedIcon fontSize="small" />, bg: brand.white, color: brand.violet, position: { bottom: '34%', left: '-38%' } },
]

function HeroPhoneStage() {
  const tilt = usePointerTilt(10)
  return (
    <Box data-hero="phone" sx={{ position: 'relative', perspective: 1200 }}>
      <Box
        component={motion.div}
        {...tilt.handlers}
        style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY, transformStyle: 'preserve-3d' }}
        sx={{ position: 'relative' }}
      >
        <HeroPhone />
        <Box
          component={motion.div}
          aria-hidden="true"
          style={{ background: tilt.glare }}
          sx={{ position: 'absolute', inset: 0, borderRadius: '48px', pointerEvents: 'none', mixBlendMode: 'soft-light' }}
        />
      </Box>
      {badges.map((badge) => (
        <Box key={badge.label} data-hero="badge" sx={{ position: 'absolute', zIndex: 2, display: { xs: 'none', lg: 'block' }, ...badge.position }}>
          <Box component={motion.div} whileHover={{ scale: 1.1, rotate: -4 }} transition={spring.snappy} sx={{ ...badgeBase, bgcolor: badge.bg, color: badge.color }}>
            {badge.icon}
            {badge.label}
          </Box>
        </Box>
      ))}
    </Box>
  )
}

/**
 * Hero con "zoom de máscara" (al estilo del sitio de GTA VI):
 *
 * 1. Al cargar: una palabra gigante, FIESTA, recortada en la crema. Por
 *    dentro de las letras se ve la escena nocturna, viva.
 * 2. Al hacer scroll (sección fijada): la cámara entra por la "I". La
 *    palabra crece hasta tragarse la pantalla y la escena llena todo,
 *    mientras sus capas se acomodan con profundidad.
 * 3. Dentro de la escena aparecen el titular, los botones y el teléfono.
 *
 * Con `prefers-reduced-motion`: sin máscara ni fijado; se ve el paso 3.
 */
export function HeroSection() {
  const scope = useRef<HTMLElement>(null)
  const maskId = useId()

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      const root = document.documentElement

      mm.add(motionOk, () => {
        const word = scope.current?.querySelector<SVGTextElement>('[data-intro="word"]')
        const zoom = scope.current?.querySelector<SVGGElement>('[data-intro="zoom"]')
        if (!word || !zoom) return

        /**
         * Centro de la letra de entrada, en coordenadas del SVG (px).
         * El zoom va en el grupo y la entrada en el texto: animar `scale` en el
         * mismo elemento haría que una animación pisara a la otra.
         */
        const zoomOrigin = () => {
          const box = word.getExtentOfChar(ZOOM_LETTER_INDEX)
          return `${box.x + box.width / 2} ${box.y + box.height * 0.55}`
        }

        const headline = SplitText.create('[data-hero="headline"]', { type: 'lines,words', mask: 'lines' })

        // Entrada al cargar: la palabra se asienta y la escena "sube" detrás.
        gsap
          .timeline({ defaults: { ease: 'expo.out' } })
          .from(word, { scale: 0.7, transformOrigin: '50% 50%', opacity: 0, duration: 1.6 })
          .from('[data-intro="tagline"] > *', { y: 24, autoAlpha: 0, stagger: 0.1, duration: 1 }, 0.3)
          .from('[data-intro="scene"]', { autoAlpha: 0, duration: 1.4 }, 0)

        // Escena fijada y controlada por el scroll.
        const isMobile = window.matchMedia('(max-width: 899px)').matches
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: scope.current,
            start: 'top top',
            end: isMobile ? '+=190%' : '+=260%',
            scrub: 1,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              root.dataset.headerTone = self.progress > 0.32 && self.progress < 1 ? 'night' : 'day'
            },
            onLeave: () => {
              root.dataset.headerTone = 'day'
            },
          },
        })

        tl.to('[data-intro="tagline"]', { autoAlpha: 0, y: -40, duration: 0.12 }, 0)
          .to(zoom, { scale: 70, svgOrigin: () => zoomOrigin(), ease: 'power3.in', duration: 0.5 }, 0)
          .to('[data-intro="overlay"]', { autoAlpha: 0, duration: 0.1 }, 0.42)
          .fromTo('[data-intro="scene"]', { scale: 1.35 }, { scale: 1, ease: 'power2.out', duration: 0.6 }, 0)
          .to('[data-depth="0.15"]', { yPercent: -4, duration: 1 }, 0)
          .to('[data-depth="0.45"]', { yPercent: -10, duration: 1 }, 0)
          .to('[data-depth="1"]', { yPercent: -22, duration: 1 }, 0)
          .from(headline.words, { yPercent: 120, rotate: 8, stagger: 0.025, duration: 0.25, ease: 'power3.out' }, 0.5)
          .from('[data-hero="copy"]', { y: 40, autoAlpha: 0, stagger: 0.05, duration: 0.2, ease: 'power3.out' }, 0.64)
          .from('[data-hero="phone"]', { y: '70vh', rotate: -14, scale: 0.8, duration: 0.35, ease: 'power3.out' }, 0.55)
          .from('[data-hero="badge"]', { scale: 0, autoAlpha: 0, stagger: 0.04, duration: 0.12, ease: 'back.out(2.5)' }, 0.82)
          .to({}, { duration: 0.12 })
      })

      // Profundidad con el puntero: cada capa se desplaza según su `data-depth`.
      mm.add(finePointer, () => {
        const stage = scope.current
        if (!stage) return
        const movers = gsap.utils.toArray<HTMLElement>('[data-depth]').map((layer) => {
          const depth = Number(layer.dataset.depth)
          return {
            depth,
            x: gsap.quickTo(layer, 'x', { duration: 1.2, ease: 'power3.out' }),
            y: gsap.quickTo(layer, 'y', { duration: 1.2, ease: 'power3.out' }),
          }
        })
        const onMove = (event: PointerEvent) => {
          const dx = event.clientX / window.innerWidth - 0.5
          const dy = event.clientY / window.innerHeight - 0.5
          movers.forEach((mover) => {
            mover.x(-dx * 60 * mover.depth)
            mover.y(-dy * 40 * mover.depth)
          })
        }
        stage.addEventListener('pointermove', onMove)
        return () => stage.removeEventListener('pointermove', onMove)
      })

      return () => {
        delete root.dataset.headerTone
      }
    },
    { scope },
  )

  return (
    <Box component="section" ref={scope} aria-labelledby="hero-title" sx={{ position: 'relative' }}>
      <Box sx={{ position: 'relative', height: '100svh', minHeight: 560, overflow: 'hidden', bgcolor: brand.cassis, color: brand.white }}>
        <Box data-intro="scene" sx={{ position: 'absolute', inset: 0 }}>
          <PartyScene />
        </Box>

        {/* Contenido del hero, dentro de la escena */}
        <Box
          sx={{
            position: 'relative',
            zIndex: 2,
            height: '100%',
            maxWidth: 1200,
            mx: 'auto',
            px: { xs: 2, md: 4 },
            pt: `${HEADER_HEIGHT + 16}px`,
            pb: { xs: 0, md: 3 },
            display: 'grid',
            gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'minmax(0, 1fr) auto' },
            alignItems: { xs: 'start', md: 'center' },
            gap: { md: 6 },
          }}
        >
          <Box sx={{ pt: { xs: 3, sm: 'clamp(32px, 7svh, 80px)', md: 0 } }}>
            <Typography
              id="hero-title"
              variant="h1"
              data-hero="headline"
              sx={{ fontSize: 'clamp(2.4rem, 6.2vw, 5.4rem)', mb: { xs: 2, md: 3 }, color: brand.white, textShadow: '0 4px 24px rgba(30,24,34,0.45)' }}
            >
              Invitaciones que <GradientText tone="night">emocionan.</GradientText>
              <br />
              Organización que hace <GradientText tone="night">sonreír.</GradientText>
            </Typography>
            <Typography
              data-hero="copy"
              sx={{
                fontSize: { xs: '1rem', md: '1.1875rem' },
                color: 'rgba(255,255,255,0.86)',
                // Legible aunque pase un globo por detrás.
                textShadow: '0 1px 2px rgba(30,24,34,0.8), 0 2px 16px rgba(30,24,34,0.7)',
                maxWidth: '32em',
                mb: { xs: 3, md: 4.5 },
                lineHeight: 1.6,
                '@media (max-height: 700px) and (max-width: 899px)': { display: 'none' },
              }}
            >
              Crea una invitación animada en minutos, compártela por WhatsApp y recibe a cada invitado con un pase QR que
              ya sabe cuál es su mesa.
            </Typography>
            <Box data-hero="copy" sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
              <Magnetic>
                <Button component={RouterLink} to="/editor" variant="contained" size="large">
                  Diseñar mi invitación gratis
                </Button>
              </Magnetic>
              <Magnetic>
                <Button
                  component={RouterLink}
                  to="/dashboard"
                  variant="outlined"
                  size="large"
                  sx={{
                    color: brand.white,
                    borderColor: 'rgba(255,255,255,0.5)',
                    borderWidth: 1.5,
                    backdropFilter: 'blur(8px)',
                    bgcolor: 'rgba(255,255,255,0.06)',
                    '&:hover': { borderColor: brand.white, borderWidth: 1.5, bgcolor: 'rgba(255,255,255,0.14)' },
                  }}
                >
                  Ver demostración para salones
                </Button>
              </Magnetic>
            </Box>
          </Box>

          {/* Escritorio: columna derecha. Móvil: el teléfono asoma desde abajo. */}
          <Box
            sx={{
              width: { xs: 'min(290px, 68vw)', sm: 'min(340px, 46vw)', md: 'min(330px, calc((100svh - 150px) / 1.9))' },
              position: { xs: 'absolute', md: 'relative' },
              left: { xs: '50%', md: 'auto' },
              translate: { xs: '-50% 0', md: 'none' },
              bottom: { xs: 'calc(min(290px, 68vw) * -0.95)', sm: 'calc(min(340px, 46vw) * -0.8)', md: 'auto' },
            }}
          >
            <HeroPhoneStage />
          </Box>
        </Box>

        {/* Máscara: la crema con la palabra recortada encima de todo */}
        <Box
          data-intro="overlay"
          sx={{ position: 'absolute', inset: 0, zIndex: 5, pointerEvents: 'none', '@media (prefers-reduced-motion: reduce)': { display: 'none' } }}
        >
          <svg width="100%" height="100%" aria-hidden="true" style={{ display: 'block' }}>
            <defs>
              <mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width="100%" height="100%">
                <rect width="100%" height="100%" fill="white" />
                <g data-intro="zoom">
                  <text
                    data-intro="word"
                    x="50%"
                    y="52%"
                    textAnchor="middle"
                    dominantBaseline="central"
                    fill="black"
                    style={{ fontFamily: fontFamily.display, fontWeight: 800, fontSize: 'min(26vw, 48svh)', letterSpacing: '-0.04em' }}
                  >
                    {WORD}
                  </text>
                </g>
              </mask>
            </defs>
            <rect width="100%" height="100%" fill={brand.cream} mask={`url(#${maskId})`} />
          </svg>

          <Box
            data-intro="tagline"
            sx={{
              position: 'absolute',
              inset: 0,
              color: brand.cassis,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'space-between',
              pt: `${HEADER_HEIGHT + 32}px`,
              pb: 4,
              px: 2,
              textAlign: 'center',
            }}
          >
            <Box sx={{ fontFamily: fontFamily.display, fontWeight: 600, fontSize: { xs: '1.125rem', md: '1.5rem' }, letterSpacing: '-0.01em' }}>
              Invitaciones interactivas y control de eventos con QR
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 0.5, fontWeight: 600, fontSize: '0.9375rem', color: 'text.secondary' }}>
              Desliza para entrar a la fiesta
              <KeyboardArrowDownRoundedIcon
                sx={{
                  animation: 'hero-cue 1.6s ease-in-out infinite',
                  '@keyframes hero-cue': { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(8px)' } },
                }}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
