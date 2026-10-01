import Box from '@mui/material/Box'
import { AnimatePresence, motion } from 'motion/react'
import { usePointerTilt } from '@/hooks'
import { templateMeta, type TemplateId } from '../utils'
import { invitationComponents } from './templates'

interface InvitationShowcaseProps {
  templateId: TemplateId
  /** Cambia para volver a reproducir la animación de entrada. */
  replayKey: number
}

/**
 * Escenario de la invitación: flota con inclinación 3D al mover el ratón,
 * lleva un halo del color de la plantilla y, al cambiar de plantilla, la
 * tarjeta "voltea" como una carta.
 */
export function InvitationShowcase({ templateId, replayKey }: InvitationShowcaseProps) {
  const tilt = usePointerTilt(8)
  const Template = invitationComponents[templateId]
  const meta = templateMeta[templateId]

  return (
    <Box sx={{ position: 'relative', width: 'min(100%, 430px, calc((100svh - 120px) * 0.5625))', minWidth: { xs: 0, sm: 300 }, mx: 'auto', perspective: 1600 }}>
      {/* Halo */}
      <Box
        component={motion.div}
        aria-hidden="true"
        animate={{ background: `radial-gradient(closest-side, ${meta.glow}, transparent)` }}
        transition={{ duration: 0.8 }}
        // pointer-events: none — el halo sobresale 18% y en móvil quedaba encima del selector de plantillas.
        sx={{ position: 'absolute', inset: '-18%', zIndex: 0, pointerEvents: 'none', filter: 'blur(20px)', animation: 'showcase-breathe 5s ease-in-out infinite', '@keyframes showcase-breathe': { '0%, 100%': { transform: 'scale(1)' }, '50%': { transform: 'scale(1.08)' } } }}
      />

      <Box
        component={motion.div}
        {...tilt.handlers}
        style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY, transformStyle: 'preserve-3d' }}
        sx={{ position: 'relative', zIndex: 1 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <Box
            key={`${templateId}-${replayKey}`}
            component={motion.div}
            initial={{ rotateY: 80, scale: 0.85, opacity: 0 }}
            animate={{ rotateY: 0, scale: 1, opacity: 1 }}
            exit={{ rotateY: -80, scale: 0.85, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 140, damping: 20 }}
            sx={{ borderRadius: '28px', overflow: 'hidden', boxShadow: '0 40px 90px -30px rgba(0,0,0,0.55), 0 0 0 1px rgba(255,255,255,0.06)' }}
          >
            <Template />
          </Box>
        </AnimatePresence>

        <Box
          component={motion.div}
          aria-hidden="true"
          style={{ background: tilt.glare }}
          sx={{ position: 'absolute', inset: 0, borderRadius: '28px', pointerEvents: 'none', mixBlendMode: 'soft-light', zIndex: 2 }}
        />
      </Box>
    </Box>
  )
}
