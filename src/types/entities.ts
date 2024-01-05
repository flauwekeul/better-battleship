export type Coordinates = {
  x: number
  y: number
}

export type Carrier = {
  coordinates: [Coordinates, Coordinates, Coordinates, Coordinates, Coordinates]
  hitPoints: number
}

export type Battleship = {
  coordinates: [Coordinates, Coordinates, Coordinates, Coordinates]
  hitPoints: number
}

export type Destroyer = {
  coordinates: [Coordinates, Coordinates, Coordinates]
  hitPoints: number
}

export type Submarine = {
  coordinates: [Coordinates, Coordinates, Coordinates]
  hitPoints: number
}

export type PatrolBoat = {
  coordinates: [Coordinates, Coordinates]
  hitPoints: number
}

export type Ship = Carrier | Battleship | Destroyer | Submarine | PatrolBoat

export type Ships = {
  carrier: Carrier
  battleship: Battleship
  destroyer: Destroyer
  submarine: Submarine
  patrolBoat: PatrolBoat
}

export type Player = {
  id: PlayerId
  ships: Ships
}

export type PlayerId = 'player1' | 'player2'

export type Game = {
  currentPlayer: PlayerId
  player1: Player
  player2: Player
}
