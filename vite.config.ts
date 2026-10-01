import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Lee el alias `@/*` desde tsconfig.app.json: una sola fuente de verdad.
  resolve: { tsconfigPaths: true },
})
