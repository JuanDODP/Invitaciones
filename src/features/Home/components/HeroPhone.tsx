import { useState, type MouseEvent } from 'react'
import Box from '@mui/material/Box'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import { AnimatePresence, motion } from 'motion/react'
import { brand, burstFromElement, fontFamily, spring } from '@/utils'
import { templates } from '../utils'
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

/** Teléfono del hero con una invitación viva: confirmar asistencia (con confetti) y ver la mesa. */
export function HeroPhone() {
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
                    <Box sx={{ fontSize: '11cqi', fontWeight: 800, fontFamily: fontFamily.display, lineHeight: 1 }}>Mesa 12</Box>
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
