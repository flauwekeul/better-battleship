import { Action } from "../types/actions";
import { Game } from "../types/entities";

export const gameReducer = (state: Game, action: Action) => {
  switch (action.type) {
    case "fire":
      return state;
    default:
      return state;
  }
};
