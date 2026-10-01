import Box from '@mui/material/Box'
import { brand, fontFamily } from '@/utils'

/** Marca: tres "confetis" que forman una chispa + el nombre. */
export function BrandMark({ inverted = false }: { inverted?: boolean }) {
  return (
    <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}>
      <svg width="28" height="28" viewBox="0 0 28 28" aria-hidden="true">
        <rect x="3" y="11" width="12" height="6" rx="3" fill={brand.coral} transform="rotate(-35 9 14)" />
        <rect x="12" y="5" width="12" height="6" rx="3" fill={brand.amber} transform="rotate(20 18 8)" />
        <circle cx="19" cy="20" r="4" fill={brand.violet} />
      </svg>
      <Box
        component="span"
        sx={{
          fontFamily: fontFamily.display,
          fontWeight: 800,
          fontSize: '1.25rem',
          letterSpacing: '-0.03em',
          color: inverted ? brand.white : 'var(--header-ink, #1E1822)',
          transition: 'color 300ms',
        }}
      >
        Invitaciones
      </Box>
    </Box>
  )
}
