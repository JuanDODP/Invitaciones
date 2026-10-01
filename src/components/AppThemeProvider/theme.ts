import { createTheme } from '@mui/material/styles'
import {
  brand,
  brandAccessible,
  duration,
  easing,
  fontFamily,
  radius,
  toCssEasing,
  toMs,
  warmShadow,
} from '@/utils'

declare module '@mui/material/styles' {
  interface Palette {
    tertiary: Palette['primary']
  }
  interface PaletteOptions {
    tertiary?: PaletteOptions['primary']
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    tertiary: true
  }
}

const ease = toCssEasing(easing.out)

/**
 * Tema "Joy & Celebration" (ver utils/brand). Las transiciones de MUI usan
 * los mismos tokens que `motion`, GSAP y las View Transitions.
 *
 * Solo modo claro: la paleta oficial está definida sobre la crema.
 */
export const theme = createTheme({
  cssVariables: true,
  palette: {
    // Coral oscurecido para que el texto blanco del botón cumpla 4.5:1.
    // El coral de marca (#FF5E5B) queda como `light` para halos y acentos.
    primary: {
      main: brandAccessible.coralButton,
      dark: brandAccessible.coralButtonHover,
      light: brand.coral,
      contrastText: brand.white,
    },
    secondary: {
      main: brand.amber,
      dark: brandAccessible.amberText,
      contrastText: brand.cassis,
    },
    tertiary: {
      main: brand.violet,
      dark: '#5E1FA0',
      light: '#9B5DE0',
      contrastText: brand.white,
    },
    success: {
      main: brand.mint,
      dark: brandAccessible.mintText,
      contrastText: brand.cassis,
    },
    background: { default: brand.cream, paper: brand.white },
    text: { primary: brand.cassis, secondary: 'rgba(30, 24, 34, 0.68)' },
    divider: 'rgba(30, 24, 34, 0.08)',
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: fontFamily.body,
    h1: { fontFamily: fontFamily.display, fontWeight: 800, letterSpacing: '-0.035em', lineHeight: 1.02 },
    h2: { fontFamily: fontFamily.display, fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1.08 },
    h3: { fontFamily: fontFamily.display, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.15 },
    h4: { fontFamily: fontFamily.display, fontWeight: 600, letterSpacing: '-0.015em' },
    h5: { fontFamily: fontFamily.display, fontWeight: 600 },
    h6: { fontFamily: fontFamily.display, fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600, letterSpacing: 0 },
  },
  transitions: {
    easing: { easeOut: ease, easeInOut: toCssEasing(easing.inOut), sharp: ease },
    duration: {
      shortest: toMs(duration.instant),
      shorter: toMs(duration.fast),
      short: toMs(duration.base),
      standard: toMs(duration.base),
      complex: toMs(duration.slow),
      enteringScreen: toMs(duration.base),
      leavingScreen: toMs(duration.fast),
    },
  },
  components: {
    MuiButtonBase: {
      // Sin ripple, MUI no muestra foco de teclado: se reemplaza por un anillo visible.
      defaultProps: { disableRipple: true },
      styleOverrides: {
        root: {
          '&.Mui-focusVisible': {
            outline: `2px solid ${brand.violet}`,
            outlineOffset: 3,
          },
        },
      },
    },
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: {
        root: {
          borderRadius: radius.pill,
          paddingInline: 22,
          minHeight: 44,
          transition: `transform ${toMs(duration.fast)}ms ${ease}, background-color ${toMs(duration.fast)}ms ${ease}, box-shadow ${toMs(duration.base)}ms ${ease}`,
          '&:active': { transform: 'scale(0.97)' },
        },
        sizeLarge: { minHeight: 52, paddingInline: 28, fontSize: '1rem' },
      },
      variants: [
        {
          // Halo coral en el CTA principal.
          props: { variant: 'contained', color: 'primary' },
          style: {
            boxShadow: `0 8px 24px -8px ${brand.coral}`,
            '@media (hover: hover)': {
              '&:hover': { boxShadow: `0 12px 32px -8px ${brand.coral}` },
            },
          },
        },
      ],
    },
    MuiCard: {
      styleOverrides: {
        root: { borderRadius: radius.card, boxShadow: warmShadow.md },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: { borderRadius: radius.card },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: { borderRadius: radius.cardLarge, boxShadow: warmShadow.lg },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: { backgroundColor: brand.cassis, borderRadius: 10, fontSize: '0.8125rem', padding: '6px 10px' },
      },
    },
  },
})
