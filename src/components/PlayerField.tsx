import { useMemo, useState } from "react";
import { Position, PlayerId, Ship } from "../types/entities";
import { useGameContext } from "../context/context";
import Tile from "./Tile";
import {
  getShipPositionsInsideBounds,
  isShipMovableHere,
  isShipPositionHere,
} from "../domain/functions";

type Props = {
  playerId: PlayerId;
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

const PlayerField = ({ playerId }: Props) => {
  const gameContext = useGameContext();
  const [activeShip, setActiveShip] = useState<Ship | null>(null);
  const [proposedShip, setProposedShip] = useState<Ship | null>(null);
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
    setActiveShip(ship);
  };

  const onMoveAreaClick = (position: Position) => {
    console.log("move here?", position);
    if (activeShip) {
      const positions = getShipPositionsInsideBounds(
        position,
        activeShip,
        player.ships
      );

      if (positions !== null) {
        console.log("we got a proposed ship");
        setProposedShip({ ...activeShip, positions });
      }
    }
  };

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
              proposedShip={proposedShip}
              isShipMoveableHere={
                activeShip
                  ? isShipMovableHere(activeShip, position, player.ships)
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
