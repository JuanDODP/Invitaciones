import type { ReactNode } from 'react'
import Box from '@mui/material/Box'
import { AnimatePresence, motion } from 'motion/react'
import { duration, easing, fontFamily } from '@/utils'
import type { InvitationTemplate } from '../utils'
import { Decor, RingsOrnament } from './Decor'

interface InvitationCardProps {
  template: InvitationTemplate
  /** Botones interactivos al pie (RSVP, mesa…). */
  actions?: ReactNode
  /** Capa libre encima del contenido (stickers, hojas, chips). */
  overlay?: ReactNode
  aspectRatio?: string
  radius?: number
}

/** Tamaño del título según su longitud: números grandes, nombres largos más chicos. */
const titleSize = (title: string) =>
  title.length <= 3 ? '44cqi' : `${Math.min(17, Math.round(150 / title.length))}cqi`

/**
 * Invitación de muestra. Escala con su contenedor (container queries), así
 * que la misma pieza sirve en el teléfono del hero, el editor y la galería.
 *
 * Al cambiar de plantilla: el color de fondo se interpola y el contenido
 * hace cross-fade, sin desmontar la tarjeta.
 */
export function InvitationCard({ template, actions, overlay, aspectRatio = '9 / 16', radius = 24 }: InvitationCardProps) {
  const { colors, type } = template
  const transition = { duration: duration.slow * 1.5, ease: easing.out }

  return (
    <Box
      component={motion.div}
      initial={false}
      animate={{ backgroundColor: colors.background, color: colors.ink }}
      transition={transition}
      sx={{
        position: 'relative',
        overflow: 'hidden',
        isolation: 'isolate',
        containerType: 'inline-size',
        aspectRatio,
        width: '100%',
        borderRadius: `${radius}px`,
      }}
    >
      <AnimatePresence initial={false}>
        <Box
          key={`${template.id}-decor`}
          component={motion.div}
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.04 }}
          transition={transition}
          sx={{ position: 'absolute', inset: 0 }}
        >
          <Decor kind={template.decor} accent={colors.accent} ink={colors.ink} />
        </Box>
      </AnimatePresence>

      <AnimatePresence mode="popLayout" initial={false}>
        <Box
          key={template.id}
          component={motion.div}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: duration.slow, ease: easing.out }}
          sx={{
            position: 'relative',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            gap: '3cqi',
            px: '9cqi',
            pt: '14cqi',
            pb: actions ? '6cqi' : '14cqi',
          }}
        >
          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '3cqi' }}>
            {template.decor === 'rings' && <RingsOrnament color={colors.accent} />}
            <Box sx={{ fontSize: '4.6cqi', fontWeight: 600, color: colors.muted, letterSpacing: '0.04em' }}>
              {template.eyebrow}
            </Box>
            <Box
              sx={{
                fontFamily: fontFamily.display,
                fontSize: titleSize(template.title),
                fontWeight: type.weight,
                fontStyle: type.italic ? 'italic' : 'normal',
                letterSpacing: type.tracking,
                textTransform: type.uppercase ? 'uppercase' : 'none',
                lineHeight: 0.95,
                textWrap: 'balance',
              }}
            >
              {template.title}
            </Box>
            <Box sx={{ width: '14cqi', height: '0.6cqi', borderRadius: 9, bgcolor: colors.accent, my: '2cqi' }} />
            <Box sx={{ fontSize: '4.6cqi', fontWeight: 600 }}>{template.date}</Box>
            <Box sx={{ fontSize: '4.2cqi', color: colors.muted }}>{template.place}</Box>
          </Box>
          {actions && <Box sx={{ width: '100%', display: 'grid', gap: '2.5cqi' }}>{actions}</Box>}
        </Box>
      </AnimatePresence>

      {overlay}
    </Box>
  )
}
