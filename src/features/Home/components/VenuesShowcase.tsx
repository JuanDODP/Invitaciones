import { useRef, useState } from 'react'
import Box from '@mui/material/Box'
import StarRoundedIcon from '@mui/icons-material/StarRounded'
import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded'
import GroupsRoundedIcon from '@mui/icons-material/GroupsRounded'
import FormatQuoteRoundedIcon from '@mui/icons-material/FormatQuoteRounded'
import { AnimatePresence, motion } from 'motion/react'
import { brand, duration, easing, fontFamily } from '@/utils'
import { gsap, motionOk, ScrollTrigger, useGSAP } from '@/utils/gsap'
import { partnerTotals, partnerVenues, type PartnerVenue } from '../utils'
import { SectionHeading } from './SectionHeading'

const STEP = 360 / partnerVenues.length

/** Ilustración del salón según su tipo (no hay fotos todavía): cielo, arquitectura y luces. */
function VenueArt({ venue }: { venue: PartnerVenue }) {
  const [top, bottom, accent] = venue.palette
  const gradientId = `sky-${venue.id}`
  const lights = Array.from({ length: 9 }, (_, i) => ({ x: 16 + i * 21, y: 30 + Math.sin((i / 8) * Math.PI) * 14 }))

  return (
    <svg viewBox="0 0 200 130" width="100%" style={{ display: 'block' }} aria-hidden="true">
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={top} />
          <stop offset="100%" stopColor={bottom} />
        </linearGradient>
      </defs>
      <rect width="200" height="130" fill={`url(#${gradientId})`} />
      <circle cx="160" cy="26" r="11" fill="#FCFAF6" opacity="0.85" />

      {venue.kind === 'jardin' && (
        <g>
          {[[30, 92, 26], [70, 98, 20], [150, 90, 28], [185, 100, 18]].map(([x, y, r]) => (
            <circle key={x} cx={x} cy={y} r={r} fill="rgba(16,10,24,0.55)" />
          ))}
          <path d="M6 30 Q100 62 194 30" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" />
        </g>
      )}
      {venue.kind === 'hacienda' && (
        <path
          d="M0 130 V72 H200 V130 Z M14 130 V100 A12 12 0 0 1 38 100 V130 Z M54 130 V100 A12 12 0 0 1 78 100 V130 Z M94 130 V100 A12 12 0 0 1 118 100 V130 Z M134 130 V100 A12 12 0 0 1 158 100 V130 Z M174 130 V100 A12 12 0 0 1 198 100 V130 Z"
          fill="rgba(252,250,246,0.9)"
          fillRule="evenodd"
        />
      )}
      {venue.kind === 'salon' && (
        <g>
          <line x1="100" y1="0" x2="100" y2="34" stroke={accent} strokeWidth="1" />
          <path d="M70 40 Q100 62 130 40" fill="none" stroke={accent} strokeWidth="1.5" />
          {[70, 85, 100, 115, 130].map((x) => (
            <circle key={x} cx={x} cy={x === 100 ? 50 : 44} r="2.6" fill={accent} />
          ))}
          {[30, 100, 170].map((x) => (
            <ellipse key={x} cx={x} cy="112" rx="24" ry="7" fill="rgba(252,250,246,0.85)" />
          ))}
        </g>
      )}
      {venue.kind === 'terraza' && (
        <g fill="rgba(16,10,24,0.65)">
          {[[0, 70, 26], [28, 84, 20], [50, 62, 24], [76, 90, 18], [96, 74, 28], [126, 58, 22], [150, 82, 24], [176, 68, 24]].map(([x, y, w]) => (
            <rect key={x} x={x} y={y} width={w} height={130 - y} />
          ))}
          <rect x="0" y="112" width="200" height="18" fill="rgba(252,250,246,0.85)" />
        </g>
      )}

      {venue.kind !== 'salon' &&
        lights.map((light, i) => (
          <circle
            key={i}
            cx={light.x}
            cy={light.y}
            r="2.4"
            fill={accent}
            style={{ animation: `venue-twinkle 2.4s ${i * 0.2}s ease-in-out infinite` }}
          />
        ))}
    </svg>
  )
}

function VenueCard({ venue, active }: { venue: PartnerVenue; active: boolean }) {
  return (
    <Box
      component="article"
      aria-label={`${venue.name}, ${venue.borough}`}
      sx={{
        width: '100%',
        borderRadius: '24px',
        overflow: 'hidden',
        bgcolor: brand.white,
        color: brand.cassis,
        transition: 'box-shadow 400ms, transform 400ms',
        transform: active ? 'scale(1.06)' : 'scale(1)',
        boxShadow: active
          ? `0 0 0 3px ${brand.amber}, 0 30px 70px -20px ${brand.amber}`
          : '0 24px 50px -24px rgba(0,0,0,0.6)',
      }}
    >
      <VenueArt venue={venue} />
      <Box sx={{ p: 2 }}>
        <Box sx={{ fontFamily: fontFamily.display, fontWeight: 700, fontSize: '1.0625rem', lineHeight: 1.2, mb: 0.75 }}>{venue.name}</Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, fontSize: '0.8125rem', color: 'text.secondary', mb: 1.25 }}>
          <PlaceRoundedIcon sx={{ fontSize: 16 }} />
          {venue.borough}, CDMX
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8125rem', fontWeight: 600 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
            <GroupsRoundedIcon sx={{ fontSize: 17, color: brand.violet }} />
            Hasta {venue.capacity}
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
            <StarRoundedIcon sx={{ fontSize: 17, color: brand.amber }} />
            {venue.rating.toFixed(1)}
          </Box>
        </Box>
      </Box>
    </Box>
  )
}

const stats = [
  { value: partnerTotals.venues, decimals: 0, label: 'salones aliados en CDMX' },
  { value: partnerTotals.rating, decimals: 1, label: 'de calificación promedio' },
  { value: partnerTotals.capacity, decimals: 0, label: 'lugares por noche entre todos' },
]

/**
 * Salones aliados: un carrusel 3D en forma de cilindro. La sección se fija y
 * el scroll hace girar los 10 salones; el que queda al frente se ilumina y
 * su reseña aparece debajo. Los números de arriba cuentan hacia arriba al
 * entrar.
 *
 * Con `prefers-reduced-motion`: cuadrícula estática con todos los salones.
 */
export function VenuesShowcase() {
  const scope = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)
  const activeVenue = partnerVenues[active]

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(motionOk, () => {
        const ring = scope.current?.querySelector('[data-ring]')
        if (!ring) return

        let current = 0
        gsap
          .timeline({
            scrollTrigger: {
              trigger: scope.current,
              start: 'top top',
              end: '+=260%',
              scrub: 1,
              pin: true,
              anticipatePin: 1,
              onUpdate: () => {
                const rotation = Number(gsap.getProperty(ring, 'rotationY'))
                const index = ((Math.round(-rotation / STEP) % partnerVenues.length) + partnerVenues.length) % partnerVenues.length
                if (index !== current) {
                  current = index
                  setActive(index)
                }
              },
            },
          })
          .fromTo(ring, { rotationY: 0 }, { rotationY: -STEP * (partnerVenues.length - 1), ease: 'none' })

        // Contadores que suben al entrar.
        gsap.utils.toArray<HTMLElement>('[data-count]').forEach((element) => {
          const target = Number(element.dataset.count)
          const decimals = Number(element.dataset.decimals)
          const counter = { value: 0 }
          ScrollTrigger.create({
            trigger: element,
            start: 'top 85%',
            once: true,
            onEnter: () =>
              gsap.to(counter, {
                value: target,
                duration: 1.8,
                ease: 'expo.out',
                onUpdate: () => {
                  element.textContent = counter.value.toLocaleString('es-MX', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
                },
              }),
          })
        })
      })
    },
    { scope },
  )

  return (
    <Box
      component="section"
      ref={scope}
      id="salones"
      aria-labelledby="salones-title"
      data-night
      sx={{
        position: 'relative',
        overflow: 'hidden',
        isolation: 'isolate',
        minHeight: '100svh',
        bgcolor: brand.cassis,
        color: brand.white,
        px: { xs: 2, md: 4 },
        pt: { xs: 12, md: 11 },
        pb: { xs: 6, md: 6 },
        backgroundImage: `
          radial-gradient(ellipse 60% 50% at 50% 70%, rgba(121,40,202,0.55), transparent 70%),
          radial-gradient(ellipse 35% 30% at 10% 15%, rgba(255,184,0,0.18), transparent 70%)`,
        '@keyframes venue-twinkle': { '0%, 100%': { opacity: 0.35 }, '50%': { opacity: 1 } },
        '@media (prefers-reduced-motion: reduce)': { '& *': { animation: 'none !important' } },
      }}
    >
      <Box sx={{ maxWidth: 1136, mx: 'auto', display: 'grid', gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'minmax(0, 1fr) auto' }, gap: { xs: 1, md: 6 }, alignItems: 'end' }}>
        <SectionHeading
          id="salones-title"
          inverted
          title="Salones que ya celebran con nosotros"
          lede="Jardines, haciendas, terrazas y salones de la Ciudad de México que ya reciben a sus invitados con nuestra plataforma."
        />
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, auto)', justifyContent: { xs: 'space-between', md: 'start' }, gap: { xs: 2, md: 5 }, mt: { xs: -2, md: 0 }, mb: { xs: 3, md: 7 } }}>
          {stats.map((stat) => (
            <Box key={stat.label}>
              <Box
                data-count={stat.value}
                data-decimals={stat.decimals}
                sx={{ fontFamily: fontFamily.display, fontWeight: 800, fontSize: { xs: '1.625rem', md: '2.75rem' }, lineHeight: 1, color: brand.amber, fontVariantNumeric: 'tabular-nums' }}
              >
                {stat.value.toLocaleString('es-MX', { minimumFractionDigits: stat.decimals })}
              </Box>
              <Box sx={{ fontSize: { xs: '0.75rem', md: '0.8125rem' }, color: 'rgba(255,255,255,0.72)', maxWidth: '10em', mt: 0.5 }}>{stat.label}</Box>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Escenario 3D */}
      <Box
        sx={{
          // Ancho según el ancho Y el alto de la pantalla, para que todo quepa al fijarse.
          '--card-w': 'clamp(150px, min(18vw, 22svh), 230px)',
          position: 'relative',
          // La perspectiva agranda ~30% la tarjeta del frente: el escenario lo contempla.
          height: 'calc(var(--card-w) * 1.95)',
          perspective: 1800,
          perspectiveOrigin: '50% 50%',
          '@media (prefers-reduced-motion: reduce)': { height: 'auto', perspective: 'none' },
        }}
      >
        <Box
          data-ring
          role="list"
          aria-label="Salones aliados"
          sx={{
            position: 'absolute',
            left: '50%',
            // Centrado vertical: el escenario mide 1.95 × el ancho y la tarjeta ~1.45 ×.
            top: 'calc(var(--card-w) * 0.25)',
            width: 'var(--card-w)',
            ml: 'calc(var(--card-w) / -2)',
            transformStyle: 'preserve-3d',
            '@media (prefers-reduced-motion: reduce)': {
              position: 'static',
              width: 'auto',
              ml: 0,
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
              gap: 2,
              maxWidth: 1136,
              mx: 'auto',
            },
          }}
        >
          {partnerVenues.map((venue, i) => (
            <Box
              key={venue.id}
              role="listitem"
              sx={{
                position: 'absolute',
                inset: 0,
                transform: `rotateY(${i * STEP}deg) translateZ(calc(var(--card-w) * 1.72))`,
                backfaceVisibility: 'hidden',
                '@media (prefers-reduced-motion: reduce)': { position: 'static', transform: 'none' },
              }}
            >
              <VenueCard venue={venue} active={i === active} />
            </Box>
          ))}
        </Box>
      </Box>

      {/* Reseña del salón al frente */}
      <Box aria-live="polite" sx={{ position: 'relative', maxWidth: 640, mx: 'auto', mt: { xs: 1, md: 1 }, minHeight: 110, textAlign: 'center', '@media (prefers-reduced-motion: reduce)': { display: 'none' } }}>
        <AnimatePresence mode="wait" initial={false}>
          <Box
            key={activeVenue.id}
            component={motion.figure}
            initial={{ opacity: 0, y: 14, filter: 'blur(6px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -10, filter: 'blur(6px)' }}
            transition={{ duration: duration.slow, ease: easing.out }}
            sx={{ m: 0 }}
          >
            <FormatQuoteRoundedIcon sx={{ color: brand.coral, fontSize: 32 }} />
            <Box component="blockquote" sx={{ m: 0, fontFamily: fontFamily.display, fontWeight: 600, fontSize: { xs: '1.125rem', md: '1.375rem' }, lineHeight: 1.35 }}>
              {activeVenue.quote}
            </Box>
            <Box component="figcaption" sx={{ mt: 1, fontSize: '0.875rem', color: 'rgba(255,255,255,0.7)' }}>
              {activeVenue.name}, con nosotros desde {activeVenue.since}
            </Box>
          </Box>
        </AnimatePresence>
      </Box>
    </Box>
  )
}
