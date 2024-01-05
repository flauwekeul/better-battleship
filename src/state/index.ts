import { Game, Player, PlayerId, Ship } from "../types/entities";

const randomShips = (): Ship[] => [
  {
    id: "boat1",
    type: "carrier",
    hitPoints: 5,
    positions: [
      { x: 4, y: 9 },
      { x: 5, y: 9 },
      { x: 6, y: 9 },
      { x: 7, y: 9 },
      { x: 8, y: 9 },
    ],
  },
  {
    id: "boat2",
    type: "battleship",
    hitPoints: 4,
    positions: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 3, y: 0 },
    ],
  },
  {
    id: "boat",
    type: "destroyer",
    hitPoints: 3,
    positions: [
      { x: 3, y: 2 },
      { x: 4, y: 2 },
      { x: 5, y: 2 },
    ],
  },
  {
    id: "boat3",
    type: "submarine",
    hitPoints: 3,
    positions: [
      { x: 7, y: 4 },
      { x: 8, y: 4 },
      { x: 9, y: 4 },
    ],
  },
  {
    id: "boat4",
    type: "patrolBoat",
    hitPoints: 2,
    positions: [
      { x: 0, y: 6 },
      { x: 1, y: 6 },
    ],
  },
];

const createPlayer = (id: PlayerId, ships: Ship[]): Player => ({
  id,
  ships,
});

export const initialState: Game = {
  currentInteractiveShip: null,
  proposedShip: null,
  currentPlayer: "player1",
  player1: createPlayer("player1", randomShips()),
  player2: createPlayer("player2", randomShips()),
};
