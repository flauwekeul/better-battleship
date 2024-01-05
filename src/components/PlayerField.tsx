import { useMemo } from "react";
import clsx from "clsx";
import { Position, PlayerId, Ship } from "../types/entities";
import { useGameContext } from "../context/context";
import Tile from "./Tile";

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

  const player = useMemo(() => {
    return playerId === "player1" ? gameContext.player1 : gameContext.player2;
  }, [playerId, gameContext]);

  const grid = useMemo(() => {
    return createGrid(10, 10);
  }, []);

  const onTileClick = (position: Position) => {
    console.log("onTileClick", position, playerId);
  };

  return (
    <div className="relative bg-white p-4">
      {grid.map((row, y) => (
        <div className="grid grid-cols-10" key={y}>
          {row.map((position) => (
            <Tile
              position={position}
              onTileClick={onTileClick}
              player={player}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default PlayerField;
