import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Lee el alias `@/*` desde tsconfig.app.json: una sola fuente de verdad.
  resolve: { tsconfigPaths: true },
  // Las páginas de cada módulo se cargan con lazy(): sin esto, Vite descubre
  // sus dependencias (p. ej. MUI Container) al navegar, re-optimiza a mitad
  // de sesión y puede servir dos copias de React ("Invalid hook call").
  // Rastrear todo el código al arrancar las pre-empaqueta desde el inicio.
  optimizeDeps: { entries: ['index.html', 'src/**/*.{ts,tsx}'] },
})
