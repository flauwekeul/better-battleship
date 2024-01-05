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
  ship: Ship | null;
};

export type SetProposedShip = {
  type: "setProposedShip";
  ship: Ship | null;
};

export type Action = Fire | Move | SetCurrentInteractiveShip | SetProposedShip;
