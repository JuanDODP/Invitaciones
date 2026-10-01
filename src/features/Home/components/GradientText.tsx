import type { ReactNode } from 'react'
import Box from '@mui/material/Box'
import { brand } from '@/utils'

interface GradientTextProps {
  children: ReactNode
}

/**
 * Texto con el gradiente firma (coral → violeta) que fluye lentamente.
 * Animación solo de `background-position` en CSS: barata y sin JS.
 * El gradiente se oscurece en los extremos para mantener contraste sobre crema.
 */
export function GradientText({ children }: GradientTextProps) {
  return (
    <Box
      component="span"
      sx={{
        backgroundImage: `linear-gradient(100deg, #D23D3A 0%, ${brand.coral} 25%, #C2348F 50%, ${brand.violet} 75%, #D23D3A 100%)`,
        backgroundSize: '200% 100%',
        backgroundClip: 'text',
        WebkitBackgroundClip: 'text',
        color: 'transparent',
        WebkitBoxDecorationBreak: 'clone',
        boxDecorationBreak: 'clone',
        animation: 'home-gradient-flow 8s linear infinite',
        '@keyframes home-gradient-flow': {
          from: { backgroundPosition: '0% 50%' },
          to: { backgroundPosition: '-200% 50%' },
        },
        '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
      }}
    >
      {children}
    </Box>
  )
}
