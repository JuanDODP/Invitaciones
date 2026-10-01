import type { ReactNode } from 'react'
import Box from '@mui/material/Box'
import { brand } from '@/utils'

interface GradientTextProps {
  children: ReactNode
  /** `night`: coral → ámbar, para fondos oscuros donde esos colores brillan. */
  tone?: 'day' | 'night'
}

const gradients = {
  day: `linear-gradient(100deg, #D23D3A 0%, ${brand.coral} 25%, #C2348F 50%, ${brand.violet} 75%, #D23D3A 100%)`,
  night: `linear-gradient(100deg, ${brand.coral} 0%, #FF8FA3 25%, ${brand.amber} 50%, #FF8FA3 75%, ${brand.coral} 100%)`,
}

/**
 * Texto con el gradiente firma (coral → violeta) que fluye lentamente.
 * Animación solo de `background-position` en CSS: barata y sin JS.
 * De día, el gradiente se oscurece en los extremos para mantener contraste sobre crema.
 */
export function GradientText({ children, tone = 'day' }: GradientTextProps) {
  return (
    <Box
      component="span"
      sx={{
        backgroundImage: gradients[tone],
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
        // SplitText envuelve cada palabra en su propio elemento animado: el
        // gradiente recortado al texto no llega a ellos, así que lo heredan.
        '& *': {
          backgroundImage: 'inherit',
          backgroundSize: 'inherit',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          color: 'transparent',
          animation: 'inherit',
        },
        '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
      }}
    >
      {children}
    </Box>
  )
}
