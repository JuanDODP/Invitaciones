import { Link as RouterLink } from 'react-router'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import { brand, fontFamily } from '@/utils'

const sections = [
  { href: '#creador', label: 'Creador' },
  { href: '#logistica', label: 'Logística y QR' },
  { href: '#para-quien', label: 'Para quién' },
  { href: '#plantillas', label: 'Plantillas' },
]

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
        sx={{ fontFamily: fontFamily.display, fontWeight: 800, fontSize: '1.25rem', letterSpacing: '-0.03em', color: inverted ? brand.white : brand.cassis }}
      >
        Invitaciones
      </Box>
    </Box>
  )
}

export function SiteHeader() {
  return (
    <Box
      component="header"
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 10,
        backdropFilter: 'saturate(1.4) blur(14px)',
        bgcolor: 'rgba(252, 250, 246, 0.78)',
        borderBottom: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Box
        component="nav"
        aria-label="Principal"
        sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, md: 4 }, height: 68, display: 'flex', alignItems: 'center', gap: 4 }}
      >
        <Link component={RouterLink} to="/" underline="none" aria-label="Invitaciones, inicio">
          <BrandMark />
        </Link>
        <Box component="ul" sx={{ display: { xs: 'none', md: 'flex' }, gap: 3, m: 0, p: 0, listStyle: 'none', flex: 1 }}>
          {sections.map((section) => (
            <li key={section.href}>
              <Link
                href={section.href}
                underline="none"
                sx={{
                  color: 'text.secondary',
                  fontWeight: 500,
                  fontSize: '0.9375rem',
                  transition: 'color 160ms',
                  '&:hover': { color: 'text.primary' },
                }}
              >
                {section.label}
              </Link>
            </li>
          ))}
        </Box>
        <Button component={RouterLink} to="/editor" variant="contained" sx={{ ml: { xs: 'auto', md: 0 }, whiteSpace: 'nowrap' }}>
          <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
            Diseñar mi invitación
          </Box>
          <Box component="span" sx={{ display: { sm: 'none' } }}>
            Diseñar
          </Box>
        </Button>
      </Box>
    </Box>
  )
}
