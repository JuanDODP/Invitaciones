import { isRouteErrorResponse, Link as RouterLink, useRouteError } from 'react-router'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { brand } from '@/utils'

/**
 * Pantalla de error de las rutas (`errorElement`): en lugar del aviso técnico
 * de React Router, explica qué pasó y ofrece cómo seguir. En desarrollo
 * muestra además el detalle del error para depurar.
 */
export function RouteError() {
  const error = useRouteError()
  const notFound = isRouteErrorResponse(error) && error.status === 404
  const detail = error instanceof Error ? error.message : isRouteErrorResponse(error) ? `${error.status} ${error.statusText}` : String(error)

  return (
    <Box component="main" sx={{ minHeight: '100svh', display: 'grid', placeItems: 'center', px: 2, bgcolor: brand.cream, textAlign: 'center' }}>
      <Box sx={{ maxWidth: 520 }}>
        <Box aria-hidden="true" sx={{ display: 'flex', justifyContent: 'center', gap: 1, mb: 3 }}>
          {[brand.coral, brand.amber, brand.violet].map((color, i) => (
            <Box key={color} sx={{ width: 14, height: 34, borderRadius: 9, bgcolor: color, rotate: `${(i - 1) * 25}deg` }} />
          ))}
        </Box>
        <Typography variant="h3" component="h1" sx={{ mb: 1.5 }}>
          {notFound ? 'Esta página no existe' : 'Algo salió mal al abrir esta página'}
        </Typography>
        <Typography sx={{ color: 'text.secondary', mb: 4 }}>
          {notFound
            ? 'Revisa la dirección o vuelve al inicio.'
            : 'Recarga la página para intentarlo de nuevo. Si vuelve a pasar, regresa al inicio.'}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'center', flexWrap: 'wrap' }}>
          {!notFound && (
            <Button variant="contained" onClick={() => window.location.reload()}>
              Recargar página
            </Button>
          )}
          <Button component={RouterLink} to="/" variant={notFound ? 'contained' : 'outlined'} color={notFound ? 'primary' : 'tertiary'}>
            Volver al inicio
          </Button>
        </Box>
        {import.meta.env.DEV && (
          <Box component="pre" sx={{ mt: 4, p: 2, borderRadius: 2, bgcolor: 'rgba(30,24,34,0.06)', textAlign: 'left', fontSize: 12, whiteSpace: 'pre-wrap', overflowWrap: 'anywhere' }}>
            {detail}
          </Box>
        )}
      </Box>
    </Box>
  )
}
