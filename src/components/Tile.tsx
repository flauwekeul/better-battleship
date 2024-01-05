import { useMemo } from "react";
import { Player, Position, Ship } from "../types/entities";
import clsx from "clsx";
import { getShipAtPosition } from "../domain/functions";

const Tile = ({
  position,
  onTileClick,
  onShipClick,
  player,
  isShipMoveableHere,
}: {
  player: Player;
  position: Position;
  onTileClick: (position: Position) => void;
  onShipClick: (ship: Ship) => void;
  isShipMoveableHere: boolean;
}) => {
  const { x, y } = position;
  const ship = useMemo(() => {
    return getShipAtPosition(position, player.ships);
  }, [player.ships, position]);

  const onShipClickInternal = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    console.log("ship clicked!");
    ship && onShipClick(ship);
  };

  return (
    <div key={`x${x}y${y}`}>
      <div
        className={clsx(
          "after:content-[''] after:p-[50%] after:block",
          "relative w-full text-center",
          {
            "bg-gray-200": x % 2 === (y % 2 === 0 ? 0 : 1),
            "bg-gray-100": x % 2 === (y % 2 === 0 ? 1 : 0),
          }
        )}
        onClick={() => onTileClick(position)}
      >
        {isShipMoveableHere && (
          <div className="absolute w-full h-full bg-green-400 opacity-50" />
        )}
        {ship && (
          <div
            className="absolute w-full h-full bg-gray-400"
            onClick={onShipClickInternal}
          >
            ship
          </div>
        )}
        <span className="pointer-events-none hidden absolute text-xs">
          {x}, {y}
        </span>
      </div>
    </div>
  );
};

export default Tile;
