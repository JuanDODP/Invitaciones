import { useState } from 'react'
import Box from '@mui/material/Box'
import { brand } from '@/utils'
import { QRScannerDemo } from './QRScannerDemo'
import { SectionHeading } from './SectionHeading'
import { VenueGrid } from './VenueGrid'

/**
 * Logística en vivo, "la noche del evento": capítulo oscuro que se expande
 * hasta ocupar toda la pantalla al entrar (`data-expand`). El escaneo del
 * pase y el plano del salón comparten estado: cada lectura del QR "sienta"
 * al invitado en la Mesa 12 en tiempo real.
 */
export function LogisticsSection() {
  const [scanned, setScanned] = useState(false)

  return (
    <Box component="section" id="logistica" aria-labelledby="logistica-title" data-night>
      <Box
        data-expand
        sx={{
          position: 'relative',
          overflow: 'hidden',
          isolation: 'isolate',
          bgcolor: brand.cassis,
          color: brand.white,
          py: { xs: 12, md: 18 },
          px: { xs: 2, md: 4 },
        }}
      >
        <Box
          aria-hidden="true"
          sx={{
            position: 'absolute',
            inset: 0,
            zIndex: -1,
            backgroundImage: `
              radial-gradient(ellipse 50% 40% at 15% 20%, rgba(121,40,202,0.55), transparent 70%),
              radial-gradient(ellipse 45% 40% at 85% 75%, rgba(0,214,159,0.25), transparent 70%),
              radial-gradient(rgba(255,255,255,0.07) 1px, transparent 1px)`,
            backgroundSize: '100% 100%, 100% 100%, 26px 26px',
          }}
        />
        <Box data-parallax="0.35" aria-hidden="true" sx={{ position: 'absolute', top: '12%', right: '8%', width: 120, height: 120, borderRadius: '50%', border: `2px dashed ${brand.mint}`, opacity: 0.35, zIndex: -1 }} />
        <Box data-parallax="-0.25" aria-hidden="true" sx={{ position: 'absolute', bottom: '10%', left: '4%', width: 22, height: 22, borderRadius: '6px', bgcolor: brand.amber, rotate: '24deg', zIndex: -1 }} />

        <Box sx={{ maxWidth: 1136, mx: 'auto' }}>
          <SectionHeading
            id="logistica-title"
            inverted
            title="Del pase digital a la mesa, en segundos"
            lede="Cada invitado llega con un QR en su teléfono. En la puerta se escanea, se confirma su lugar y el plano del salón se actualiza solo. Sin listas impresas ni filas."
          />
          <Box
            sx={{
              display: 'grid',
              gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'minmax(0, 0.85fr) minmax(0, 1.15fr)' },
              gap: { xs: 9, md: 6 },
              alignItems: 'center',
            }}
          >
            <Box data-reveal>
              <QRScannerDemo scanned={scanned} onScannedChange={setScanned} surface={brand.cassis} />
            </Box>
            <Box data-reveal>
              <VenueGrid scanned={scanned} />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
