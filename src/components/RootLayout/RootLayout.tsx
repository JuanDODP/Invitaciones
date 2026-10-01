import { Suspense } from 'react'
import { Outlet } from 'react-router'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'

/**
 * Layout raíz. Persiste entre navegaciones: las transiciones de página
 * viven en cada página (`PageTransition`), no aquí.
 *
 * El Suspense solo se ve en la carga inicial: en navegaciones, React Router
 * usa `startTransition` y React mantiene la página actual hasta que el
 * chunk de la siguiente está listo, en lugar de mostrar el fallback.
 */
export function RootLayout() {
  return (
    <Box component="main" sx={{ minHeight: '100svh' }}>
      <Suspense fallback={<LinearProgress aria-label="Cargando página" />}>
        <Outlet />
      </Suspense>
    </Box>
  )
}
