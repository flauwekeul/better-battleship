export type Position = {
  x: number;
  y: number;
};

export type Carrier = {
  type: "carrier";
  positions: Position[];
  hitPoints: number;
};

export type Battleship = {
  type: "battleship";
  positions: Position[];
  hitPoints: number;
};

export type Destroyer = {
  type: "destroyer";
  positions: Position[];
  hitPoints: number;
};

export type Submarine = {
  type: "submarine";
  positions: Position[];
  hitPoints: number;
};

export type PatrolBoat = {
  type: "patrolBoat";
  positions: Position[];
  hitPoints: number;
};

export type Ship = Carrier | Battleship | Destroyer | Submarine | PatrolBoat;

export type ShipLength = 5 | 4 | 3 | 2;

export type Orientation = "horizontal" | "vertical";

export type Direction = "up" | "down" | "left" | "right";

export type Player = {
  id: PlayerId;
  ships: Ship[];
};

export type PlayerId = "player1" | "player2";

export type Game = {
  currentPlayer: PlayerId;
  player1: Player;
  player2: Player;
};
