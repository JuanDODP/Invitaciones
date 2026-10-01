import { Link as RouterLink } from 'react-router'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded'
import { BrandMark } from '../BrandMark'

interface TopBarProps {
  /** Versión para fondos oscuros. */
  dark?: boolean
}

/** Barra superior de las páginas internas: marca y regreso al inicio. */
export function TopBar({ dark = false }: TopBarProps) {
  return (
    <Box
      component="header"
      sx={{
        position: 'sticky',
        top: 0,
        zIndex: 20,
        backdropFilter: 'saturate(1.4) blur(14px)',
        bgcolor: dark ? 'rgba(10,8,16,0.55)' : 'rgba(255,255,255,0.6)',
        borderBottom: '1px solid',
        borderColor: dark ? 'rgba(255,255,255,0.08)' : 'rgba(30,24,34,0.06)',
        transition: 'background-color 500ms, border-color 500ms',
        '--header-ink': dark ? '#FFFFFF' : '#1E1822',
      }}
    >
      <Box component="nav" aria-label="Principal" sx={{ maxWidth: 1200, mx: 'auto', px: { xs: 2, md: 4 }, height: 64, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Link component={RouterLink} to="/" underline="none" aria-label="Invitaciones, inicio">
          <BrandMark />
        </Link>
        <Button
          component={RouterLink}
          to="/"
          startIcon={<ArrowBackRoundedIcon />}
          sx={{ ml: 'auto', whiteSpace: 'nowrap', color: 'var(--header-ink)', '&:hover': { bgcolor: dark ? 'rgba(255,255,255,0.08)' : 'rgba(30,24,34,0.05)' } }}
        >
          <Box component="span" sx={{ display: { xs: 'none', sm: 'inline' } }}>
            Volver al inicio
          </Box>
          <Box component="span" sx={{ display: { sm: 'none' } }}>
            Inicio
          </Box>
        </Button>
      </Box>
    </Box>
  )
}
