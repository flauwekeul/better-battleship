import { Coordinates, Ship } from './entities'

export type Fire = {
  type: 'fire'
  coordinates: Coordinates
}

export type Move<T extends Ship> = {
  type: 'move'
  ship: T
  coordinates: T['coordinates']
}
