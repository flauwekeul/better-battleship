import { Player, Position, Ship } from "../types/entities";
import clsx from "clsx";

const isShipAtPosition = (
  position: Position,
  ships: Ship[]
): { hasShip: boolean; ship?: Ship } => {
  const ship = ships.find((ship) => {
    return ship.positions.find((coordinate) => {
      return coordinate.x === position.x && coordinate.y === position.y;
    });
  });

  return ship ? { hasShip: true, ship } : { hasShip: false };
};

const Tile = ({
  position,
  onTileClick,
  player,
}: {
  player: Player;
  position: Position;
  onTileClick: (position: Position) => void;
}) => {
  const { x, y } = position;

  const onShipClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.preventDefault();
    event.stopPropagation();

    console.log("ship clicked!");
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
        {isShipAtPosition(position, player.ships).hasShip && (
          <div
            className="absolute w-full h-full bg-gray-400"
            onClick={onShipClick}
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
