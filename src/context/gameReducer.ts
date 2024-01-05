import { Action } from "../types/actions";
import { Game } from "../types/entities";

export const gameReducer = (state: Game, action: Action) => {
  switch (action.type) {
    case "setCurrentInteractiveShip":
      return {
        ...state,
        currentInteractiveShip: action.ship,
        proposedShip: action.ship === null ? null : state.proposedShip,
      };

    case "setProposedShip":
      return {
        ...state,
        proposedShip: action.ship,
      };

    case "move":
      const currentPlayerState = {
        ...(state.currentPlayer === "player1" ? state.player1 : state.player2),
      };
      const newPlayer = {
        ...currentPlayerState,
        ships: currentPlayerState.ships.map((ship) => {
          if (ship.id === action.ship.id) {
            return {
              ...ship,
              positions: action.newPositions,
            };
          }
          return ship;
        }),
      };

      if (state.currentPlayer === "player1") {
        state.player1 = newPlayer;
      } else {
        state.player2 = newPlayer;
      }

      return {
        ...state,
        currentInteractiveShip: null,
        proposedShip: null,
      };
    case "fire":
      return state;
    default:
      return state;
  }
};
