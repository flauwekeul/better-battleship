import { Position, Ship } from '../types/entities'

export const getShipAtPosition = (position: Position, ships: Ship[]): Ship | undefined =>
  ships.find((ship) => ship.positions.some(({ x, y }) => x === position.x && y === position.y))
