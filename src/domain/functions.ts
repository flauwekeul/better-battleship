import { Direction, Position, Ship } from "../types/entities";

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

export const isShipPositionHere = (position: Position, ship: Ship): boolean => {
  return ship.positions.some(
    (shipPosition) =>
      shipPosition.x === position.x && shipPosition.y === position.y
  );
};

export const isShipMovableHere = (
  ship: Ship,
  position: Position,
  allShips: Ship[]
): boolean => {
  if (position.x < 0 || position.y < 0 || position.x > 9 || position.y > 9) {
    return false;
  }

  const shipsWithoutCurrentShip = allShips.filter(
    (s) => s.type !== ship.type
  ) as Ship[];

  if (!!getShipAtPosition(position, shipsWithoutCurrentShip)) {
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

const isPositionsHorizontal = (positions: Position[]): boolean => {
  return positions[0].y === positions[1].y;
};

const getShipPositionsInsideBoundsWithDirection = (
  position: Position,
  ship: Ship,
  ships: Ship[],
  direction: Direction
): Position[] | null => {
  // get all positions to the left of the first position
  const positions = [position];
  let nextPosition: Position | null = null;

  for (let i = 1; i < ship.positions.length; i++) {
    if (direction === "left") {
      nextPosition = {
        x: position.x - i,
        y: position.y,
      };
    } else if (direction === "up") {
      nextPosition = {
        x: position.x,
        y: position.y - i,
      };
    } else if (direction === "down") {
      nextPosition = {
        x: position.x,
        y: position.y + i,
      };
    } else if (direction === "right") {
      nextPosition = {
        x: position.x + i,
        y: position.y,
      };
    }

    if (nextPosition && isShipMovableHere(ship, nextPosition, ships)) {
      positions.push(nextPosition);
    }

    if (positions.length === ship.positions.length) {
      return positions;
    }
  }

  return null;
};

const isSamePosition = (position1: Position, position2: Position): boolean => {
  return position1.x === position2.x && position1.y === position2.y;
};

const DIRECTIONS: Direction[] = ["down", "right", "up", "left"];

const getNextDirection = (direction: Direction): Direction => {
  const index = DIRECTIONS.indexOf(direction);
  return DIRECTIONS[(index + 1) % DIRECTIONS.length];
};

const getProposedInitialDirection = (
  ship: Ship
): "left" | "right" | "up" | "down" => {
  const isHorizontal = isPositionsHorizontal(ship.positions);

  if (isHorizontal) {
    return "left";
  }

  return "up";
};

const getProposedInitialDirectionByShip = (ship: Ship) => {
  if (ship.positions[0].x !== ship.positions[1].x) {
    if (ship.positions[0].x > ship.positions[1].x) {
      return getNextDirection("left");
    }
    return getNextDirection("right");
  } else {
    if (ship.positions[0].y > ship.positions[1].y) {
      return getNextDirection("up");
    }

    return getNextDirection("down");
  }
};

export const getShipPositionsInsideBounds = (
  position: Position,
  ship: Ship,
  ships: Ship[],
  proposedShip: Ship | null
): Position[] | null => {
  let currentDirection =
    proposedShip && isSamePosition(proposedShip.positions[0], position)
      ? getProposedInitialDirectionByShip(proposedShip)
      : getProposedInitialDirection(ship);

  const shipsWithoutCurrentShip = ships.filter(
    (s) => s.type !== ship.type
  ) as Ship[];

  for (let i = 0; i < DIRECTIONS.length; i++) {
    const positions = getShipPositionsInsideBoundsWithDirection(
      position,
      ship,
      shipsWithoutCurrentShip,
      currentDirection
    );

    if (positions) {
      console.log("[success direction]", currentDirection);
      return positions;
    }

    currentDirection = getNextDirection(currentDirection);
  }

  return null;
};
