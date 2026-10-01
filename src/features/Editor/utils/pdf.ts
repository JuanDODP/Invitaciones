/**
 * Convierte un elemento en un PDF de una página del mismo tamaño y lo
 * descarga. Las librerías se cargan solo al usarse (no pesan en la página).
 *
 * La captura usa el render del propio navegador (foreignObject), así que
 * respeta fuentes, gradientes, sombras y SVG.
 */
export async function downloadElementAsPdf(element: HTMLElement, fileName: string): Promise<void> {
  const [{ domToCanvas }, { jsPDF }] = await Promise.all([import('modern-screenshot'), import('jspdf')])
  await document.fonts.ready

  const width = element.offsetWidth
  const height = element.offsetHeight
  const canvas = await domToCanvas(element, { scale: 3, width, height })

  const pdf = new jsPDF({ orientation: 'portrait', unit: 'px', format: [width, height], hotfixes: ['px_scaling'], compress: true })
  pdf.addImage(canvas.toDataURL('image/jpeg', 0.92), 'JPEG', 0, 0, width, height)
  pdf.save(fileName)
}
