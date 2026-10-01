import type { ReactNode } from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

interface SectionHeadingProps {
  id: string
  title: ReactNode
  lede: ReactNode
  align?: 'left' | 'center'
  inverted?: boolean
}

/** Título de sección: se arma palabra por palabra (`data-split`) y el texto de apoyo aparece después. */
export function SectionHeading({ id, title, lede, align = 'left', inverted = false }: SectionHeadingProps) {
  return (
    <Box sx={{ maxWidth: 760, mx: align === 'center' ? 'auto' : 0, textAlign: align, mb: { xs: 5, md: 7 } }}>
      <Typography
        id={id}
        variant="h2"
        data-split
        sx={{ fontSize: 'clamp(2.1rem, 5vw, 4rem)', mb: 2.5, textWrap: 'balance', color: inverted ? 'common.white' : 'text.primary' }}
      >
        {title}
      </Typography>
      <Typography
        data-reveal
        sx={{
          fontSize: { xs: '1.0625rem', md: '1.1875rem' },
          lineHeight: 1.6,
          color: inverted ? 'rgba(255,255,255,0.78)' : 'text.secondary',
          maxWidth: '38em',
          mx: align === 'center' ? 'auto' : 0,
        }}
      >
        {lede}
      </Typography>
    </Box>
  )
}
