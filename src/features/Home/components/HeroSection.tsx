import { useRef, useState, type MouseEvent } from 'react'
import { Link as RouterLink } from 'react-router'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import QrCode2RoundedIcon from '@mui/icons-material/QrCode2Rounded'
import StarRoundedIcon from '@mui/icons-material/StarRounded'
import { AnimatePresence, motion } from 'motion/react'
import { brand, spring } from '@/utils'
import { gsap, motionOk, useGSAP } from '@/utils/gsap'
import { usePointerTilt } from '../hooks'
import { burstFromElement, templates } from '../utils'
import { GradientText } from './GradientText'
import { InvitationCard } from './InvitationCard'
import { PhoneFrame } from './PhoneFrame'

const heroTemplate = templates[0]
const { colors } = heroTemplate

/** Botón dentro de la invitación: hereda los colores de la plantilla. */
const InviteButton = motion.button

const inviteButtonSx = {
  appearance: 'none',
  border: 0,
  cursor: 'pointer',
  font: 'inherit',
  fontWeight: 700,
  fontSize: '4.4cqi',
  minHeight: 44,
  py: '3.2cqi',
  borderRadius: 99,
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '1.5cqi',
  '&:focus-visible': { outline: `2px solid ${brand.amber}`, outlineOffset: 2 },
} as const

function HeroPhone() {
  const [confirmed, setConfirmed] = useState(false)
  const [tableOpen, setTableOpen] = useState(false)

  const confirm = (event: MouseEvent<HTMLButtonElement>) => {
    if (!confirmed) burstFromElement(event.currentTarget, 70)
    setConfirmed(true)
  }

  return (
    <PhoneFrame>
      <InvitationCard
        template={heroTemplate}
        radius={0}
        actions={
          <>
            <Box
              component={InviteButton}
              type="button"
              onClick={confirm}
              whileTap={{ scale: 0.96 }}
              animate={{ backgroundColor: confirmed ? brand.mint : colors.accent }}
              aria-live="polite"
              sx={{ ...inviteButtonSx, color: brand.cassis }}
            >
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.span
                  key={confirmed ? 'done' : 'idle'}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
                >
                  {confirmed && <CheckRoundedIcon sx={{ fontSize: '1.15em' }} />}
                  {confirmed ? 'Asistencia confirmada' : 'Confirmar asistencia'}
                </motion.span>
              </AnimatePresence>
            </Box>
            <Box
              component={InviteButton}
              type="button"
              onClick={() => setTableOpen(true)}
              whileTap={{ scale: 0.96 }}
              aria-expanded={tableOpen}
              sx={{ ...inviteButtonSx, bgcolor: 'rgba(255,255,255,0.14)', color: brand.white, boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.3)' }}
            >
              Ver mi mesa
            </Box>
          </>
        }
        overlay={
          <AnimatePresence>
            {tableOpen && (
              <Box
                component={motion.div}
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                exit={{ y: '100%' }}
                transition={spring.smooth}
                role="dialog"
                aria-label="Tu mesa"
                sx={{
                  position: 'absolute',
                  insetInline: 0,
                  bottom: 0,
                  zIndex: 2,
                  bgcolor: brand.cream,
                  color: brand.cassis,
                  borderRadius: '7cqi 7cqi 0 0',
                  p: '7cqi',
                  display: 'grid',
                  gap: '3cqi',
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start' }}>
                  <Box>
                    <Box sx={{ fontSize: '4cqi', color: 'text.secondary', fontWeight: 600 }}>Tu lugar</Box>
                    <Box sx={{ fontSize: '11cqi', fontWeight: 800, fontFamily: 'Outfit Variable', lineHeight: 1 }}>Mesa 12</Box>
                  </Box>
                  <Box
                    component="button"
                    type="button"
                    onClick={() => setTableOpen(false)}
                    aria-label="Cerrar"
                    sx={{ border: 0, bgcolor: 'rgba(30,24,34,0.06)', borderRadius: 99, width: 36, height: 36, cursor: 'pointer', display: 'grid', placeItems: 'center' }}
                  >
                    <CloseRoundedIcon fontSize="small" />
                  </Box>
                </Box>
                <TableDiagram />
                <Box sx={{ fontSize: '4cqi', color: 'text.secondary' }}>Jardín norte, junto a la pista</Box>
              </Box>
            )}
          </AnimatePresence>
        }
      />
    </PhoneFrame>
  )
}

/** Mesa redonda con 8 lugares; el tuyo resaltado. */
function TableDiagram() {
  return (
    <svg viewBox="0 0 120 120" width="100%" style={{ maxHeight: 130 }} aria-hidden="true">
      <circle cx="60" cy="60" r="26" fill={brand.white} stroke="rgba(30,24,34,0.12)" />
      <text x="60" y="65" textAnchor="middle" fontSize="14" fontWeight="800" fill={brand.cassis}>12</text>
      {Array.from({ length: 8 }, (_, i) => {
        const angle = (i / 8) * Math.PI * 2 - Math.PI / 2
        const mine = i === 2
        return (
          <circle
            key={i}
            cx={60 + Math.cos(angle) * 42}
            cy={60 + Math.sin(angle) * 42}
            r={mine ? 9 : 7}
            fill={mine ? brand.coral : 'rgba(30,24,34,0.12)'}
          />
        )
      })}
    </svg>
  )
}

const badgeSx = {
  position: 'absolute',
  zIndex: 2,
  display: 'inline-flex',
  alignItems: 'center',
  gap: 1,
  px: 1.75,
  py: 1,
  borderRadius: 99,
  fontWeight: 700,
  fontSize: '0.875rem',
  whiteSpace: 'nowrap',
  boxShadow: '0 10px 30px -10px rgba(30,24,34,0.35)',
  cursor: 'default',
} as const

const badges = [
  {
    label: '48 confirmados hoy',
    icon: <CheckRoundedIcon fontSize="small" />,
    sx: { bgcolor: brand.mint, color: brand.cassis, top: { xs: '-3%', md: '8%' }, left: { xs: '-4%', md: '-34%' } },
  },
  {
    label: 'Plantilla destacada',
    icon: <StarRoundedIcon fontSize="small" />,
    sx: { bgcolor: brand.amber, color: brand.cassis, top: '44%', right: { xs: '-8%', md: '-30%' } },
  },
  {
    label: 'Mesa 12 asignada',
    icon: <QrCode2RoundedIcon fontSize="small" />,
    sx: { bgcolor: brand.violet, color: brand.white, bottom: { xs: '-3%', md: '34%' }, left: { xs: '-4%', md: '-38%' } },
  },
]

/** Capa decorativa del fondo: serpentinas y chispas con parallax. */
function HeroBackdrop() {
  return (
    <Box aria-hidden="true" sx={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: -1 }}>
      <Box sx={{ position: 'absolute', width: 620, height: 620, borderRadius: '50%', top: -200, right: -160, background: `radial-gradient(circle, ${brand.coral}38, transparent 65%)` }} />
      <Box sx={{ position: 'absolute', width: 560, height: 560, borderRadius: '50%', bottom: -260, left: -200, background: `radial-gradient(circle, ${brand.violet}26, transparent 65%)` }} />
      <Box data-parallax="0.5" sx={{ position: 'absolute', top: '6%', left: '38%', display: { xs: 'none', md: 'block' } }}>
        <svg width="90" height="40" viewBox="0 0 90 40"><path d="M2 30 C 15 0, 30 40, 45 14 S 75 30, 88 6" fill="none" stroke={brand.amber} strokeWidth="5" strokeLinecap="round" /></svg>
      </Box>
      <Box data-parallax="-0.4" sx={{ position: 'absolute', bottom: '12%', left: '6%' }}>
        <svg width="70" height="34" viewBox="0 0 70 34"><path d="M2 20 C 14 2, 24 32, 36 14 S 58 22, 68 4" fill="none" stroke={brand.mint} strokeWidth="5" strokeLinecap="round" /></svg>
      </Box>
      <Box data-parallax="0.8" sx={{ position: 'absolute', top: '88%', left: '34%', width: 14, height: 14, borderRadius: '50%', bgcolor: brand.coral }} />
      <Box data-parallax="0.3" sx={{ position: 'absolute', top: '10%', left: '8%', width: 10, height: 22, borderRadius: 4, bgcolor: brand.violet, rotate: '30deg' }} />
    </Box>
  )
}

export function HeroSection() {
  const scope = useRef<HTMLElement>(null)
  const tilt = usePointerTilt(9)

  // Una sola secuencia orquestada de entrada; después, flotación sutil en reposo.
  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(motionOk, () => {
        gsap
          .timeline({ defaults: { ease: 'expo.out' } })
          .from('[data-hero="line"]', { yPercent: 110, duration: 1.1, stagger: 0.09 })
          .from('[data-hero="copy"]', { y: 18, autoAlpha: 0, duration: 0.8, stagger: 0.08 }, 0.35)
          .from('[data-hero="phone"]', { y: 80, rotate: -5, autoAlpha: 0, duration: 1.3 }, 0.15)
          .from('[data-hero="badge"]', { scale: 0.3, autoAlpha: 0, duration: 0.7, stagger: 0.1, ease: 'back.out(2.2)' }, 0.8)

        gsap.to('[data-hero="float"]', { y: -12, duration: 3.2, ease: 'sine.inOut', yoyo: true, repeat: -1 })
        gsap.utils.toArray<SVGElement>('.float-piece').forEach((piece) => {
          gsap.to(piece, {
            x: gsap.utils.random(-2.5, 2.5),
            y: gsap.utils.random(-3.5, 3.5),
            rotation: gsap.utils.random(-25, 25),
            transformOrigin: '50% 50%',
            duration: gsap.utils.random(2.4, 4.2),
            ease: 'sine.inOut',
            yoyo: true,
            repeat: -1,
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
      aria-labelledby="hero-title"
      sx={{ position: 'relative', isolation: 'isolate', overflow: 'hidden' }}
    >
      <HeroBackdrop />
      <Box
        sx={{
          maxWidth: 1200,
          mx: 'auto',
          px: { xs: 2, md: 4 },
          pt: { xs: 6, md: 10 },
          pb: { xs: 10, md: 14 },
          display: 'grid',
          gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'minmax(0, 1fr) 340px' },
          alignItems: 'center',
          gap: { xs: 8, md: 6 },
        }}
      >
        <Box>
          <Typography
            id="hero-title"
            variant="h1"
            sx={{ fontSize: 'clamp(2.5rem, 5.6vw, 4.75rem)', mb: 3 }}
          >
            {[
              <>Invitaciones que</>,
              <GradientText>emocionan.</GradientText>,
              <>Organización que</>,
              <>hace <GradientText>sonreír.</GradientText></>,
            ].map((line, i) => (
              <Box key={i} component="span" sx={{ display: 'block', overflow: 'hidden', pb: '0.08em', mb: '-0.08em' }}>
                <Box component="span" data-hero="line" sx={{ display: 'block' }}>
                  {line}
                </Box>
              </Box>
            ))}
          </Typography>

          <Typography
            data-hero="copy"
            sx={{ fontSize: { xs: '1.0625rem', md: '1.1875rem' }, color: 'text.secondary', maxWidth: '34em', mb: 4.5, lineHeight: 1.6 }}
          >
            Crea una invitación animada en minutos, compártela por WhatsApp y recibe a cada invitado con un pase QR que
            ya sabe cuál es su mesa.
          </Typography>

          <Box data-hero="copy" sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
            <Button component={RouterLink} to="/editor" variant="contained" size="large">
              Diseñar mi invitación gratis
            </Button>
            <Button
              component={RouterLink}
              to="/dashboard"
              variant="outlined"
              color="tertiary"
              size="large"
              sx={{ borderWidth: 1.5, bgcolor: 'rgba(121,40,202,0.04)', '&:hover': { borderWidth: 1.5, bgcolor: 'rgba(121,40,202,0.08)' } }}
            >
              Ver demostración para salones
            </Button>
          </Box>
        </Box>

        <Box sx={{ position: 'relative', width: 'min(100%, 340px)', mx: 'auto', perspective: 1200 }}>
          <Box data-hero="phone">
            <Box data-hero="float">
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
            </Box>
          </Box>

          {badges.map((badge) => (
            <Box key={badge.label} data-hero="badge" sx={{ ...badgeSx, ...badge.sx, p: 0, bgcolor: 'transparent', boxShadow: 'none' }}>
              <Box
                component={motion.div}
                whileHover={{ scale: 1.08, rotate: -3 }}
                transition={spring.snappy}
                sx={{ ...badgeSx, position: 'static', bgcolor: badge.sx.bgcolor, color: badge.sx.color }}
              >
                {badge.icon}
                {badge.label}
              </Box>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  )
}
