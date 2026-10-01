import { useState } from 'react'
import Box from '@mui/material/Box'
import { QRScannerDemo } from './QRScannerDemo'
import { SectionHeading } from './SectionHeading'
import { VenueGrid } from './VenueGrid'

/**
 * Logística en vivo: el escaneo del pase (izquierda) y el plano del salón
 * (derecha) comparten estado, así que cada lectura del QR "sienta" al
 * invitado en la Mesa 12 en tiempo real.
 */
export function LogisticsSection() {
  const [scanned, setScanned] = useState(false)

  return (
    <Box
      component="section"
      id="logistica"
      aria-labelledby="logistica-title"
      sx={{ py: { xs: 10, md: 16 }, px: { xs: 2, md: 4 } }}
    >
      <Box sx={{ maxWidth: 1136, mx: 'auto' }}>
        <SectionHeading
          id="logistica-title"
          title="Del pase digital a la mesa, en segundos"
          lede="Cada invitado llega con un QR en su teléfono. En la puerta se escanea, se confirma su lugar y el plano del salón se actualiza solo. Sin listas impresas ni filas."
        />
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: 'minmax(0, 1fr)', md: 'minmax(0, 0.85fr) minmax(0, 1.15fr)' },
            gap: { xs: 8, md: 6 },
            alignItems: 'center',
          }}
        >
          <Box data-reveal>
            <QRScannerDemo scanned={scanned} onScannedChange={setScanned} />
          </Box>
          <Box data-reveal>
            <VenueGrid scanned={scanned} />
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
