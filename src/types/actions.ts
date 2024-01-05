import { Position, Ship } from './entities'

export type Fire = {
  type: 'fire'
  position: Position
}

export type Move<T extends Ship = Ship> = {
  type: 'move'
  ship: T
  positions: T['positions']
}

export type Action = Fire | Move
