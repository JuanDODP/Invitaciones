import type { ReactNode, Ref } from 'react'
import Box from '@mui/material/Box'
import type { SxProps, Theme } from '@mui/material/styles'

interface InvitationFrameProps {
  children: ReactNode
  /** Versión fija (para el PDF): sin animaciones ni transiciones CSS. */
  still?: boolean
  sx?: SxProps<Theme>
  ref?: Ref<HTMLDivElement>
}

/**
 * Lienzo común de las invitaciones: proporción 9:16 y "container queries",
 * así que todo dentro se mide en `cqi` y la invitación escala igual en el
 * escenario, en un teléfono o en el PDF.
 */
export function InvitationFrame({ children, still = false, sx, ref }: InvitationFrameProps) {
  return (
    <Box
      ref={ref}
      sx={[
        {
          position: 'relative',
          width: '100%',
          aspectRatio: '9 / 16',
          overflow: 'hidden',
          isolation: 'isolate',
          containerType: 'inline-size',
          userSelect: 'none',
          '@media (prefers-reduced-motion: reduce)': { '& *': { animation: 'none !important' } },
        },
        still && { '& *, & *::before, & *::after': { animation: 'none !important', transition: 'none !important' } },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    >
      {children}
    </Box>
  )
}
