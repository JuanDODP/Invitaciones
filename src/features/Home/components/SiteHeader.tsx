import { useState } from 'react'
import { Link as RouterLink } from 'react-router'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import { AnimatePresence, motion } from 'motion/react'
import { brand, fontFamily, spring } from '@/utils'
import { HEADER_HEIGHT, scrollToSection } from '../utils'

const sections = [
  { href: '#como-funciona', label: 'Cómo funciona' },
  { href: '#creador', label: 'Creador' },
  { href: '#logistica', label: 'Logística y QR' },
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

/** Hamburguesa que se transforma en X. */
function MenuIcon({ open }: { open: boolean }) {
  return (
    <Box component="span" aria-hidden="true" sx={{ position: 'relative', width: 22, height: 14, display: 'block' }}>
      {[0, 1, 2].map((line) => (
        <Box
          key={line}
          component={motion.span}
          animate={
            open
              ? { top: 6, rotate: line === 1 ? 0 : line === 0 ? 45 : -45, opacity: line === 1 ? 0 : 1 }
              : { top: line * 6, rotate: 0, opacity: 1 }
          }
          transition={spring.snappy}
          sx={{ position: 'absolute', left: 0, right: 0, height: 2, borderRadius: 2, bgcolor: 'currentColor' }}
        />
      ))}
    </Box>
  )
}

/**
 * Encabezado fijo. Cambia de tono según la sección que tiene debajo:
 * `html[data-header-tone="night"]` (lo activan las secciones oscuras).
 * En móvil, el menú se abre a pantalla completa con los enlaces escalonados.
 */
export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)

  const go = (href: string) => {
    setMenuOpen(false)
    scrollToSection(href)
  }

  return (
    <Box
      component="header"
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1200,
        '--header-ink': brand.cassis,
        '--header-muted': 'rgba(30,24,34,0.68)',
        backdropFilter: 'saturate(1.4) blur(14px)',
        bgcolor: 'rgba(252, 250, 246, 0.72)',
        borderBottom: '1px solid rgba(30,24,34,0.06)',
        transition: 'background-color 300ms, border-color 300ms',
        'html[data-header-tone="night"] &': {
          '--header-ink': brand.white,
          '--header-muted': 'rgba(255,255,255,0.75)',
          bgcolor: 'rgba(30, 24, 34, 0.55)',
          borderColor: 'rgba(255,255,255,0.08)',
        },
      }}
    >
      <Box
        component="nav"
        aria-label="Principal"
        sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, md: 4 }, height: HEADER_HEIGHT, display: 'flex', alignItems: 'center', gap: 4 }}
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
                onClick={(event) => {
                  event.preventDefault()
                  go(section.href)
                }}
                sx={{
                  position: 'relative',
                  color: 'var(--header-muted)',
                  fontWeight: 500,
                  fontSize: '0.9375rem',
                  transition: 'color 200ms',
                  // Subrayado que crece desde el centro.
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: -4,
                    height: 2,
                    borderRadius: 2,
                    bgcolor: brand.coral,
                    transform: 'scaleX(0)',
                    transition: 'transform 250ms cubic-bezier(0.23, 1, 0.32, 1)',
                  },
                  '&:hover': { color: 'var(--header-ink)' },
                  '&:hover::after': { transform: 'scaleX(1)' },
                }}
              >
                {section.label}
              </Link>
            </li>
          ))}
        </Box>
        <Button component={RouterLink} to="/editor" variant="contained" sx={{ ml: { xs: 'auto', md: 0 }, whiteSpace: 'nowrap', minHeight: 40 }}>
          <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
            Diseñar mi invitación
          </Box>
          <Box component="span" sx={{ display: { sm: 'none' } }}>
            Diseñar
          </Box>
        </Button>
        <IconButton
          onClick={() => setMenuOpen((open) => !open)}
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
          aria-controls="menu-movil"
          sx={{ display: { md: 'none' }, color: 'var(--header-ink)', width: 44, height: 44, ml: -1 }}
        >
          <MenuIcon open={menuOpen} />
        </IconButton>
      </Box>

      <AnimatePresence>
        {menuOpen && (
          <Box
            id="menu-movil"
            component={motion.div}
            initial={{ clipPath: 'circle(0% at 92% 0%)' }}
            animate={{ clipPath: 'circle(150% at 92% 0%)' }}
            exit={{ clipPath: 'circle(0% at 92% 0%)', transition: { duration: 0.35 } }}
            transition={{ duration: 0.6, ease: [0.77, 0, 0.175, 1] }}
            sx={{
              position: 'fixed',
              inset: `${HEADER_HEIGHT}px 0 0 0`,
              bgcolor: brand.cassis,
              display: { md: 'none' },
              px: 3,
              py: 5,
            }}
          >
            <Box component="ul" sx={{ listStyle: 'none', m: 0, p: 0, display: 'grid', gap: 1 }}>
              {sections.map((section, i) => (
                <Box
                  component={motion.li}
                  key={section.href}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 0.15 + i * 0.06, ...spring.smooth } }}
                >
                  <Link
                    href={section.href}
                    underline="none"
                    onClick={(event) => {
                      event.preventDefault()
                      go(section.href)
                    }}
                    sx={{ display: 'block', py: 1.5, fontFamily: fontFamily.display, fontWeight: 700, fontSize: '2.25rem', letterSpacing: '-0.02em', color: brand.white }}
                  >
                    {section.label}
                  </Link>
                </Box>
              ))}
            </Box>
          </Box>
        )}
      </AnimatePresence>
    </Box>
  )
}
