/**
 * Genera una matriz con aspecto de código QR (solo decorativa, no escaneable):
 * tres patrones de posición en las esquinas y módulos pseudoaleatorios
 * deterministas, para que el render sea estable entre visitas.
 */
export function createQrMatrix(size = 25, seed = 12): boolean[][] {
  let state = seed
  const random = () => {
    state = (state * 1664525 + 1013904223) % 4294967296
    return state / 4294967296
  }

  const isFinder = (row: number, col: number) => {
    const corners: Array<[number, number]> = [
      [0, 0],
      [0, size - 7],
      [size - 7, 0],
    ]
    return corners.find(([r, c]) => row >= r && row < r + 7 && col >= c && col < c + 7)
  }

  return Array.from({ length: size }, (_, row) =>
    Array.from({ length: size }, (_, col) => {
      const corner = isFinder(row, col)
      if (corner) {
        const [r, c] = corner
        const y = row - r
        const x = col - c
        const ring = Math.min(x, y, 6 - x, 6 - y)
        return ring !== 1
      }
      // Margen blanco alrededor de los patrones de posición.
      const nearFinder =
        (row < 8 && col < 8) || (row < 8 && col >= size - 8) || (row >= size - 8 && col < 8)
      if (nearFinder) return false
      return random() > 0.52
    }),
  )
}
