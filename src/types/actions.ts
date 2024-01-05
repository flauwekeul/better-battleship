import { Position, Ship } from "./entities";

export type Fire = {
  type: "fire";
  position: Position;
};

export type Move<T extends Ship = Ship> = {
  type: "move";
  ship: T;
  newPositions: T["positions"];
};

export type SetCurrentInteractiveShip = {
  type: "setCurrentInteractiveShip";
  ship: Ship;
};

export type SetProposedShip = {
  type: "setProposedShip";
  ship: Ship;
};

export type Action = Fire | Move | SetCurrentInteractiveShip | SetProposedShip;
