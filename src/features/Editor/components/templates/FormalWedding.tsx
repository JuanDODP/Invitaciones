import '@fontsource-variable/cormorant-garamond'
import '@fontsource/great-vibes'
import { useRef, useState, type MouseEvent } from 'react'
import Box from '@mui/material/Box'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import { AnimatePresence, motion } from 'motion/react'
import { burstFromElement } from '@/utils'
import { gsap, motionOk, useGSAP } from '@/utils/gsap'
// Directo al archivo (no al barril): el barril de hooks importa las plantillas.
import { useCountdown } from '../../hooks/useCountdown'
import { templateMeta } from '../../utils'
import { FlipNumber } from './FlipNumber'
import { InvitationFrame } from './InvitationFrame'
import { LocationSheet } from './LocationSheet'

const ink = '#F5F1E8'
const gold = '#C8A96A'
const muted = '#9A978F'
const black = '#0E0E10'
const serif = '"Cormorant Garamond Variable", "Cormorant Garamond", Georgia, serif'
const script = '"Great Vibes", cursive'

const WEDDING_DATE = '2026-11-14T18:00:00-06:00'

/** Polvo dorado que sube lentamente (CSS puro, determinista). */
const dust = Array.from({ length: 26 }, (_, i) => ({
  left: (i * 37) % 100,
  size: 0.6 + ((i * 7) % 5) * 0.35,
  duration: 9 + ((i * 13) % 7),
  delay: -((i * 1.7) % 12),
}))

/** Abanico art déco para las esquinas del marco. */
function CornerFan({ transform }: { transform: string }) {
  return (
    <g transform={transform}>
      {[4, 7, 10].map((r) => (
        <path key={r} className="deco-line" pathLength={1} d={`M0 ${r} A ${r} ${r} 0 0 0 ${r} 0`} fill="none" stroke={gold} strokeWidth="0.35" />
      ))}
      <path className="deco-line" pathLength={1} d="M0 0 L 8.5 8.5" fill="none" stroke={gold} strokeWidth="0.35" />
    </g>
  )
}

function Rule({ width = '22cqi' }: { width?: string }) {
  return (
    <Box data-rule sx={{ display: 'flex', alignItems: 'center', gap: '2cqi', width, mx: 'auto' }}>
      <Box sx={{ flex: 1, height: '1px', bgcolor: gold }} />
      <Box sx={{ width: '1.6cqi', height: '1.6cqi', bgcolor: gold, rotate: '45deg' }} />
      <Box sx={{ flex: 1, height: '1px', bgcolor: gold }} />
    </Box>
  )
}

/**
 * Plantilla formal: boda de Valeria & Santiago, en blanco y negro con oro.
 *
 * Al entrar: aparece un sello dorado, se abren dos telones negros, el marco
 * art déco se dibuja trazo a trazo, el monograma se traza, los textos se
 * enfocan desde un desenfoque y los nombres se "escriben" de izquierda a
 * derecha. En reposo: polvo dorado que sube, un brillo que recorre los
 * nombres y una cuenta regresiva en vivo.
 */
export function FormalWedding({ still = false }: { still?: boolean }) {
  const scope = useRef<HTMLDivElement>(null)
  const [confirmed, setConfirmed] = useState(false)
  const [mapOpen, setMapOpen] = useState(false)
  const countdown = useCountdown(WEDDING_DATE)

  useGSAP(
    () => {
      if (still) return
      const mm = gsap.matchMedia()
      mm.add(motionOk, () => {
        gsap
          .timeline({ defaults: { ease: 'power3.out' } })
          .from('[data-seal]', { scale: 0, rotate: -90, duration: 0.9, ease: 'back.out(1.8)' })
          .to('[data-seal]', { scale: 1.25, autoAlpha: 0, duration: 0.5, ease: 'power2.in' }, '+=0.35')
          .to('[data-curtain="left"]', { xPercent: -101, duration: 1.3, ease: 'power4.inOut' }, '<')
          .to('[data-curtain="right"]', { xPercent: 101, duration: 1.3, ease: 'power4.inOut' }, '<')
          .fromTo('.deco-line', { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.6, stagger: 0.04, ease: 'power2.inOut' }, '-=0.6')
          .from('[data-monogram]', { scale: 0.6, autoAlpha: 0, duration: 0.8 }, '-=1.2')
          .from('[data-reveal]', { autoAlpha: 0, yPercent: 40, filter: 'blur(8px)', duration: 0.9, stagger: 0.12 }, '-=0.9')
          .fromTo('[data-write]', { clipPath: 'inset(-20% 100% -20% 0%)' }, { clipPath: 'inset(-20% 0% -20% 0%)', duration: 1.2, stagger: 0.5, ease: 'power2.inOut' }, '-=1.4')
          .from('[data-amp]', { scale: 0, rotate: -30, autoAlpha: 0, duration: 0.7, ease: 'back.out(2)' }, '-=1.3')
          .from('[data-rule]', { scaleX: 0, duration: 0.9, stagger: 0.1 }, '-=0.8')
          .from('[data-count-box]', { yPercent: 60, autoAlpha: 0, duration: 0.6, stagger: 0.08, ease: 'back.out(1.6)' }, '-=0.6')
          .from('[data-cta]', { yPercent: 80, autoAlpha: 0, duration: 0.6, stagger: 0.1 }, '-=0.4')
      })
    },
    { scope, dependencies: [still] },
  )

  const confirm = (event: MouseEvent<HTMLButtonElement>) => {
    if (!confirmed) burstFromElement(event.currentTarget, 90, templateMeta.formal.confetti)
    setConfirmed(true)
  }

  return (
    <InvitationFrame ref={scope} still={still} sx={{ bgcolor: black, color: ink, fontFamily: serif }}>
      {/* Fondo: viñeta y textura de líneas finas */}
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `radial-gradient(ellipse 80% 60% at 50% 40%, #1C1C20 0%, ${black} 70%), repeating-linear-gradient(45deg, rgba(255,255,255,0.015) 0 1px, transparent 1px 7px)`,
        }}
      />

      {/* Polvo dorado */}
      <Box aria-hidden="true" sx={{ position: 'absolute', inset: 0, '@keyframes dust-rise': { from: { transform: 'translateY(0)', opacity: 0 }, '15%': { opacity: 0.9 }, to: { transform: 'translateY(-185cqi)', opacity: 0 } } }}>
        {dust.map((particle, i) => (
          <Box
            key={i}
            sx={{
              position: 'absolute',
              bottom: '-2cqi',
              left: `${particle.left}%`,
              width: `${particle.size}cqi`,
              height: `${particle.size}cqi`,
              borderRadius: '50%',
              bgcolor: gold,
              boxShadow: `0 0 2cqi ${gold}`,
              opacity: still ? (i % 3 === 0 ? 0.6 : 0) : 0,
              top: still ? `${(i * 53) % 100}%` : 'auto',
              animation: `dust-rise ${particle.duration}s ${particle.delay}s linear infinite`,
            }}
          />
        ))}
      </Box>

      {/* Marco art déco que se dibuja */}
      <Box component="svg" viewBox="0 0 90 160" preserveAspectRatio="none" aria-hidden="true" sx={{ position: 'absolute', inset: '3.5cqi', width: 'calc(100% - 7cqi)', height: 'calc(100% - 7cqi)' }}>
        <rect className="deco-line" pathLength={1} x="0.5" y="0.5" width="89" height="159" fill="none" stroke={gold} strokeWidth="0.35" vectorEffect="non-scaling-stroke" />
        <rect className="deco-line" pathLength={1} x="2.5" y="2.5" width="85" height="155" fill="none" stroke={gold} strokeWidth="0.2" vectorEffect="non-scaling-stroke" opacity="0.6" />
        <CornerFan transform="translate(2.5 2.5)" />
        <CornerFan transform="translate(87.5 2.5) scale(-1 1)" />
        <CornerFan transform="translate(2.5 157.5) scale(1 -1)" />
        <CornerFan transform="translate(87.5 157.5) scale(-1 -1)" />
      </Box>

      {/* Contenido */}
      <Box sx={{ position: 'relative', zIndex: 1, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', px: '11cqi', pt: '11cqi', pb: '14cqi' }}>
        <Box data-monogram sx={{ position: 'relative', width: '14cqi', height: '14cqi', display: 'grid', placeItems: 'center', mb: '2.5cqi', animation: 'mono-glow 4s ease-in-out infinite', '@keyframes mono-glow': { '0%, 100%': { filter: 'drop-shadow(0 0 0 transparent)' }, '50%': { filter: `drop-shadow(0 0 2.5cqi ${gold}88)` } } }}>
          <Box component="svg" viewBox="0 0 40 40" sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} aria-hidden="true">
            <circle className="deco-line" pathLength={1} cx="20" cy="20" r="18.5" fill="none" stroke={gold} strokeWidth="0.6" />
            <circle className="deco-line" pathLength={1} cx="20" cy="20" r="16.5" fill="none" stroke={gold} strokeWidth="0.3" />
          </Box>
          <Box sx={{ fontFamily: serif, fontSize: '5cqi', fontWeight: 500, letterSpacing: '0.05em', display: 'flex', alignItems: 'center', gap: '1.2cqi' }}>
            V<Box component="span" sx={{ width: '0.3cqi', height: '5cqi', bgcolor: gold, rotate: '20deg' }} />S
          </Box>
        </Box>

        <Box data-reveal sx={{ fontSize: '3cqi', letterSpacing: '0.32em', textTransform: 'uppercase', color: muted, mb: '1cqi' }}>
          Junto con sus padres
        </Box>

        <Box
          data-write
          sx={{
            fontFamily: script,
            fontSize: '13.5cqi',
            lineHeight: 1.05,
            backgroundImage: `linear-gradient(110deg, ${ink} 40%, #FFF6DA 50%, ${ink} 60%)`,
            backgroundSize: '250% 100%',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            animation: 'shimmer 5s ease-in-out infinite',
            '@keyframes shimmer': { '0%': { backgroundPosition: '120% 0' }, '60%, 100%': { backgroundPosition: '-20% 0' } },
          }}
        >
          Valeria
        </Box>
        <Box data-amp sx={{ fontFamily: serif, fontStyle: 'italic', fontSize: '7cqi', color: gold, lineHeight: 0.85 }}>
          &amp;
        </Box>
        <Box
          data-write
          sx={{
            fontFamily: script,
            fontSize: '13.5cqi',
            lineHeight: 1.05,
            mb: '2cqi',
            backgroundImage: `linear-gradient(110deg, ${ink} 40%, #FFF6DA 50%, ${ink} 60%)`,
            backgroundSize: '250% 100%',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            animation: 'shimmer 5s 0.4s ease-in-out infinite',
          }}
        >
          Santiago
        </Box>

        <Box data-reveal sx={{ fontStyle: 'italic', fontSize: '4cqi', lineHeight: 1.3, color: '#D9D4C7', maxWidth: '60cqi', mb: '3cqi' }}>
          tienen el honor de invitarle a celebrar su unión matrimonial
        </Box>

        <Box data-reveal sx={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'center', gap: '3cqi', width: '100%', mb: '1.5cqi' }}>
          <Box sx={{ fontSize: '3.2cqi', letterSpacing: '0.25em', textTransform: 'uppercase', borderBlock: `1px solid ${gold}`, py: '1.5cqi' }}>Sábado</Box>
          <Box sx={{ fontSize: '13cqi', fontWeight: 500, lineHeight: 0.9, color: ink }}>14</Box>
          <Box sx={{ fontSize: '3.2cqi', letterSpacing: '0.25em', textTransform: 'uppercase', borderBlock: `1px solid ${gold}`, py: '1.5cqi' }}>Noviembre</Box>
        </Box>
        <Box data-reveal sx={{ fontSize: '3.4cqi', letterSpacing: '0.3em', color: gold, mb: '3cqi' }}>
          2026 · 18:00 HRS
        </Box>

        <Rule />

        <Box data-reveal sx={{ mt: '3cqi', fontSize: '3cqi', letterSpacing: '0.28em', textTransform: 'uppercase', color: muted }}>
          Ceremonia y recepción
        </Box>
        <Box data-reveal sx={{ fontSize: '5.6cqi', fontWeight: 600, mt: '0.5cqi' }}>
          Hacienda Los Olivos
        </Box>
        <Box data-reveal sx={{ fontSize: '3.6cqi', fontStyle: 'italic', color: muted, mb: '3cqi' }}>
          San Ángel, Ciudad de México
        </Box>

        {/* Cuenta regresiva */}
        <Box role="timer" aria-label="Cuenta regresiva para la boda" sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '2cqi', width: '100%', mb: '2.5cqi' }}>
          {[
            ['Días', countdown.days, 2],
            ['Horas', countdown.hours, 2],
            ['Min', countdown.minutes, 2],
            ['Seg', countdown.seconds, 2],
          ].map(([label, value, digits]) => (
            <Box key={label as string} data-count-box sx={{ border: `1px solid ${gold}55`, py: '1.6cqi' }}>
              <Box sx={{ fontSize: '5.6cqi', fontWeight: 500, lineHeight: 1 }}>
                <FlipNumber value={value as number} digits={digits as number} />
              </Box>
              <Box sx={{ fontSize: '2.4cqi', letterSpacing: '0.25em', textTransform: 'uppercase', color: gold, mt: '0.6cqi' }}>{label}</Box>
            </Box>
          ))}
        </Box>

        <Box data-reveal sx={{ fontSize: '3.2cqi', letterSpacing: '0.2em', textTransform: 'uppercase', color: muted, mb: 'auto' }}>
          Etiqueta rigurosa
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: '1.35fr 1fr', gap: '2.5cqi', width: '100%', mt: '3cqi' }}>
          <Box
            data-cta
            component={motion.button}
            type="button"
            onClick={confirm}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            animate={{ backgroundColor: confirmed ? gold : ink, color: black }}
            aria-live="polite"
            sx={{ border: 0, cursor: 'pointer', fontFamily: serif, fontWeight: 700, fontSize: '3.4cqi', letterSpacing: '0.04em', whiteSpace: 'nowrap', py: '3cqi', minHeight: 44, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1cqi' }}
          >
            <AnimatePresence mode="popLayout" initial={false}>
              <motion.span key={confirmed ? 'ok' : 'idle'} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                {confirmed && <CheckRoundedIcon sx={{ fontSize: '1.2em' }} />}
                {confirmed ? 'Confirmado' : 'Confirmar asistencia'}
              </motion.span>
            </AnimatePresence>
          </Box>
          <Box
            data-cta
            component={motion.button}
            type="button"
            onClick={() => setMapOpen(true)}
            whileHover={{ scale: 1.04, backgroundColor: 'rgba(200,169,106,0.12)' }}
            whileTap={{ scale: 0.96 }}
            sx={{ border: `1px solid ${gold}`, bgcolor: 'transparent', color: gold, cursor: 'pointer', fontFamily: serif, fontWeight: 700, fontSize: '3.4cqi', letterSpacing: '0.04em', whiteSpace: 'nowrap', py: '3cqi', minHeight: 44 }}
          >
            Cómo llegar
          </Box>
        </Box>
      </Box>

      <LocationSheet
        open={mapOpen}
        onClose={() => setMapOpen(false)}
        place="Hacienda Los Olivos"
        address="San Ángel, Ciudad de México"
        fontFamily={serif}
        colors={{ surface: ink, ink: black, accent: black, map: '#E7E1D3', road: '#FFFFFF' }}
      />

      {/* Apertura: sello y telones (no aparecen en la versión fija) */}
      {!still && (
        <Box aria-hidden="true" sx={{ position: 'absolute', inset: 0, zIndex: 30, pointerEvents: 'none', '@media (prefers-reduced-motion: reduce)': { display: 'none' } }}>
          {(['left', 'right'] as const).map((side) => (
            <Box
              key={side}
              data-curtain={side}
              sx={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                [side]: 0,
                width: '50.5%',
                bgcolor: black,
                backgroundImage: 'repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0 2px, transparent 2px 9px)',
                [side === 'left' ? 'borderRight' : 'borderLeft']: `1px solid ${gold}`,
                boxShadow: '0 0 40px rgba(0,0,0,0.8)',
              }}
            />
          ))}
          <Box
            data-seal
            sx={{
              position: 'absolute',
              left: '50%',
              top: '50%',
              translate: '-50% -50%',
              width: '24cqi',
              height: '24cqi',
              borderRadius: '50%',
              background: `radial-gradient(circle at 35% 30%, #F1DDA8, ${gold} 55%, #8E733F)`,
              display: 'grid',
              placeItems: 'center',
              boxShadow: '0 1cqi 4cqi rgba(0,0,0,0.6), inset 0 0 0 1.2cqi rgba(0,0,0,0.08)',
              fontFamily: script,
              fontSize: '9cqi',
              color: '#5A4520',
            }}
          >
            VS
          </Box>
        </Box>
      )}
    </InvitationFrame>
  )
}
