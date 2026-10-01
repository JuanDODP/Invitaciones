import { useRef } from 'react'
import Box from '@mui/material/Box'
import {
  CelebrationFooter,
  EditorPreview,
  HeroSection,
  LogisticsSection,
  RoleTabs,
  SiteHeader,
  TemplateGallery,
  Testimonials,
} from '../components'
import { useHomeAnimations } from '../hooks'

/** Landing pública: compone las secciones y activa las animaciones de scroll. */
export function HomeView() {
  const scope = useRef<HTMLDivElement>(null)
  useHomeAnimations(scope)

  return (
    <Box
      ref={scope}
      sx={{
        overflowX: 'clip',
        // Las anclas del menú no quedan tapadas por el encabezado fijo.
        '& section[id]': { scrollMarginTop: 72 },
      }}
    >
      <SiteHeader />
      <HeroSection />
      <EditorPreview />
      <LogisticsSection />
      <RoleTabs />
      <TemplateGallery />
      <Testimonials />
      <CelebrationFooter />
    </Box>
  )
}
