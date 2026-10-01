import { useMemo, useRef } from 'react'
import Box from '@mui/material/Box'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import { AnimatePresence, motion } from 'motion/react'
import { brand, fontFamily, radius, spring, warmShadow } from '@/utils'
import { gsap, motionOk, ScrollTrigger, useGSAP } from '@/utils/gsap'
import { createQrMatrix, SCANNED_TABLE } from '../utils'

interface QRScannerDemoProps {
  scanned: boolean
  onScannedChange: (scanned: boolean) => void
}

const QR_SIZE = 25

/**
 * Pase de invitado con un láser menta que escanea el QR en bucle mientras
 * la sección está en pantalla. Al terminar cada pasada avisa al padre
 * (`onScannedChange`) para que el plano del salón marque la mesa.
 *
 * Con `prefers-reduced-motion`: sin bucle, se muestra el estado ya escaneado.
 */
export function QRScannerDemo({ scanned, onScannedChange }: QRScannerDemoProps) {
  const scope = useRef<HTMLDivElement>(null)
  const frame = useRef<HTMLDivElement>(null)
  const laser = useRef<HTMLDivElement>(null)
  const matrix = useMemo(() => createQrMatrix(QR_SIZE), [])

  useGSAP(
    () => {
      const mm = gsap.matchMedia()

      mm.add(motionOk, () => {
        const travel = () => (frame.current?.clientHeight ?? 0) - 4
        const loop = gsap
          .timeline({ repeat: -1, paused: true })
          .set(laser.current, { y: 0, autoAlpha: 1 })
          .to(laser.current, { y: travel, duration: 1.2, ease: 'sine.inOut' })
          .to(laser.current, { y: 0, duration: 1.2, ease: 'sine.inOut' })
          .to(laser.current, { autoAlpha: 0, duration: 0.15 })
          .call(() => onScannedChange(true))
          .to({}, { duration: 2.8 })
          .call(() => onScannedChange(false))
          .to({}, { duration: 0.5 })

        ScrollTrigger.create({
          trigger: scope.current,
          start: 'top 80%',
          end: 'bottom 20%',
          onToggle: (self) => (self.isActive ? loop.play() : loop.pause()),
        })
      })

      mm.add('(prefers-reduced-motion: reduce)', () => {
        onScannedChange(true)
      })
    },
    { scope, dependencies: [] },
  )

  return (
    <Box ref={scope} sx={{ position: 'relative', maxWidth: 380, mx: 'auto', width: '100%' }}>
      <Box
        sx={{
          bgcolor: brand.white,
          borderRadius: `${radius.cardLarge}px`,
          boxShadow: warmShadow.lg,
          overflow: 'hidden',
        }}
      >
        <Box sx={{ bgcolor: brand.violet, color: brand.white, px: 3.5, pt: 3, pb: 3.5 }}>
          <Box sx={{ fontSize: '0.8125rem', fontWeight: 600, opacity: 0.8 }}>Pase de acceso</Box>
          <Box sx={{ fontFamily: fontFamily.display, fontWeight: 700, fontSize: '1.625rem', letterSpacing: '-0.02em' }}>
            Juan Carlos Méndez
          </Box>
          <Box sx={{ fontSize: '0.875rem', opacity: 0.85 }}>Boda de Ana & Leo, 2 personas</Box>
        </Box>

        {/* Perforación del boleto */}
        <Box aria-hidden="true" sx={{ position: 'relative', height: 0 }}>
          {[-14, 'calc(100% - 14px)'].map((left) => (
            <Box key={String(left)} sx={{ position: 'absolute', top: -14, left, width: 28, height: 28, borderRadius: '50%', bgcolor: brand.cream }} />
          ))}
        </Box>

        <Box sx={{ p: 3.5, display: 'grid', placeItems: 'center' }}>
          <Box
            ref={frame}
            sx={{
              position: 'relative',
              width: '100%',
              maxWidth: 240,
              aspectRatio: '1',
              p: 2,
              borderRadius: '20px',
              transition: 'box-shadow 300ms',
              boxShadow: scanned ? `0 0 0 3px ${brand.mint}, 0 0 32px -4px ${brand.mint}` : '0 0 0 1px rgba(30,24,34,0.1)',
            }}
          >
            <svg viewBox={`0 0 ${QR_SIZE} ${QR_SIZE}`} width="100%" height="100%" role="img" aria-label="Código QR del pase">
              {matrix.flatMap((row, y) =>
                row.map((filled, x) => (filled ? <rect key={`${x}-${y}`} x={x} y={y} width="1.02" height="1.02" rx="0.18" fill={brand.cassis} /> : null)),
              )}
            </svg>

            <Box
              ref={laser}
              aria-hidden="true"
              sx={{
                position: 'absolute',
                left: 8,
                right: 8,
                top: 0,
                height: 4,
                borderRadius: 4,
                bgcolor: brand.mint,
                boxShadow: `0 0 12px 2px ${brand.mint}, 0 0 40px 8px rgba(0,214,159,0.35)`,
                opacity: 0,
                willChange: 'transform',
              }}
            />
          </Box>
        </Box>
      </Box>

      <Box aria-live="polite" sx={{ position: 'absolute', left: '50%', bottom: -28, translate: '-50% 0', width: 'max-content', maxWidth: '100%' }}>
        <AnimatePresence>
          {scanned && (
            <Box
              component={motion.div}
              initial={{ opacity: 0, y: 16, scale: 0.85 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95, transition: { duration: 0.16 } }}
              transition={spring.snappy}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                pl: 1,
                pr: 2.5,
                py: 1,
                borderRadius: 99,
                bgcolor: brand.cassis,
                color: brand.white,
                boxShadow: warmShadow.md,
              }}
            >
              <Box sx={{ width: 36, height: 36, borderRadius: '50%', bgcolor: brand.mint, color: brand.cassis, display: 'grid', placeItems: 'center' }}>
                <CheckRoundedIcon />
              </Box>
              <Box>
                <Box sx={{ fontWeight: 700, fontSize: '0.9375rem' }}>¡Bienvenido Juan Carlos!</Box>
                <Box sx={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.75)' }}>Mesa #{SCANNED_TABLE} asignada</Box>
              </Box>
            </Box>
          )}
        </AnimatePresence>
      </Box>
    </Box>
  )
}
