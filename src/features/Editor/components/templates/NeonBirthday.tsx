import '@fontsource/monoton'
import '@fontsource/great-vibes'
import { useRef, useState, type MouseEvent } from 'react'
import Box from '@mui/material/Box'
import EventRoundedIcon from '@mui/icons-material/EventRounded'
import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded'
import CheckroomRoundedIcon from '@mui/icons-material/CheckroomRounded'
import { motion } from 'motion/react'
import { burstFromElement, fontFamily } from '@/utils'
import { gsap, motionOk, SplitText, useGSAP } from '@/utils/gsap'
import { templateMeta } from '../../utils'
import { InvitationFrame } from './InvitationFrame'
import { LocationSheet } from './LocationSheet'

const neon = { pink: '#FF2E97', cyan: '#00F0FF', lime: '#C6FF00', yellow: '#FFE600', violet: '#9D4EDD', night: '#0A0418' }
const monoton = '"Monoton", cursive'
const script = '"Great Vibes", cursive'

/** Brillo de tubo de neón: núcleo claro + halo del color. */
const glow = (color: string, size = 1) =>
  `0 0 ${0.4 * size}cqi #fff, 0 0 ${1.2 * size}cqi ${color}, 0 0 ${2.6 * size}cqi ${color}, 0 0 ${5 * size}cqi ${color}`

const bars = Array.from({ length: 18 }, (_, i) => ({
  color: [neon.pink, neon.violet, neon.cyan, neon.lime][i % 4],
  duration: 0.45 + ((i * 7) % 5) * 0.09,
  delay: -((i * 0.13) % 0.9),
}))

/**
 * Plantilla neón: el cumpleaños 20 de Silva.
 *
 * Entrada "de encendido": todo oscuro y los letreros parpadean hasta
 * prender; el piso retro sube desde el horizonte, sale el sol a rayas, baja
 * la bola disco y el ecualizador arranca. En reposo: láseres que barren,
 * cuadrícula en movimiento, letras de neón que fallan a ratos.
 * Interacción: tocar el "20" lo hace "glitchear"; "Me apunto" lanza un
 * destello y confeti neón.
 */
export function NeonBirthday({ still = false }: { still?: boolean }) {
  const scope = useRef<HTMLDivElement>(null)
  const [glitching, setGlitching] = useState(false)
  const [joined, setJoined] = useState(false)
  const [flashCount, setFlashCount] = useState(0)
  const [mapOpen, setMapOpen] = useState(false)

  useGSAP(
    () => {
      if (still) return
      const mm = gsap.matchMedia()
      mm.add(motionOk, () => {
        const name = SplitText.create('[data-neon-name]', { type: 'chars' })
        const flickerOn = { keyframes: { opacity: [0, 1, 0.1, 1, 0.3, 1] }, duration: 0.7, ease: 'none' }
        gsap
          .timeline({ defaults: { ease: 'power3.out' } })
          .from('[data-neon-sun]', { yPercent: 70, scale: 0.6, autoAlpha: 0, duration: 1.4 })
          .from('[data-neon-grid]', { yPercent: 60, autoAlpha: 0, duration: 1.2 }, 0.1)
          .from('[data-neon-ball]', { y: '-60cqi', duration: 1.1, ease: 'bounce.out' }, 0.3)
          .fromTo('[data-neon-script]', { opacity: 0 }, flickerOn, 0.9)
          .fromTo(name.chars, { opacity: 0 }, { ...flickerOn, stagger: 0.09 }, 1.2)
          .from('[data-neon-twenty]', { scale: 3, autoAlpha: 0, filter: 'blur(10px)', duration: 0.7, ease: 'expo.out' }, 1.8)
          .to('[data-neon-twenty]', { x: '1.5cqi', duration: 0.05, repeat: 7, yoyo: true, ease: 'none' }, 2.4)
          .from('[data-neon-laser]', { autoAlpha: 0, duration: 0.4, stagger: 0.1 }, 2)
          .from('[data-neon-card]', { yPercent: 30, autoAlpha: 0, duration: 0.8 }, 2.2)
          .fromTo('[data-neon-row]', { opacity: 0 }, { ...flickerOn, stagger: 0.12 }, 2.4)
          .from('[data-neon-bar]', { scaleY: 0, duration: 0.6, stagger: 0.03, ease: 'back.out(3)' }, 2.3)
          .from('[data-neon-cta]', { scale: 0, duration: 0.7, stagger: 0.12, ease: 'elastic.out(1, 0.45)' }, 2.7)
      })
    },
    { scope, dependencies: [still] },
  )

  const glitch = () => {
    setGlitching(true)
    window.setTimeout(() => setGlitching(false), 650)
  }

  const join = (event: MouseEvent<HTMLButtonElement>) => {
    burstFromElement(event.currentTarget, 160, templateMeta.neon.confetti)
    setFlashCount((count) => count + 1)
    setJoined(true)
  }

  return (
    <InvitationFrame
      ref={scope}
      still={still}
      sx={{
        bgcolor: neon.night,
        color: '#fff',
        fontFamily: fontFamily.body,
        '@keyframes neon-flicker': {
          '0%, 18%, 22%, 25%, 53%, 57%, 100%': { opacity: 1 },
          '20%, 24%, 55%': { opacity: 0.25 },
        },
        '@keyframes neon-grid': { from: { backgroundPosition: '0 0' }, to: { backgroundPosition: '0 10cqi' } },
        '@keyframes neon-sweep': { '0%, 100%': { transform: 'rotate(-28deg)' }, '50%': { transform: 'rotate(28deg)' } },
        '@keyframes neon-eq': { '0%, 100%': { transform: 'scaleY(0.2)' }, '50%': { transform: 'scaleY(1)' } },
        '@keyframes neon-spin': { from: { backgroundPosition: '0 0' }, to: { backgroundPosition: '20cqi 0' } },
        '@keyframes neon-pulse': { '0%, 100%': { transform: 'scale(1)' }, '50%': { transform: 'scale(1.04)' } },
        '@keyframes neon-glitch': {
          '0%': { textShadow: `-1.2cqi 0 ${neon.pink}, 1.2cqi 0 ${neon.cyan}`, transform: 'translate(0) skewX(0deg)' },
          '20%': { textShadow: `1.6cqi 0.4cqi ${neon.pink}, -1.6cqi -0.4cqi ${neon.cyan}`, transform: 'translate(-1.2cqi, 0.6cqi) skewX(-12deg)' },
          '40%': { textShadow: `-0.8cqi 0 ${neon.lime}, 0.8cqi 0 ${neon.pink}`, transform: 'translate(1.4cqi, -0.4cqi) skewX(10deg)' },
          '60%': { textShadow: `1cqi 0 ${neon.cyan}, -1cqi 0 ${neon.yellow}`, transform: 'translate(-0.6cqi, 0) skewX(-4deg)' },
          '100%': { textShadow: glow(neon.lime, 1.4), transform: 'translate(0) skewX(0deg)' },
        },
        // Un solo destello suave: más de 3 por segundo puede afectar a personas fotosensibles.
        '@keyframes neon-flash': { from: { opacity: 0.55 }, to: { opacity: 0 } },
      }}
    >
      {/* Cielo y horizonte */}
      <Box aria-hidden="true" sx={{ position: 'absolute', inset: 0, background: `linear-gradient(180deg, ${neon.night} 0%, #1A0838 40%, #4A0E5C 62%, #120427 63%, ${neon.night} 100%)` }} />

      {/* Sol retro a rayas */}
      <Box
        data-neon-sun
        aria-hidden="true"
        sx={{
          position: 'absolute',
          left: '50%',
          top: '83cqi',
          width: '64cqi',
          height: '32cqi',
          ml: '-32cqi',
          borderRadius: '32cqi 32cqi 0 0',
          background: `linear-gradient(180deg, ${neon.yellow} 0%, #FF8A3D 45%, ${neon.pink} 100%)`,
          WebkitMaskImage: 'linear-gradient(180deg, #000 45%, transparent 45%, transparent 52%, #000 52%, #000 64%, transparent 64%, transparent 70%, #000 70%, #000 80%, transparent 80%, transparent 86%, #000 86%)',
          maskImage: 'linear-gradient(180deg, #000 45%, transparent 45%, transparent 52%, #000 52%, #000 64%, transparent 64%, transparent 70%, #000 70%, #000 80%, transparent 80%, transparent 86%, #000 86%)',
          filter: `drop-shadow(0 0 4cqi ${neon.pink})`,
          opacity: 0.85,
        }}
      />

      {/* Piso retro en perspectiva */}
      <Box data-neon-grid aria-hidden="true" sx={{ position: 'absolute', left: '-50%', right: '-50%', top: '112cqi', bottom: 0, perspective: '40cqi', overflow: 'hidden' }}>
        <Box
          sx={{
            position: 'absolute',
            inset: '-10% 0 -60% 0',
            transform: 'rotateX(62deg)',
            transformOrigin: '50% 0%',
            backgroundImage: `linear-gradient(${neon.pink} 0.3cqi, transparent 0.3cqi), linear-gradient(90deg, ${neon.cyan} 0.3cqi, transparent 0.3cqi)`,
            backgroundSize: '10cqi 10cqi',
            opacity: 0.55,
            animation: 'neon-grid 0.9s linear infinite',
            maskImage: 'linear-gradient(180deg, transparent, #000 25%)',
            WebkitMaskImage: 'linear-gradient(180deg, transparent, #000 25%)',
          }}
        />
      </Box>

      {/* Láseres */}
      {[
        { left: '0%', color: neon.pink, duration: 3.2, delay: 0 },
        { left: '100%', color: neon.cyan, duration: 3.8, delay: -1 },
        { left: '50%', color: neon.lime, duration: 4.6, delay: -2 },
      ].map((laser) => (
        <Box
          key={laser.left}
          data-neon-laser
          aria-hidden="true"
          sx={{
            position: 'absolute',
            top: '-4cqi',
            left: laser.left,
            width: '0.5cqi',
            height: '200cqi',
            ml: '-0.25cqi',
            transformOrigin: '50% 0%',
            background: `linear-gradient(180deg, ${laser.color}, transparent 80%)`,
            boxShadow: `0 0 2cqi ${laser.color}`,
            mixBlendMode: 'screen',
            opacity: 0.7,
            transform: still ? 'rotate(18deg)' : undefined,
            animation: `neon-sweep ${laser.duration}s ${laser.delay}s ease-in-out infinite`,
          }}
        />
      ))}

      {/* Bola disco */}
      <Box data-neon-ball aria-hidden="true" sx={{ position: 'absolute', left: '50%', top: 0, ml: '-7cqi', width: '14cqi', zIndex: 1 }}>
        <Box sx={{ width: '0.4cqi', height: '6cqi', bgcolor: 'rgba(255,255,255,0.5)', mx: 'auto' }} />
        <Box
          sx={{
            width: '14cqi',
            height: '14cqi',
            borderRadius: '50%',
            backgroundColor: '#B9B4D0',
            backgroundImage: `linear-gradient(90deg, rgba(0,0,0,0.25) 1px, transparent 1px), linear-gradient(rgba(0,0,0,0.25) 1px, transparent 1px), radial-gradient(circle at 35% 30%, #fff, transparent 45%), linear-gradient(90deg, ${neon.cyan}55, ${neon.pink}55, ${neon.lime}55, ${neon.cyan}55)`,
            backgroundSize: '2cqi 2cqi, 2cqi 2cqi, 100% 100%, 20cqi 100%',
            boxShadow: `0 0 4cqi ${neon.violet}, inset -2cqi -2cqi 4cqi rgba(0,0,0,0.5)`,
            animation: 'neon-spin 2.4s linear infinite',
          }}
        />
      </Box>

      {/* Contenido */}
      <Box sx={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', px: '7cqi', pt: '24cqi', pb: '6cqi' }}>
        <Box data-neon-script sx={{ fontFamily: script, fontSize: '13cqi', lineHeight: 1, color: '#E6FEFF', textShadow: glow(neon.cyan), rotate: '-6deg', mb: '-2cqi', animation: 'neon-flicker 7s 3s infinite' }}>
          cumple
        </Box>
        <Box
          data-neon-name
          sx={{
            fontFamily: fontFamily.display,
            fontWeight: 900,
            fontSize: '21cqi',
            letterSpacing: '0.04em',
            lineHeight: 1,
            // Relleno claro + halo (no contorno): la fuente variable tiene contornos
            // superpuestos que un text-stroke dejaría ver como líneas internas.
            color: '#FFE3F1',
            textShadow: glow(neon.pink, 1.1),
            '& > div': { display: 'inline-block' },
            // Una letra "falla" como tubo de neón viejo.
            '& > div:nth-of-type(3)': { animation: 'neon-flicker 3.4s 3.5s infinite' },
          }}
        >
          SILVA
        </Box>

        <Box
          data-neon-twenty
          component="button"
          type="button"
          onClick={glitch}
          aria-label="20 años"
          sx={{
            mt: '1cqi',
            p: 0,
            border: 0,
            bgcolor: 'transparent',
            cursor: 'pointer',
            fontFamily: monoton,
            fontSize: '44cqi',
            lineHeight: 0.95,
            color: '#F4FFD0',
            textShadow: glow(neon.lime, 1.4),
            animation: glitching ? 'neon-glitch 0.65s steps(2) both' : 'neon-pulse 1.8s ease-in-out infinite',
            '&:focus-visible': { outline: `2px dashed ${neon.lime}`, outlineOffset: 4 },
          }}
        >
          20
        </Box>

        <Box
          data-neon-card
          sx={{
            mt: '3cqi',
            width: '100%',
            borderRadius: '4cqi',
            border: `0.4cqi solid ${neon.cyan}`,
            boxShadow: `0 0 2.4cqi ${neon.cyan}, inset 0 0 2.4cqi ${neon.cyan}66`,
            bgcolor: 'rgba(10,4,24,0.72)',
            backdropFilter: 'blur(2px)',
            p: '4cqi',
            display: 'grid',
            gap: '2.6cqi',
            textAlign: 'left',
          }}
        >
          {[
            { icon: <EventRoundedIcon />, color: neon.pink, title: 'Viernes 20 de noviembre', text: 'Desde las 10:00 pm' },
            { icon: <PlaceRoundedIcon />, color: neon.cyan, title: 'Rooftop Neón', text: 'Roma Norte, CDMX' },
            { icon: <CheckroomRoundedIcon />, color: neon.lime, title: 'Dress code: neón', text: 'Lo que brille en la oscuridad' },
          ].map((row) => (
            <Box key={row.title} data-neon-row sx={{ display: 'flex', alignItems: 'center', gap: '3cqi' }}>
              <Box sx={{ color: row.color, filter: `drop-shadow(0 0 1.2cqi ${row.color})`, display: 'grid', '& svg': { fontSize: '7cqi' } }}>{row.icon}</Box>
              <Box>
                <Box sx={{ fontWeight: 800, fontSize: '4.4cqi', lineHeight: 1.15, textShadow: `0 0 1.4cqi ${row.color}` }}>{row.title}</Box>
                <Box sx={{ fontSize: '3.5cqi', color: 'rgba(255,255,255,0.72)' }}>{row.text}</Box>
              </Box>
            </Box>
          ))}
        </Box>

        {/* Ecualizador */}
        <Box aria-hidden="true" sx={{ display: 'flex', alignItems: 'end', gap: '1.2cqi', height: '10cqi', width: '100%', mt: 'auto', mb: '3.5cqi' }}>
          {bars.map((bar, i) => (
            <Box
              key={i}
              data-neon-bar
              sx={{
                flex: 1,
                height: '100%',
                borderRadius: '1cqi',
                bgcolor: bar.color,
                boxShadow: `0 0 1.6cqi ${bar.color}`,
                transformOrigin: 'bottom',
                transform: still ? `scaleY(${0.3 + ((i * 37) % 70) / 100})` : undefined,
                animation: `neon-eq ${bar.duration}s ${bar.delay}s ease-in-out infinite`,
              }}
            />
          ))}
        </Box>

        <Box sx={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '3cqi', width: '100%' }}>
          <Box
            data-neon-cta
            component={motion.button}
            type="button"
            onClick={join}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.93 }}
            aria-live="polite"
            sx={{
              border: 0,
              cursor: 'pointer',
              fontFamily: fontFamily.display,
              fontWeight: 800,
              fontSize: '4.8cqi',
              minHeight: 44,
              py: '3cqi',
              borderRadius: 99,
              bgcolor: joined ? neon.lime : neon.pink,
              color: joined ? neon.night : '#fff',
              boxShadow: `0 0 3cqi ${joined ? neon.lime : neon.pink}`,
              animation: 'neon-pulse 1.2s ease-in-out infinite',
              transition: 'background-color 200ms, box-shadow 200ms',
            }}
          >
            {joined ? '¡Nos vemos ahí!' : 'Me apunto'}
          </Box>
          <Box
            data-neon-cta
            component={motion.button}
            type="button"
            onClick={() => setMapOpen(true)}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.93 }}
            sx={{
              border: `0.4cqi solid ${neon.cyan}`,
              bgcolor: 'transparent',
              color: '#fff',
              cursor: 'pointer',
              fontFamily: fontFamily.display,
              fontWeight: 800,
              fontSize: '4.8cqi',
              minHeight: 44,
              py: '3cqi',
              borderRadius: 99,
              boxShadow: `0 0 2cqi ${neon.cyan}, inset 0 0 2cqi ${neon.cyan}66`,
              textShadow: `0 0 1.4cqi ${neon.cyan}`,
            }}
          >
            Ubicación
          </Box>
        </Box>
      </Box>

      {/* Destello al apuntarse */}
      {flashCount > 0 && (
        <Box
          key={flashCount}
          aria-hidden="true"
          sx={{
            position: 'absolute',
            inset: 0,
            zIndex: 15,
            pointerEvents: 'none',
            background: `radial-gradient(circle at 50% 85%, #fff, ${neon.pink} 60%, transparent)`,
            opacity: 0,
            animation: 'neon-flash 0.45s ease-out both',
          }}
        />
      )}

      <LocationSheet
        open={mapOpen}
        onClose={() => setMapOpen(false)}
        place="Rooftop Neón"
        address="Roma Norte, Ciudad de México"
        fontFamily={fontFamily.display}
        colors={{ surface: '#170A2E', ink: '#fff', accent: neon.pink, map: '#22104A', road: neon.cyan }}
      />
    </InvitationFrame>
  )
}
