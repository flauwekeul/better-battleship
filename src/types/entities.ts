export type Position = {
  x: number;
  y: number;
};

export type Carrier = {
  id: string;
  type: "carrier";
  positions: Position[];
  hitPoints: number;
};

export type Battleship = {
  id: string;
  type: "battleship";
  positions: Position[];
  hitPoints: number;
};

export type Destroyer = {
  id: string;
  type: "destroyer";
  positions: Position[];
  hitPoints: number;
};

export type Submarine = {
  id: string;
  type: "submarine";
  positions: Position[];
  hitPoints: number;
};

export type PatrolBoat = {
  id: string;
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
  currentInteractiveShip: Ship | null;
  proposedShip: Ship | null;
  currentPlayer: PlayerId;
  player1: Player;
  player2: Player;
};
