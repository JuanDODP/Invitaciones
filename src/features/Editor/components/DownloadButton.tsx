import { useState } from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import CircularProgress from '@mui/material/CircularProgress'
import CheckRoundedIcon from '@mui/icons-material/CheckRounded'
import DownloadRoundedIcon from '@mui/icons-material/DownloadRounded'
import ErrorOutlineRoundedIcon from '@mui/icons-material/ErrorOutlineRounded'
import { AnimatePresence, motion } from 'motion/react'

type Status = 'idle' | 'working' | 'done' | 'error'

interface DownloadButtonProps {
  onDownload: () => Promise<void>
}

const labels: Record<Status, string> = {
  idle: 'Descargar PDF',
  working: 'Preparando PDF…',
  done: 'PDF descargado',
  error: 'No se pudo descargar. Reintentar',
}

/** Botón de descarga con estados animados: preparando → listo (o error, con reintento). */
export function DownloadButton({ onDownload }: DownloadButtonProps) {
  const [status, setStatus] = useState<Status>('idle')

  const run = async () => {
    if (status === 'working') return
    setStatus('working')
    try {
      await onDownload()
      setStatus('done')
      window.setTimeout(() => setStatus('idle'), 2400)
    } catch (error) {
      console.error(error)
      setStatus('error')
    }
  }

  const icon = {
    idle: <DownloadRoundedIcon />,
    working: <CircularProgress size={18} color="inherit" />,
    done: <CheckRoundedIcon />,
    error: <ErrorOutlineRoundedIcon />,
  }[status]

  return (
    <Button
      variant="contained"
      size="large"
      onClick={run}
      aria-busy={status === 'working'}
      component={motion.button}
      layout
      whileTap={{ scale: 0.96 }}
      sx={{
        minWidth: 220,
        overflow: 'hidden',
        bgcolor: status === 'done' ? 'success.dark' : status === 'error' ? 'error.main' : 'primary.main',
        '&:hover': { bgcolor: status === 'done' ? 'success.dark' : status === 'error' ? 'error.dark' : 'primary.dark' },
      }}
    >
      <AnimatePresence mode="popLayout" initial={false}>
        <Box
          key={status}
          component={motion.span}
          initial={{ y: 18, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -18, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 420, damping: 30 }}
          aria-live="polite"
          sx={{ display: 'inline-flex', alignItems: 'center', gap: 1 }}
        >
          {icon}
          {labels[status]}
        </Box>
      </AnimatePresence>
    </Button>
  )
}
