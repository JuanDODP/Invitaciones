import Box from '@mui/material/Box'
import CloseRoundedIcon from '@mui/icons-material/CloseRounded'
import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded'
import { AnimatePresence, motion } from 'motion/react'

interface LocationSheetProps {
  open: boolean
  onClose: () => void
  place: string
  address: string
  colors: { surface: string; ink: string; accent: string; map: string; road: string }
  fontFamily: string
}

/**
 * Hoja que sube desde abajo dentro de la invitación con un mapa ilustrado
 * y un pin que cae con rebote. Cada plantilla la viste con sus colores.
 */
export function LocationSheet({ open, onClose, place, address, colors, fontFamily }: LocationSheetProps) {
  return (
    <AnimatePresence>
      {open && (
        <Box
          component={motion.div}
          role="dialog"
          aria-label={`Ubicación: ${place}`}
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          exit={{ y: '100%' }}
          transition={{ type: 'spring', stiffness: 260, damping: 30 }}
          sx={{
            position: 'absolute',
            insetInline: 0,
            bottom: 0,
            zIndex: 20,
            bgcolor: colors.surface,
            color: colors.ink,
            borderRadius: '7cqi 7cqi 0 0',
            p: '6cqi',
            boxShadow: '0 -20px 60px rgba(0,0,0,0.35)',
          }}
        >
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', mb: '4cqi' }}>
            <Box>
              <Box sx={{ fontFamily, fontWeight: 700, fontSize: '6cqi', lineHeight: 1.1 }}>{place}</Box>
              <Box sx={{ fontSize: '3.6cqi', opacity: 0.75, mt: '1cqi' }}>{address}</Box>
            </Box>
            <Box
              component="button"
              type="button"
              onClick={onClose}
              aria-label="Cerrar ubicación"
              sx={{ flexShrink: 0, border: 0, cursor: 'pointer', width: 40, height: 40, borderRadius: '50%', display: 'grid', placeItems: 'center', bgcolor: 'rgba(127,127,127,0.18)', color: 'inherit' }}
            >
              <CloseRoundedIcon fontSize="small" />
            </Box>
          </Box>
          <Box sx={{ position: 'relative', borderRadius: '4cqi', overflow: 'hidden', bgcolor: colors.map, aspectRatio: '16 / 9' }}>
            <svg viewBox="0 0 160 90" width="100%" height="100%" aria-hidden="true">
              <path d="M-5 60 C 40 50, 70 75, 165 40" stroke={colors.road} strokeWidth="7" fill="none" />
              <path d="M70 -5 C 75 30, 60 60, 85 95" stroke={colors.road} strokeWidth="5" fill="none" />
              <path d="M-5 20 L165 28" stroke={colors.road} strokeWidth="3" fill="none" opacity="0.7" />
              <circle cx="120" cy="20" r="10" fill={colors.road} opacity="0.35" />
            </svg>
            <Box
              component={motion.div}
              initial={{ y: -60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 300, damping: 12, delay: 0.25 }}
              sx={{ position: 'absolute', left: '50%', top: '30%', translate: '-50% -50%', color: colors.accent, filter: 'drop-shadow(0 6px 6px rgba(0,0,0,0.3))' }}
            >
              <PlaceRoundedIcon sx={{ fontSize: '12cqi' }} />
            </Box>
          </Box>
        </Box>
      )}
    </AnimatePresence>
  )
}
