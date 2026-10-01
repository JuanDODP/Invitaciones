import { useRef } from 'react'
import { Link as RouterLink } from 'react-router'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import { brand, brandAccessible } from '@/utils'
import { gsap, motionOk, ScrollTrigger, SplitText, useGSAP } from '@/utils/gsap'
import { burstConfetti, burstFromElement, scrollToSection } from '../utils'
import { Magnetic } from './Magnetic'
import { BrandMark } from './SiteHeader'

const footerLinks = [
  { label: 'Creador', href: '#creador' },
  { label: 'Logística y QR', href: '#logistica' },
  { label: 'Para quién', href: '#para-quien' },
  { label: 'Plantillas', href: '#plantillas' },
]

/**
 * Cierre: capítulo nocturno que se expande a pantalla completa. Al llegar,
 * el titular rebota letra por letra y estalla el confeti (una vez). El CTA
 * es magnético; al pulsarlo dispara otra ráfaga y navega al editor (el
 * canvas del confeti vive en <body>, así que sigue cayendo en el cambio de página).
 */
export function CelebrationFooter() {
  const banner = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add(motionOk, () => {
        const split = SplitText.create('[data-finale-title]', { type: 'words,chars' })
        gsap.from(split.chars, {
          yPercent: -140,
          rotate: () => gsap.utils.random(-40, 40),
          autoAlpha: 0,
          duration: 1.2,
          ease: 'bounce.out',
          stagger: { each: 0.025, from: 'random' },
          scrollTrigger: { trigger: banner.current, start: 'top 55%', once: true },
        })
        ScrollTrigger.create({
          trigger: banner.current,
          start: 'top 40%',
          once: true,
          onEnter: () => {
            const rect = banner.current?.getBoundingClientRect()
            if (!rect) return
            burstConfetti({ x: rect.left + rect.width * 0.25, y: rect.top + rect.height * 0.55 }, 90)
            burstConfetti({ x: rect.left + rect.width * 0.75, y: rect.top + rect.height * 0.55 }, 90)
          },
        })
      })
    },
    { scope: banner },
  )

  return (
    <Box component="footer">
      <Box component="section" aria-labelledby="finale-title" data-night>
        <Box
          ref={banner}
          data-expand
          sx={{
            position: 'relative',
            overflow: 'hidden',
            isolation: 'isolate',
            // El extremo coral usa la variante oscura para que el texto blanco cumpla contraste.
            background: `linear-gradient(120deg, ${brand.cassis} 0%, ${brand.violet} 45%, #A2309F 70%, ${brandAccessible.coralButton} 100%)`,
            color: brand.white,
            textAlign: 'center',
            px: { xs: 2.5, md: 8 },
            py: { xs: 14, md: 20 },
          }}
        >
          <Box aria-hidden="true" data-parallax="0.3" sx={{ position: 'absolute', inset: '-20% -10%', zIndex: -1, opacity: 0.6 }}>
            <svg width="100%" height="100%" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice">
              {[
                [30, 40, brand.amber, 20],
                [360, 50, brand.mint, -30],
                [70, 160, brand.coral, 45],
                [330, 150, brand.amber, -15],
                [200, 18, brand.mint, 60],
                [120, 186, brand.amber, -20],
              ].map(([x, y, color, rotate], i) => (
                <rect key={i} x={x as number} y={y as number} width="14" height="6" rx="3" fill={color as string} transform={`rotate(${rotate} ${x} ${y})`} />
              ))}
            </svg>
          </Box>

          <Typography
            id="finale-title"
            data-finale-title
            variant="h2"
            sx={{ fontSize: 'clamp(2.4rem, 7vw, 6rem)', mb: 3, textWrap: 'balance', maxWidth: '12em', mx: 'auto', lineHeight: 1 }}
          >
            Tu próxima fiesta empieza aquí
          </Typography>
          <Typography data-reveal sx={{ fontSize: { xs: '1.0625rem', md: '1.25rem' }, opacity: 0.88, maxWidth: '30em', mx: 'auto', mb: 6 }}>
            Diséñala hoy, compártela en minutos y deja que el día del evento todo fluya.
          </Typography>
          <Box data-reveal>
            <Magnetic strength={0.45}>
              <Button
                component={RouterLink}
                to="/editor"
                size="large"
                onClick={(event) => burstFromElement(event.currentTarget, 180)}
                sx={{
                  bgcolor: brand.white,
                  color: brand.cassis,
                  minHeight: 64,
                  px: 5.5,
                  fontSize: '1.125rem',
                  boxShadow: `0 18px 44px -12px rgba(0,0,0,0.55), 0 0 0 8px rgba(255,255,255,0.16)`,
                  animation: 'finale-pulse 2.4s ease-in-out infinite',
                  '@keyframes finale-pulse': {
                    '0%, 100%': { boxShadow: '0 18px 44px -12px rgba(0,0,0,0.55), 0 0 0 8px rgba(255,255,255,0.16)' },
                    '50%': { boxShadow: '0 18px 44px -12px rgba(0,0,0,0.55), 0 0 0 16px rgba(255,255,255,0.06)' },
                  },
                  '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
                  '&:hover': { bgcolor: brand.cream },
                }}
              >
                Crear mi cuenta gratis
              </Button>
            </Magnetic>
          </Box>
        </Box>
      </Box>

      <Box
        sx={{
          maxWidth: 1200,
          mx: 'auto',
          px: { xs: 2, md: 4 },
          py: 5,
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
            <Link
              key={link.href}
              href={link.href}
              underline="hover"
              onClick={(event) => {
                event.preventDefault()
                scrollToSection(link.href)
              }}
              sx={{ color: 'text.secondary', fontSize: '0.9375rem' }}
            >
              {link.label}
            </Link>
          ))}
        </Box>
        <Box sx={{ color: 'text.secondary', fontSize: '0.875rem' }}>© {new Date().getFullYear()} Invitaciones</Box>
      </Box>
    </Box>
  )
}
