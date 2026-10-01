import type { ReactNode } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material/styles'
import { MotionConfig } from 'motion/react'
import { theme } from './theme'

interface AppThemeProviderProps {
  children: ReactNode
}

/**
 * Providers visuales globales: tema de MUI + configuración de `motion`.
 * `reducedMotion="user"` respeta la preferencia del sistema: las animaciones
 * de transform se desactivan y solo quedan las de opacidad.
 */
export function AppThemeProvider({ children }: AppThemeProviderProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <MotionConfig reducedMotion="user">{children}</MotionConfig>
    </ThemeProvider>
  )
}
