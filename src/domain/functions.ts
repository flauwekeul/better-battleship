import { Position, Ship } from "../types/entities";

export const getShipAtPosition = (
  position: Position,
  ships: Ship[]
): Ship | undefined =>
  ships.find((ship) =>
    ship.positions.some(({ x, y }) => x === position.x && y === position.y)
  );

const getDistance = (position1: Position, position2: Position): number => {
  const xDistance = Math.abs(position1.x - position2.x);
  const yDistance = Math.abs(position1.y - position2.y);

  return xDistance + yDistance;
};

export const isShipMovableHere = (
  ship: Ship,
  position: Position,
  allShips: Ship[]
): boolean => {
  if (!!getShipAtPosition(position, allShips)) {
    console.log("damn ship already here bro");
    return false;
  }

  if (
    ship.positions.some(
      (shipPosition) => getDistance(shipPosition, position) <= 2
    )
  ) {
    return true;
  }

  return false;
};
