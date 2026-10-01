import { useState } from 'react'
import Box from '@mui/material/Box'
import { AnimatePresence, motion } from 'motion/react'
import { brand, brandAccessible, duration, easing, fontFamily, radius, warmShadow } from '@/utils'
import { SCANNED_TABLE, venueTables, venueTotals, type VenueTable } from '../utils'

interface VenueGridProps {
  /** El invitado del simulador QR acaba de llegar a su mesa. */
  scanned: boolean
}

const SCANNED_GUEST = 'Juan Carlos'

function withScan(table: VenueTable, scanned: boolean): VenueTable {
  if (!scanned || table.number !== SCANNED_TABLE) return table
  return { ...table, arrived: table.arrived + 1, guests: [SCANNED_GUEST, ...table.guests.slice(0, -1)] }
}

/** Anillo de ocupación: la mesa se "llena" de menta conforme llegan invitados. */
function TableRing({ table, highlight }: { table: VenueTable; highlight: boolean }) {
  const ratio = table.arrived / table.seats
  const circumference = 2 * Math.PI * 16
  const full = table.arrived === table.seats
  return (
    <svg viewBox="0 0 40 40" width="100%" aria-hidden="true">
      <circle cx="20" cy="20" r="16" fill="none" stroke="rgba(30,24,34,0.08)" strokeWidth="4" />
      <motion.circle
        cx="20"
        cy="20"
        r="16"
        fill="none"
        stroke={full ? brand.mint : brand.amber}
        strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={circumference}
        initial={false}
        animate={{ strokeDashoffset: circumference * (1 - ratio) }}
        transition={{ duration: 0.6, ease: easing.out }}
        transform="rotate(-90 20 20)"
      />
      <circle cx="20" cy="20" r="11" fill={highlight ? brand.mint : brand.white} style={{ transition: 'fill 300ms' }} />
      <text x="20" y="24" textAnchor="middle" fontSize="10" fontWeight="700" fill={brand.cassis} fontFamily={fontFamily.body}>
        {table.number}
      </text>
    </svg>
  )
}

export function VenueGrid({ scanned }: VenueGridProps) {
  const [activeNumber, setActiveNumber] = useState<number | null>(null)
  const tables = venueTables.map((table) => withScan(table, scanned))
  const arrivedTotal = venueTotals.arrived + (scanned ? 1 : 0)
  const shownNumber = activeNumber ?? (scanned ? SCANNED_TABLE : null)
  const shown = shownNumber ? tables[shownNumber - 1] : null

  return (
    <Box sx={{ bgcolor: brand.white, borderRadius: `${radius.cardLarge}px`, boxShadow: warmShadow.md, p: { xs: 2.5, md: 3.5 } }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <Box>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, fontSize: '0.8125rem', fontWeight: 700, color: brandAccessible.mintText }}>
            <Box
              component="span"
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor: brand.mint,
                animation: 'home-live 1.6s ease-in-out infinite',
                '@keyframes home-live': { '50%': { boxShadow: `0 0 0 6px rgba(0,214,159,0.2)` } },
                '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
              }}
            />
            En vivo
          </Box>
          <Box sx={{ fontFamily: fontFamily.display, fontWeight: 700, fontSize: '1.375rem' }}>Salón Cristal</Box>
        </Box>
        <Box sx={{ textAlign: 'right' }}>
          <Box sx={{ fontFamily: fontFamily.display, fontWeight: 800, fontSize: '1.75rem', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
            {arrivedTotal}
            <Box component="span" sx={{ color: 'text.secondary', fontWeight: 600, fontSize: '1rem' }}> / {venueTotals.seats}</Box>
          </Box>
          <Box sx={{ fontSize: '0.8125rem', color: 'text.secondary' }}>invitados ya llegaron</Box>
        </Box>
      </Box>

      <Box
        role="list"
        aria-label="Mesas del salón"
        onPointerLeave={() => setActiveNumber(null)}
        sx={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: { xs: 1, md: 1.5 } }}
      >
        {tables.map((table) => {
          const highlight = scanned && table.number === SCANNED_TABLE
          return (
            <Box role="listitem" key={table.number}>
              <Box
                component={motion.button}
                type="button"
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                animate={highlight ? { scale: [1, 1.18, 1] } : { scale: 1 }}
                transition={{ duration: duration.slow * 2, ease: easing.out }}
                onPointerEnter={() => setActiveNumber(table.number)}
                onFocus={() => setActiveNumber(table.number)}
                onBlur={() => setActiveNumber(null)}
                aria-label={`Mesa ${table.number}: ${table.arrived} de ${table.seats} invitados llegaron`}
                sx={{
                  width: '100%',
                  aspectRatio: '1',
                  p: 0.5,
                  border: 0,
                  borderRadius: '50%',
                  bgcolor: activeNumber === table.number ? 'rgba(121,40,202,0.08)' : 'transparent',
                  cursor: 'pointer',
                  '&:focus-visible': { outline: `2px solid ${brand.violet}`, outlineOffset: 2 },
                }}
              >
                <TableRing table={table} highlight={highlight} />
              </Box>
            </Box>
          )
        })}
      </Box>

      {/* Detalle de la mesa: altura fija para que el plano no salte al cambiar. */}
      <Box sx={{ mt: 3, minHeight: 112, borderRadius: '18px', bgcolor: brand.cream, p: 2, position: 'relative', overflow: 'hidden' }}>
        <AnimatePresence mode="popLayout" initial={false}>
          <Box
            key={shown ? `${shown.number}-${shown.arrived}` : 'empty'}
            component={motion.div}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: duration.base, ease: easing.out }}
          >
            {shown ? (
              <>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.25, fontWeight: 700 }}>
                  <span>Mesa {shown.number}</span>
                  <Box component="span" sx={{ color: 'text.secondary', fontWeight: 600, fontSize: '0.875rem' }}>
                    {shown.arrived} de {shown.seats} llegaron
                  </Box>
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.75 }}>
                  {shown.guests.map((guest, index) => {
                    const arrived = index < shown.arrived
                    const isNew = guest === SCANNED_GUEST
                    return (
                      <Box
                        key={`${guest}-${index}`}
                        sx={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 0.75,
                          px: 1.25,
                          py: 0.25,
                          borderRadius: 99,
                          fontSize: '0.8125rem',
                          fontWeight: isNew ? 700 : 500,
                          bgcolor: isNew ? brand.mint : arrived ? brand.white : 'transparent',
                          color: arrived ? brand.cassis : 'text.secondary',
                          boxShadow: arrived ? 'none' : 'inset 0 0 0 1px rgba(30,24,34,0.12)',
                        }}
                      >
                        {arrived && !isNew && <Box component="span" sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: brand.mint }} />}
                        {guest}
                      </Box>
                    )
                  })}
                </Box>
              </>
            ) : (
              <Box sx={{ color: 'text.secondary', fontSize: '0.9375rem', pt: 1 }}>
                Pasa el cursor sobre una mesa para ver quién ya llegó.
              </Box>
            )}
          </Box>
        </AnimatePresence>
      </Box>
    </Box>
  )
}
