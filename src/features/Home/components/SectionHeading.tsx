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

export function SectionHeading({ id, title, lede, align = 'left', inverted = false }: SectionHeadingProps) {
  return (
    <Box data-reveal sx={{ maxWidth: 720, mx: align === 'center' ? 'auto' : 0, textAlign: align, mb: { xs: 5, md: 7 } }}>
      <Typography id={id} variant="h2" sx={{ fontSize: 'clamp(2rem, 4.2vw, 3.4rem)', mb: 2, textWrap: 'balance' }}>
        {title}
      </Typography>
      <Typography
        sx={{
          fontSize: { xs: '1.0625rem', md: '1.125rem' },
          lineHeight: 1.6,
          color: inverted ? 'rgba(255,255,255,0.82)' : 'text.secondary',
          maxWidth: '38em',
          mx: align === 'center' ? 'auto' : 0,
        }}
      >
        {lede}
      </Typography>
    </Box>
  )
}
