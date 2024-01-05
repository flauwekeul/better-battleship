import { Game, PatrolBoat, Player } from "../types/entities";

export const INITIAL_GAME: Game = {
  currentInteractiveShip: null,
  proposedShip: null,
  currentPlayer: "player1",
  player1: {
    id: "player1",
    ships: [
      {
        positions: [
          { x: 1, y: 2 },
          { x: 1, y: 3 },
        ],
        hitPoints: 2,
        type: "patrolBoat",
        id: "boat1",
      } as PatrolBoat,
      {
        positions: [
          { x: 5, y: 4 },
          { x: 6, y: 4 },
        ],
        hitPoints: 2,
        type: "patrolBoat",
        id: "boat2",
      } as PatrolBoat,
    ],
  } as Player,
  player2: {
    id: "player2",
    ships: [],
  } as Player,
};
