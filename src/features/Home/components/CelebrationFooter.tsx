import { Link as RouterLink } from 'react-router'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { motion } from 'motion/react'
import { brand, brandAccessible, radius, spring } from '@/utils'
import { burstFromElement } from '../utils'
import { BrandMark } from './SiteHeader'

const footerLinks = [
  { label: 'Creador', href: '#creador' },
  { label: 'Logística y QR', href: '#logistica' },
  { label: 'Para quién', href: '#para-quien' },
  { label: 'Plantillas', href: '#plantillas' },
]

/**
 * Cierre: banner violeta → coral y el CTA final. Al pulsarlo dispara confetti
 * y navega al editor; el canvas del confetti vive en <body>, así que la
 * ráfaga sigue cayendo durante la transición de página.
 */
export function CelebrationFooter() {
  return (
    <Box component="footer" sx={{ px: { xs: 2, md: 4 }, pb: 4 }}>
      <Box
        data-reveal
        sx={{
          position: 'relative',
          overflow: 'hidden',
          isolation: 'isolate',
          maxWidth: 1136,
          mx: 'auto',
          borderRadius: `${radius.cardLarge}px`,
          // El extremo coral usa la variante oscura para que el texto blanco cumpla contraste.
          background: `linear-gradient(120deg, ${brand.violet} 0%, #A2309F 55%, ${brandAccessible.coralButton} 100%)`,
          color: brand.white,
          textAlign: 'center',
          px: { xs: 3, md: 8 },
          py: { xs: 8, md: 12 },
        }}
      >
        <Box aria-hidden="true" data-parallax="0.25" sx={{ position: 'absolute', inset: '-20% -10%', zIndex: -1, opacity: 0.5 }}>
          <svg width="100%" height="100%" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice">
            {[
              [30, 40, brand.amber, 20],
              [360, 50, brand.mint, -30],
              [70, 160, brand.coral, 45],
              [330, 150, brand.amber, -15],
              [200, 20, brand.mint, 60],
            ].map(([x, y, color, rotate], i) => (
              <rect key={i} x={x as number} y={y as number} width="14" height="6" rx="3" fill={color as string} transform={`rotate(${rotate} ${x} ${y})`} />
            ))}
          </svg>
        </Box>

        <Typography variant="h2" sx={{ fontSize: 'clamp(2rem, 5vw, 3.8rem)', mb: 2, textWrap: 'balance' }}>
          Tu próxima fiesta empieza con una invitación
        </Typography>
        <Typography sx={{ fontSize: { xs: '1.0625rem', md: '1.1875rem' }, opacity: 0.9, maxWidth: '32em', mx: 'auto', mb: 5 }}>
          Diséñala hoy, compártela en minutos y deja que el día del evento todo fluya.
        </Typography>
        <Box
          component={motion.div}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          transition={spring.snappy}
          sx={{ display: 'inline-block' }}
        >
          <Button
            component={RouterLink}
            to="/editor"
            size="large"
            onClick={(event) => burstFromElement(event.currentTarget, 180)}
            sx={{
              bgcolor: brand.white,
              color: brand.cassis,
              minHeight: 60,
              px: 5,
              fontSize: '1.0625rem',
              boxShadow: `0 16px 40px -12px rgba(30,24,34,0.5), 0 0 0 6px rgba(255,255,255,0.18)`,
              '&:hover': { bgcolor: brand.cream },
              '&:active': { transform: 'none' },
            }}
          >
            Crear mi cuenta gratis
          </Button>
        </Box>
      </Box>

      <Box
        sx={{
          maxWidth: 1136,
          mx: 'auto',
          mt: 5,
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 3,
        }}
      >
        <BrandMark />
        <Box component="nav" aria-label="Pie de página" sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
          {footerLinks.map((link) => (
            <Link key={link.href} href={link.href} underline="hover" sx={{ color: 'text.secondary', fontSize: '0.9375rem' }}>
              {link.label}
            </Link>
          ))}
        </Box>
        <Box sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>© {new Date().getFullYear()} Invitaciones</Box>
      </Box>
    </Box>
  )
}
