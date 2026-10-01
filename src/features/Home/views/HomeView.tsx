import { useRef } from 'react'
import Box from '@mui/material/Box'
import {
  CelebrationFooter,
  EditorPreview,
  HeroSection,
  HowItWorks,
  LogisticsSection,
  Manifesto,
  RoleTabs,
  ScrollProgress,
  SiteHeader,
  SmoothScroll,
  TemplateGallery,
  Testimonials,
  VelocityMarquee,
} from '../components'
import { useHomeAnimations } from '../hooks'
import { HEADER_HEIGHT, SMOOTH_CONTENT_ID, SMOOTH_WRAPPER_ID } from '../utils'

/**
 * Landing pública. Ritmo de color día/noche: los capítulos claros (crema)
 * alternan con capítulos nocturnos (cassis + violeta), donde el coral, el
 * ámbar y la menta brillan más.
 *
 * Estructura que pide ScrollSmoother: lo fijo (encabezado, barra de
 * progreso) queda fuera del wrapper; todo lo que se desplaza va dentro.
 */
export function HomeView() {
  const scope = useRef<HTMLDivElement>(null)
  useHomeAnimations(scope)

  return (
    <>
      <ScrollProgress />
      <SiteHeader />
      <Box id={SMOOTH_WRAPPER_ID}>
        <Box
          id={SMOOTH_CONTENT_ID}
          ref={scope}
          sx={{
            overflowX: 'clip',
            // Las anclas no quedan tapadas por el encabezado fijo (sin smoother).
            '& section[id]': { scrollMarginTop: HEADER_HEIGHT },
          }}
        >
          <SmoothScroll />
          <HeroSection />
          <Manifesto />
          <VelocityMarquee />
          <HowItWorks />
          <EditorPreview />
          <LogisticsSection />
          <RoleTabs />
          <TemplateGallery />
          <Testimonials />
          <CelebrationFooter />
        </Box>
      </Box>
    </>
  )
}
