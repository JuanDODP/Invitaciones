import type { TemplateDecor } from '../utils'
import { brand } from '@/utils'

interface DecorProps {
  kind: TemplateDecor
  accent: string
  ink: string
}

const confettiPieces = [
  { x: 10, y: 12, r: 18, c: brand.amber },
  { x: 84, y: 9, r: -24, c: brand.violet },
  { x: 90, y: 34, r: 40, c: brand.mint },
  { x: 6, y: 44, r: -12, c: brand.cream },
  { x: 16, y: 82, r: 30, c: brand.violet },
  { x: 88, y: 76, r: -36, c: brand.amber },
  { x: 72, y: 92, r: 14, c: brand.cream },
  { x: 30, y: 6, r: 50, c: brand.mint },
]

/** Ornamento de anillos entrelazados: va en el flujo del contenido, sobre el texto. */
export function RingsOrnament({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 40 22" width="22%" aria-hidden="true" style={{ overflow: 'visible' }}>
      <g fill="none" stroke={color} strokeWidth="1.6">
        <circle className="float-piece" cx="15" cy="11" r="9" />
        <circle className="float-piece" cx="25" cy="11" r="9" />
      </g>
    </svg>
  )
}

/**
 * Capa decorativa SVG de cada plantilla. Las piezas llevan la clase
 * `float-piece` para que el hero pueda animarlas flotando.
 */
export function Decor({ kind, accent, ink }: DecorProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    >
      {kind === 'rings' && (
        <g fill="none" stroke={accent} strokeWidth="0.9" opacity="0.9">
          {[
            [14, 70],
            [86, 58],
            [80, 88],
            [20, 90],
          ].map(([x, y]) => (
            <path key={`${x}-${y}`} className="float-piece" d={`M${x} ${y - 3} L${x + 1} ${y} L${x} ${y + 3} L${x - 1} ${y} Z`} fill={accent} stroke="none" />
          ))}
        </g>
      )}

      {kind === 'confetti' &&
        confettiPieces.map((piece, index) => (
          <rect
            key={index}
            className="float-piece"
            x={piece.x}
            y={piece.y}
            width={index % 2 ? 3.2 : 5}
            height={index % 2 ? 3.2 : 1.8}
            rx={index % 2 ? 1.6 : 0.6}
            fill={piece.c === brand.cream ? ink : piece.c}
            opacity={0.85}
            transform={`rotate(${piece.r} ${piece.x} ${piece.y})`}
          />
        ))}

      {kind === 'stars' &&
        [
          [14, 14, 4],
          [86, 18, 5.5],
          [78, 80, 3.5],
          [18, 84, 5],
          [52, 7, 2.5],
          [92, 52, 2.5],
        ].map(([x, y, s], i) => (
          <path
            key={`${x}-${y}`}
            className="float-piece"
            d={`M${x} ${y - s} Q${x} ${y} ${x + s} ${y} Q${x} ${y} ${x} ${y + s} Q${x} ${y} ${x - s} ${y} Q${x} ${y} ${x} ${y - s} Z`}
            fill={i % 2 ? accent : brand.amber}
          />
        ))}

      {kind === 'sunburst' && (
        <g opacity="0.18" stroke={ink} strokeWidth="1.4">
          {Array.from({ length: 24 }, (_, i) => {
            const angle = (i / 24) * Math.PI * 2
            return (
              <line
                key={i}
                x1={50 + Math.cos(angle) * 18}
                y1={50 + Math.sin(angle) * 18}
                x2={50 + Math.cos(angle) * 80}
                y2={50 + Math.sin(angle) * 80}
              />
            )
          })}
        </g>
      )}
    </svg>
  )
}
