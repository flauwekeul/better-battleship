import { Dispatch, createContext, useContext, useReducer } from "react";
import { Game } from "../types/entities";
import { gameReducer } from "./gameReducer";
import { Action } from "../types/actions";
import { INITIAL_GAME } from "./initial";

type GameContextType = Game & { dispatch: Dispatch<Action> };

export const GameContext = createContext<GameContextType>(
  null as unknown as GameContextType
);

export const GameContextWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [game, dispatch] = useReducer(gameReducer, INITIAL_GAME);

  return (
    <GameContext.Provider
      value={{
        ...game,
        dispatch,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGameContext = () => useContext(GameContext);
