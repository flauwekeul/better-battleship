import { useMemo } from "react";
import { Player, Position, Ship } from "../types/entities";
import clsx from "clsx";
import {
  getShipAtPosition,
  isPositionsHorizontal,
  isShipPositionHere,
} from "../domain/functions";

const getPartOfShip = (position: Position, ship: Ship) => {
  if (isPositionsHorizontal(ship.positions)) {
    const isFirstPart = ship.positions[0].x === position.x;
    if (isFirstPart) {
      return "first part";
    }

    const isLastPart =
      ship.positions[ship.positions.length - 1].x === position.x;
    if (isLastPart) {
      return "last part";
    }

    return "middle part";
  }
};

const Tile = ({
  tileId,
  position,
  onTileClick,
  onShipClick,
  onMoveAreaClick,
  player,
  proposedShip,
  isShipMoveableHere,
}: {
  tileId: string;
  player: Player;
  position: Position;
  onTileClick: (position: Position) => void;
  onShipClick: (ship: Ship) => void;
  onMoveAreaClick: (position: Position) => void;
  isShipMoveableHere: boolean;
  proposedShip: Ship | null;
}) => {
  const { x, y } = position;

  const ship = useMemo(() => {
    return getShipAtPosition(position, player.ships);
  }, [player.ships, position]);

  const isProposedShipHere = proposedShip
    ? isShipPositionHere(position, proposedShip)
    : false;

  const onShipClickInternal = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();
    ship && onShipClick(ship);
  };

  const onMoveAreaClickInternal = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    onMoveAreaClick(position);
  };

  const onTileClickInternal = () => {
    explodeTile();
    onTileClick(position);
  };

  const explodeTile = () => {
    const damagedTile = document.getElementById(tileId);
    const explosionEffect: HTMLSpanElement = document.createElement("span");
    explosionEffect.innerHTML = '<span class="explosion"></span>';
    setTimeout(() => {
      damagedTile?.appendChild(explosionEffect);
    }, 200);
    setTimeout(() => {
      damagedTile?.removeChild(explosionEffect);
    }, 1300);
  };

  const isShipShown =
    !!ship &&
    (!proposedShip ||
      (!!proposedShip && !isShipMoveableHere && proposedShip.id !== ship.id));

  return (
    <div key={`x${x}y${y}`}>
      <div
        id={tileId}
        className={clsx(
          "after:content-[''] after:p-[50%] after:block",
          "relative w-full text-center",
          {
            "bg-gray-200":
              x % 2 === (y % 2 === 0 ? 0 : 1) && !isShipMoveableHere,
            "bg-gray-100":
              x % 2 === (y % 2 === 0 ? 1 : 0) && !isShipMoveableHere,
          }
        )}
        onClick={onTileClickInternal}
      >
        {isShipMoveableHere && (
          <div
            className="absolute w-full h-full bg-green-400 opacity-50 z-10"
            onClick={onMoveAreaClickInternal}
          />
        )}

        {isProposedShipHere && (
          <div className="absolute w-full h-full bg-gray-400" />
        )}

        {isShipShown && (
          <div
            className="absolute w-full h-full bg-gray-400"
            onClick={onShipClickInternal}
          >
            {getPartOfShip(position, ship)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Tile;
