export interface VenueTable {
  number: number
  seats: number
  arrived: number
  guests: string[]
}

const names = [
  'Lucía', 'Andrés', 'Camila', 'Joaquín', 'Renata', 'Emiliano', 'Ximena', 'Santiago',
  'Mariana', 'Diego', 'Fernanda', 'Rodrigo', 'Daniela', 'Iván', 'Paula', 'Tomás',
  'Elena', 'Bruno', 'Isabel', 'Gael', 'Regina', 'Hugo', 'Natalia', 'Pablo',
]

/** Mesa a la que se asigna al invitado del simulador de escaneo QR. */
export const SCANNED_TABLE = 12

/** 25 mesas de muestra con llegadas deterministas (render estable). */
export const venueTables: VenueTable[] = Array.from({ length: 25 }, (_, index) => {
  const number = index + 1
  const seats = number % 5 === 0 ? 10 : 8
  const arrived = number === SCANNED_TABLE ? seats - 1 : (number * 7) % (seats + 1)
  const guests = Array.from({ length: seats }, (_, seat) => names[(index * 3 + seat) % names.length])
  return { number, seats, arrived, guests }
})

export const venueTotals = venueTables.reduce(
  (totals, table) => ({ seats: totals.seats + table.seats, arrived: totals.arrived + table.arrived }),
  { seats: 0, arrived: 0 },
)
