import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { readdirSync } from 'node:fs'
import { defineConfig, globalIgnores } from 'eslint/config'

// Reglas de arquitectura (ver CLAUDE.md). ESLint no combina dos configuraciones
// de `no-restricted-imports` (la última reemplaza a la anterior), así que cada
// bloque incluye también la regla de barriles.

// Fuera de su carpeta, todo se importa desde el barril: `@/components/Button`,
// nunca `@/components/Button/Button`.
const barrelPattern = {
  regex: '^@/(components|contexts|hooks|utils|services|features)/[^/]+/.+',
  message: 'Importa desde el barril (index.ts) de la carpeta, no desde un archivo interno.',
}

const restrictImports = (...patterns) => ({
  'no-restricted-imports': ['error', { patterns: [barrelPattern, ...patterns] }],
})

// Un módulo de `features/` nunca importa de otro.
const features = readdirSync(new URL('./src/features', import.meta.url), { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)

const crossFeatureRules = features.map((feature) => {
  const others = features.filter((name) => name !== feature).join('|')
  return {
    files: [`src/features/${feature}/**/*.{ts,tsx}`],
    rules: restrictImports({
      regex: `(features/|^(\\.\\./)+)(${others})(/|$)`,
      message: `"${feature}" no puede importar de otro módulo. Mueve el código compartido a src/components, src/hooks, src/contexts, src/utils o src/services.`,
    }),
  }
})

// El código compartido nunca depende de `features/`.
const sharedCodeRule = {
  files: ['src/{components,contexts,hooks,utils,services}/**/*.{ts,tsx}'],
  rules: restrictImports({
    regex: '(^|/)features(/|$)',
    message: 'El código compartido no puede depender de un módulo de features/.',
  }),
}

const baseImportRule = {
  files: ['src/**/*.{ts,tsx}'],
  rules: restrictImports(),
}

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
  },
  baseImportRule,
  ...crossFeatureRules,
  sharedCodeRule,
])
