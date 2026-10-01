import { useRef, useState } from 'react'
import { flushSync } from 'react-dom'
import Box from '@mui/material/Box'
import { invitationComponents } from '../components/templates'
import { downloadElementAsPdf, templateMeta, type TemplateId } from '../utils'

/** Ancho fijo de la invitación en el PDF (px CSS; se captura a 3×). */
const PRINT_WIDTH = 540

/**
 * Espera un cuadro de render. Con la pestaña en segundo plano el navegador
 * pausa requestAnimationFrame, así que un temporizador hace de respaldo
 * (la descarga no se queda colgada si el usuario cambia de pestaña).
 */
const nextFrame = () =>
  new Promise<void>((resolve) => {
    const timer = window.setTimeout(resolve, 50)
    requestAnimationFrame(() => {
      window.clearTimeout(timer)
      resolve()
    })
  })

/**
 * Descarga una plantilla en PDF. Monta fuera de pantalla una copia "fija"
 * (sin animaciones, en su estado final y a un tamaño estable), espera a que
 * carguen sus fuentes, la captura y la quita.
 *
 * Devuelve `printStage`, que la vista debe renderizar en algún lugar.
 */
export function useInvitationPdf() {
  const [printing, setPrinting] = useState<TemplateId | null>(null)
  const stage = useRef<HTMLDivElement>(null)

  const download = async (id: TemplateId) => {
    flushSync(() => setPrinting(id))
    try {
      await nextFrame()
      await nextFrame()
      await document.fonts.ready
      const invitation = stage.current?.firstElementChild
      if (!(invitation instanceof HTMLElement)) throw new Error('No se encontró la invitación a imprimir')
      await downloadElementAsPdf(invitation, templateMeta[id].fileName)
    } finally {
      setPrinting(null)
    }
  }

  const PrintTemplate = printing ? invitationComponents[printing] : null
  const printStage = PrintTemplate ? (
    <Box ref={stage} aria-hidden="true" sx={{ position: 'fixed', left: -10000, top: 0, width: PRINT_WIDTH, pointerEvents: 'none' }}>
      <PrintTemplate still />
    </Box>
  ) : null

  return { download, printStage, printing }
}
