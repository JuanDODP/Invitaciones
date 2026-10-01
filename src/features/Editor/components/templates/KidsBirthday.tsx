import '@fontsource-variable/fredoka'
import { useEffect, useRef, useState, type MouseEvent } from 'react'
import Box from '@mui/material/Box'
import CakeRoundedIcon from '@mui/icons-material/CakeRounded'
import EventRoundedIcon from '@mui/icons-material/EventRounded'
import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded'
import CelebrationRoundedIcon from '@mui/icons-material/CelebrationRounded'
import { AnimatePresence, motion } from 'motion/react'
import { burstConfetti, burstFromElement } from '@/utils'
import { gsap, motionOk, SplitText, useGSAP } from '@/utils/gsap'
import { templateMeta } from '../../utils'
import { InvitationFrame } from './InvitationFrame'
import { LocationSheet } from './LocationSheet'

const font = '"Fredoka Variable", "Fredoka", system-ui, sans-serif'
const ink = '#2B2D42'
const colors = { sun: '#FFD23F', coral: '#FF6B6B', mint: '#3DDC97', grape: '#9B5DE5', orange: '#FF9F1C', sky: '#59C3FF' }
const letterColors = [colors.coral, colors.orange, colors.sun, colors.mint, colors.sky, colors.grape]
const rainbow = [colors.coral, colors.orange, colors.sun, colors.mint, colors.sky, colors.grape]

const balloonsSeed = [
  { id: 1, left: 3, top: 25, color: colors.coral, delay: 0 },
  { id: 2, left: 85, top: 23, color: colors.grape, delay: 0.6 },
  { id: 3, left: 86, top: 42, color: colors.mint, delay: 1.2 },
  { id: 4, left: 2, top: 44, color: colors.orange, delay: 0.3 },
]

const fallingConfetti = Array.from({ length: 22 }, (_, i) => ({
  left: (i * 41) % 100,
  color: letterColors[i % letterColors.length],
  duration: 6 + ((i * 7) % 6),
  delay: -((i * 1.3) % 9),
  round: i % 3 === 0,
}))

function Cloud({ width }: { width: string }) {
  return (
    <Box component="svg" viewBox="0 0 100 50" sx={{ width, display: 'block', filter: 'drop-shadow(0 1cqi 0 rgba(0,0,0,0.06))' }} aria-hidden="true">
      <path d="M20 45 Q2 45 6 32 Q8 20 22 22 Q26 6 44 9 Q58 0 68 14 Q86 10 88 26 Q100 30 94 42 Q92 46 84 45 Z" fill="#fff" />
    </Box>
  )
}

function Sun() {
  return (
    <Box sx={{ position: 'relative', width: '26cqi', height: '26cqi' }}>
      <Box component="svg" viewBox="-50 -50 100 100" sx={{ position: 'absolute', inset: '-20%', width: '140%', height: '140%', animation: 'kid-spin 18s linear infinite' }} aria-hidden="true">
        {Array.from({ length: 12 }, (_, i) => (
          <rect key={i} x="-3" y="-48" width="6" height="14" rx="3" fill={colors.sun} transform={`rotate(${i * 30})`} />
        ))}
      </Box>
      <Box component="svg" viewBox="0 0 100 100" sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} aria-hidden="true">
        <circle cx="50" cy="50" r="40" fill={colors.sun} stroke={colors.orange} strokeWidth="4" />
        <g style={{ transformOrigin: '50px 44px', animation: 'kid-blink 4s infinite' }}>
          <circle cx="37" cy="44" r="5" fill={ink} />
          <circle cx="63" cy="44" r="5" fill={ink} />
        </g>
        <circle cx="28" cy="58" r="6" fill={colors.coral} opacity="0.5" />
        <circle cx="72" cy="58" r="6" fill={colors.coral} opacity="0.5" />
        <path d="M38 60 Q50 72 62 60" stroke={ink} strokeWidth="4" fill="none" strokeLinecap="round" />
      </Box>
    </Box>
  )
}

/** Dinosaurio fiestero: parpadea y saluda con el brazo. */
function Dino() {
  return (
    <Box component="svg" viewBox="0 0 120 130" sx={{ width: '100%', display: 'block', overflow: 'visible' }} aria-hidden="true">
      {/* Cola y cuerpo */}
      <path d="M10 120 Q0 90 30 92 L40 120 Z" fill="#2FBF84" />
      <ellipse cx="62" cy="104" rx="38" ry="30" fill={colors.mint} />
      <ellipse cx="66" cy="112" rx="22" ry="16" fill="#C8F7DF" />
      {/* Púas */}
      {[[40, 76], [52, 70], [64, 68], [76, 70]].map(([x, y]) => (
        <path key={x} d={`M${x - 6} ${y + 6} L${x} ${y - 6} L${x + 6} ${y + 6} Z`} fill={colors.orange} />
      ))}
      {/* Cabeza */}
      <ellipse cx="88" cy="62" rx="24" ry="20" fill={colors.mint} />
      <g style={{ transformOrigin: '94px 56px', animation: 'kid-blink 3.6s 0.4s infinite' }}>
        <circle cx="94" cy="56" r="5.5" fill="#fff" />
        <circle cx="95.5" cy="56.5" r="3" fill={ink} />
      </g>
      <path d="M86 70 Q96 78 106 68" stroke={ink} strokeWidth="3" fill="none" strokeLinecap="round" />
      <circle cx="104" cy="64" r="4" fill={colors.coral} opacity="0.55" />
      {/* Gorro de fiesta */}
      <g transform="rotate(14 86 42)">
        <path d="M74 44 L86 8 L98 44 Z" fill={colors.coral} />
        <circle cx="80" cy="34" r="2.6" fill={colors.sun} />
        <circle cx="90" cy="24" r="2.6" fill="#fff" />
        <circle cx="86" cy="7" r="5" fill={colors.sun} />
      </g>
      {/* Brazo que saluda */}
      <g style={{ transformOrigin: '72px 96px', animation: 'kid-wave 1.2s ease-in-out infinite' }}>
        <path d="M72 96 Q88 84 92 72" stroke={colors.mint} strokeWidth="9" fill="none" strokeLinecap="round" />
      </g>
    </Box>
  )
}

function Balloon({ color }: { color: string }) {
  return (
    <Box component="svg" viewBox="0 0 50 95" sx={{ width: '100%', display: 'block' }} aria-hidden="true">
      <path d="M25 58 C 22 66, 30 72, 25 80 S 22 90, 26 95" fill="none" stroke="rgba(43,45,66,0.45)" strokeWidth="1" />
      <ellipse cx="25" cy="28" rx="22" ry="27" fill={color} />
      <ellipse cx="17" cy="17" rx="5" ry="8" fill="#fff" opacity="0.5" transform="rotate(-20 17 17)" />
      <path d="M21 54 L29 54 L25 60 Z" fill={color} />
    </Box>
  )
}

/**
 * Plantilla infantil: el cumpleaños número 2 de Mateo.
 *
 * Entrada: sale el sol, entran las nubes, el arcoíris se dibuja, el "2" cae
 * rebotando, las letras brincan una por una, el dinosaurio se asoma y los
 * globos suben. En reposo: todo flota, el sol gira y parpadea, el "2" tiembla
 * como gelatina y cae confeti. Los globos se revientan al tocarlos.
 */
export function KidsBirthday({ still = false }: { still?: boolean }) {
  const scope = useRef<HTMLDivElement>(null)
  const [popped, setPopped] = useState<number[]>([])
  const [going, setGoing] = useState(false)
  const [mapOpen, setMapOpen] = useState(false)

  // Los globos reventados vuelven a aparecer después de un rato.
  useEffect(() => {
    if (popped.length === 0) return
    const id = window.setTimeout(() => setPopped((current) => current.slice(1)), 3500)
    return () => window.clearTimeout(id)
  }, [popped])

  useGSAP(
    () => {
      if (still) return
      const mm = gsap.matchMedia()
      mm.add(motionOk, () => {
        const title = SplitText.create('[data-kid-title]', { type: 'chars' })
        gsap
          .timeline({ defaults: { ease: 'back.out(1.8)' } })
          .from('[data-kid-sun]', { yPercent: 160, rotate: -120, duration: 1.1 })
          .from('[data-kid-cloud]', { xPercent: (i) => (i % 2 ? 300 : -300), duration: 1.2, stagger: 0.12, ease: 'power3.out' }, 0)
          .fromTo('.rainbow-arc', { strokeDasharray: 1, strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.1, stagger: 0.09, ease: 'power2.out' }, 0.3)
          .from('[data-kid-two]', { yPercent: -260, scale: 0.4, duration: 1.3, ease: 'bounce.out' }, 0.5)
          .to('[data-kid-two]', { scaleX: 1.25, scaleY: 0.75, duration: 0.12, yoyo: true, repeat: 1, ease: 'power1.inOut' }, 1.55)
          .from(title.chars, { yPercent: -180, rotate: () => gsap.utils.random(-40, 40), autoAlpha: 0, duration: 0.9, stagger: 0.06, ease: 'bounce.out' }, 0.8)
          .from('[data-kid-badge]', { scale: 0, rotate: -200, duration: 0.8 }, 1.4)
          .from('[data-kid-dino]', { yPercent: 110, duration: 0.9, ease: 'back.out(2.2)' }, 1.2)
          .from('[data-kid-card]', { scale: 0.4, rotate: -12, autoAlpha: 0, duration: 0.8 }, 1.5)
          .from('[data-kid-row]', { xPercent: -30, autoAlpha: 0, stagger: 0.1, duration: 0.5 }, 1.8)
          .from('[data-kid-cta]', { scale: 0, duration: 0.6, stagger: 0.1, ease: 'elastic.out(1, 0.5)' }, 2)
          .from('[data-kid-balloon]', { yPercent: 400, duration: 1.6, stagger: 0.15, ease: 'power2.out' }, 0.6)
      })
    },
    { scope, dependencies: [still] },
  )

  const pop = (event: MouseEvent<HTMLButtonElement>, id: number) => {
    const rect = event.currentTarget.getBoundingClientRect()
    burstConfetti({ x: rect.left + rect.width / 2, y: rect.top + rect.height * 0.3 }, 45, templateMeta.infantil.confetti)
    setPopped((current) => [...current, id])
  }

  const rsvp = (event: MouseEvent<HTMLButtonElement>) => {
    burstFromElement(event.currentTarget, 140, templateMeta.infantil.confetti)
    setGoing(true)
  }

  return (
    <InvitationFrame
      ref={scope}
      still={still}
      sx={{
        fontFamily: font,
        color: ink,
        background: `linear-gradient(180deg, ${colors.sky} 0%, #8FD8FF 55%, #C9EEFF 100%)`,
        '@keyframes kid-spin': { to: { transform: 'rotate(360deg)' } },
        '@keyframes kid-blink': { '0%, 92%, 100%': { transform: 'scaleY(1)' }, '95%': { transform: 'scaleY(0.1)' } },
        '@keyframes kid-wave': { '0%, 100%': { transform: 'rotate(0deg)' }, '50%': { transform: 'rotate(-28deg)' } },
        '@keyframes kid-drift': { from: { transform: 'translateX(-40cqi)' }, to: { transform: 'translateX(130cqi)' } },
        '@keyframes kid-bob': { '0%, 100%': { transform: 'translateY(0) rotate(-4deg)' }, '50%': { transform: 'translateY(-3cqi) rotate(4deg)' } },
        '@keyframes kid-jelly': {
          '0%, 100%': { transform: 'scale(1, 1)' },
          '30%': { transform: 'scale(1.08, 0.92)' },
          '45%': { transform: 'scale(0.94, 1.06)' },
          '60%': { transform: 'scale(1.03, 0.97)' },
        },
        '@keyframes kid-fall': { from: { transform: 'translateY(-10cqi) rotate(0deg)' }, to: { transform: 'translateY(190cqi) rotate(720deg)' } },
        '@keyframes kid-wiggle': { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-1.2cqi)' } },
      }}
    >
      {/* Confeti que cae */}
      <Box aria-hidden="true" sx={{ position: 'absolute', inset: 0, overflow: 'hidden' }}>
        {fallingConfetti.map((piece, i) => (
          <Box
            key={i}
            sx={{
              position: 'absolute',
              top: still ? `${(i * 37) % 95}%` : 0,
              left: `${piece.left}%`,
              width: piece.round ? '2cqi' : '1.4cqi',
              height: piece.round ? '2cqi' : '3cqi',
              borderRadius: piece.round ? '50%' : '0.5cqi',
              bgcolor: piece.color,
              opacity: 0.8,
              animation: `kid-fall ${piece.duration}s ${piece.delay}s linear infinite`,
            }}
          />
        ))}
      </Box>

      {/* Sol y nubes */}
      <Box data-kid-sun sx={{ position: 'absolute', top: '5cqi', right: '5cqi' }}>
        <Sun />
      </Box>
      {[
        { top: '9cqi', width: '28cqi', duration: 26, delay: -4 },
        { top: '30cqi', width: '20cqi', duration: 34, delay: -20 },
        { top: '50cqi', width: '24cqi', duration: 30, delay: -12 },
      ].map((cloud, i) => (
        <Box key={i} data-kid-cloud aria-hidden="true" sx={{ position: 'absolute', top: cloud.top, left: 0 }}>
          <Box sx={{ transform: still ? `translateX(${10 + i * 30}cqi)` : undefined, animation: `kid-drift ${cloud.duration}s ${cloud.delay}s linear infinite` }}>
            <Cloud width={cloud.width} />
          </Box>
        </Box>
      ))}

      {/* Globos que se revientan */}
      {balloonsSeed.map((balloon) => (
        <Box key={balloon.id} data-kid-balloon sx={{ position: 'absolute', left: `${balloon.left}%`, top: `${balloon.top}%`, width: '12cqi', zIndex: 3 }}>
          <AnimatePresence>
            {!popped.includes(balloon.id) && (
              <Box
                component={motion.button}
                type="button"
                aria-label="Reventar globo"
                onClick={(event: MouseEvent<HTMLButtonElement>) => pop(event, balloon.id)}
                // En la versión fija (PDF) ya aparecen inflados: no hay tiempo de animar.
                initial={still ? false : { scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 1.6, opacity: 0, transition: { duration: 0.15 } }}
                whileHover={{ scale: 1.12 }}
                transition={{ type: 'spring', stiffness: 300, damping: 14 }}
                sx={{ display: 'block', width: '100%', p: 0, border: 0, bgcolor: 'transparent', cursor: 'pointer' }}
              >
                <Box sx={{ animation: `kid-bob 3.4s ${balloon.delay}s ease-in-out infinite` }}>
                  <Balloon color={balloon.color} />
                </Box>
              </Box>
            )}
          </AnimatePresence>
        </Box>
      ))}

      {/* Contenido */}
      <Box sx={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', px: '7cqi', pt: '30cqi', pb: '7cqi' }}>
        <Box
          data-kid-title
          sx={{
            fontWeight: 700,
            fontSize: '10.5cqi',
            color: colors.coral,
            lineHeight: 1,
            letterSpacing: '-0.01em',
            paintOrder: 'stroke fill',
            WebkitTextStroke: '1.6cqi #fff',
            filter: 'drop-shadow(0 1cqi 0 rgba(43,45,66,0.18))',
            '& > div': { display: 'inline-block' },
            ...Object.fromEntries(letterColors.map((color, i) => [`& > div:nth-of-type(6n + ${i + 1})`, { color }])),
          }}
        >
          ¡Mateo cumple
        </Box>

        <Box sx={{ position: 'relative', width: '72cqi', height: '50cqi', mt: '1cqi', display: 'grid', placeItems: 'end center' }}>
          <Box component="svg" viewBox="0 0 200 110" sx={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} aria-hidden="true">
            {rainbow.map((color, i) => (
              <path key={color} className="rainbow-arc" pathLength={1} d={`M${10 + i * 9} 110 A ${90 - i * 9} ${90 - i * 9} 0 0 1 ${190 - i * 9} 110`} fill="none" stroke={color} strokeWidth="9" strokeLinecap="round" />
            ))}
          </Box>
          <Box data-kid-two sx={{ position: 'relative', transformOrigin: '50% 100%' }}>
            <Box
              sx={{
                fontWeight: 700,
                fontSize: '58cqi',
                lineHeight: 0.8,
                color: '#fff',
                textShadow: `0.8cqi 0.8cqi 0 ${colors.coral}, 1.6cqi 1.6cqi 0 ${colors.orange}, 2.4cqi 2.4cqi 0 ${colors.grape}, 3cqi 3.6cqi 2cqi rgba(43,45,66,0.25)`,
                animation: 'kid-jelly 2.6s 2.4s ease-in-out infinite',
                transformOrigin: '50% 100%',
              }}
            >
              2
            </Box>
          </Box>
          <Box
            data-kid-badge
            sx={{ position: 'absolute', right: '2cqi', bottom: '6cqi', bgcolor: colors.grape, color: '#fff', fontWeight: 700, fontSize: '5cqi', px: '3cqi', py: '1cqi', borderRadius: 99, rotate: '-10deg', boxShadow: '0 1cqi 0 #6C3FB5' }}
          >
            ¡años!
          </Box>
        </Box>

        <Box
          data-kid-card
          sx={{ position: 'relative', mt: '5cqi', width: '100%', bgcolor: '#fff', borderRadius: '6cqi', border: `0.8cqi dashed ${colors.grape}`, p: '4.5cqi', display: 'grid', gap: '2.4cqi', textAlign: 'left', boxShadow: '0 2cqi 0 rgba(43,45,66,0.12)' }}
        >
          {/* Dinosaurio sentado en el borde de la tarjeta, asomándose */}
          <Box data-kid-dino aria-hidden="true" sx={{ position: 'absolute', left: '-4cqi', top: '-17cqi', width: '22cqi', zIndex: 3, pointerEvents: 'none' }}>
            <Dino />
          </Box>
          {[
            { icon: <EventRoundedIcon />, color: colors.coral, title: 'Sábado 6 de marzo', text: '4:00 a 8:00 pm' },
            { icon: <PlaceRoundedIcon />, color: colors.sky, title: 'Jardín Arcoíris', text: 'Coyoacán, CDMX' },
            { icon: <CelebrationRoundedIcon />, color: colors.mint, title: 'Brincolín, piñata y pastel', text: '¡Ven con ropa cómoda!' },
          ].map((row) => (
            <Box key={row.title} data-kid-row sx={{ display: 'flex', alignItems: 'center', gap: '3cqi' }}>
              <Box sx={{ flexShrink: 0, width: '10cqi', height: '10cqi', borderRadius: '3cqi', bgcolor: row.color, color: '#fff', display: 'grid', placeItems: 'center', '& svg': { fontSize: '6cqi' }, animation: 'kid-wiggle 2s ease-in-out infinite' }}>
                {row.icon}
              </Box>
              <Box>
                <Box sx={{ fontWeight: 700, fontSize: '4.6cqi', lineHeight: 1.15 }}>{row.title}</Box>
                <Box sx={{ fontSize: '3.6cqi', color: 'rgba(43,45,66,0.7)' }}>{row.text}</Box>
              </Box>
            </Box>
          ))}
        </Box>

        <Box sx={{ mt: 'auto', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '3cqi', width: '100%' }}>
          <Box
            data-kid-cta
            component={motion.button}
            type="button"
            onClick={rsvp}
            whileHover={{ scale: 1.06, rotate: -2 }}
            whileTap={{ scale: 0.92, y: 4 }}
            aria-live="polite"
            sx={{ border: 0, cursor: 'pointer', fontFamily: font, fontWeight: 700, fontSize: '5cqi', minHeight: 44, py: '3cqi', borderRadius: 99, bgcolor: going ? colors.mint : colors.sun, color: ink, boxShadow: `0 1.4cqi 0 ${going ? '#2FBF84' : colors.orange}`, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5cqi' }}
          >
            <CakeRoundedIcon sx={{ fontSize: '1.1em' }} />
            {going ? '¡Te esperamos!' : '¡Sí voy!'}
          </Box>
          <Box
            data-kid-cta
            component={motion.button}
            type="button"
            onClick={() => setMapOpen(true)}
            whileHover={{ scale: 1.06, rotate: 2 }}
            whileTap={{ scale: 0.92, y: 4 }}
            sx={{ border: 0, cursor: 'pointer', fontFamily: font, fontWeight: 700, fontSize: '5cqi', minHeight: 44, py: '3cqi', borderRadius: 99, bgcolor: colors.grape, color: '#fff', boxShadow: '0 1.4cqi 0 #6C3FB5' }}
          >
            Ver mapa
          </Box>
        </Box>
      </Box>

      <LocationSheet
        open={mapOpen}
        onClose={() => setMapOpen(false)}
        place="Jardín Arcoíris"
        address="Coyoacán, Ciudad de México"
        fontFamily={font}
        colors={{ surface: '#fff', ink, accent: colors.coral, map: '#C8F7DF', road: '#fff' }}
      />
    </InvitationFrame>
  )
}
