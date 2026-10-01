import Box from '@mui/material/Box'
import { AnimatePresence, motion } from 'motion/react'

interface FlipNumberProps {
  value: number
  digits?: number
}

/** Número que "voltea" cada dígito al cambiar (para cuentas regresivas). */
export function FlipNumber({ value, digits = 2 }: FlipNumberProps) {
  const text = String(value).padStart(digits, '0')
  return (
    <Box component="span" sx={{ display: 'inline-flex', fontVariantNumeric: 'tabular-nums' }}>
      {text.split('').map((digit, i) => (
        <Box key={i} component="span" sx={{ position: 'relative', display: 'inline-block', overflow: 'hidden', height: '1.1em', lineHeight: 1.1 }}>
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={digit}
              initial={{ y: '-100%', opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: '100%', opacity: 0 }}
              transition={{ type: 'spring', stiffness: 420, damping: 30 }}
              style={{ display: 'inline-block' }}
            >
              {digit}
            </motion.span>
          </AnimatePresence>
        </Box>
      ))}
    </Box>
  )
}
