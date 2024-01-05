import { useCallback, useMemo } from "react";
import { Position, PlayerId, Ship } from "../types/entities";
import { useGameContext } from "../context/context";
import Tile from "./Tile";
import {
  getShipPositionsInsideBounds,
  isShipMovableHere,
} from "../domain/functions";

type Props = {
  playerId: PlayerId;
  isCurrentPlayer: boolean;
};

const createGrid = (x: number, y: number): Array<Array<Position>> => {
  const grid = [];

  for (let i = 0; i < y; i++) {
    const row = new Array<Position>();
    for (let j = 0; j < x; j++) {
      row.push({ x: j, y: i } as Position);
    }
    grid.push(row);
  }

  return grid;
};

const PlayerField = ({ playerId, isCurrentPlayer }: Props) => {
  const gameContext = useGameContext();
  const { currentInteractiveShip, proposedShip, dispatch } = gameContext;

  const boardName = `board${playerId}`;

  const player = useMemo(() => {
    return playerId === "player1" ? gameContext.player1 : gameContext.player2;
  }, [playerId, gameContext]);

  const grid = useMemo(() => {
    return createGrid(10, 10);
  }, []);

  const onTileClick = (position: Position) => {
    console.log("onTileClick", position, playerId);
  };

  const onShipClick = (ship: Ship) => {
    dispatch({ type: "setCurrentInteractiveShip", ship });
  };

  const onMoveAreaClick = useCallback(
    (position: Position) => {
      if (currentInteractiveShip) {
        const positions = getShipPositionsInsideBounds(
          { x: position.x, y: position.y },
          currentInteractiveShip,
          player.ships,
          proposedShip
        );

        if (positions !== null) {
          dispatch({
            type: "setProposedShip",
            ship: {
              ...currentInteractiveShip,
              positions,
            },
          });
        }
      }
    },
    [proposedShip, currentInteractiveShip, player.ships]
  );

  return (
    <div className="relative bg-white p-4">
      {grid.map((row, y) => (
        <div className="grid grid-cols-10" key={y}>
          {row.map((position) => (
            <Tile
              tileId={`x${position.x}y${position.y}${boardName}`}
              key={`x${position.x}y${position.y}`}
              position={position}
              onTileClick={onTileClick}
              onShipClick={onShipClick}
              onMoveAreaClick={onMoveAreaClick}
              player={player}
              proposedShip={isCurrentPlayer ? proposedShip : null}
              isShipMoveableHere={
                isCurrentPlayer && !!currentInteractiveShip
                  ? isShipMovableHere(
                      currentInteractiveShip,
                      position,
                      player.ships
                    )
                  : false
              }
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default PlayerField;
