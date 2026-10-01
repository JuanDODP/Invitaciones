import type { ReactNode } from 'react'
import Box from '@mui/material/Box'
import { brand, warmShadow } from '@/utils'

interface PhoneFrameProps {
  children: ReactNode
}

/** Marco de teléfono minimalista: bisel, isla y sombra cálida. */
export function PhoneFrame({ children }: PhoneFrameProps) {
  return (
    <Box
      sx={{
        position: 'relative',
        width: '100%',
        p: '3.5%',
        borderRadius: '48px',
        bgcolor: brand.cassis,
        boxShadow: `${warmShadow.lg}, inset 0 0 0 1.5px rgba(255,255,255,0.08)`,
      }}
    >
      <Box
        aria-hidden="true"
        sx={{
          position: 'absolute',
          top: '4.6%',
          left: '50%',
          translate: '-50% 0',
          width: '28%',
          height: '3.4%',
          borderRadius: 99,
          bgcolor: brand.cassis,
          zIndex: 3,
        }}
      />
      <Box sx={{ position: 'relative', borderRadius: '38px', overflow: 'hidden' }}>{children}</Box>
    </Box>
  )
}
