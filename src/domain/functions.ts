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
  const shipsWithoutCurrentShip = allShips.filter(
    (s) => s.type !== ship.type
  ) as Ship[];

  if (!!getShipAtPosition(position, shipsWithoutCurrentShip)) {
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

const isPositionsHorizontal = (positions: Position[]): boolean => {
  return positions[0].y === positions[1].y;
};

const getShipPositionsInsideBoundsWithDirection = (
  position: Position,
  ship: Ship,
  ships: Ship[],
  direction: Direction
): Position[] | null => {
  if (direction === "left") {
    // get all positions to the left of the first position
    const positions = [position];

    for (let i = 1; i < ship.positions.length; i++) {
      const nextPosition = {
        x: position.x - i,
        y: position.y,
      };

      if (isShipMovableHere(ship, nextPosition, ships)) {
        positions.push(nextPosition);
      }
    }

    if (positions.length === ship.positions.length) {
      return positions;
    }
  }

  return null;
};

const DIRECTIONS: Direction[] = ["up", "right", "down", "left"];

const getNextDirection = (direction: Direction): Direction => {
  const index = DIRECTIONS.indexOf(direction);
  return DIRECTIONS[(index + 1) % DIRECTIONS.length];
};

const getProposedInitialDirection = (
  position: Position,
  ship: Ship
): "left" | "right" | "up" | "down" => {
  const isHorizontal = isPositionsHorizontal(ship.positions);

  if (isHorizontal) {
    // we want to suggest positions left first if x is further out
    if (position.x > ship.positions[0].x) {
      // try left first
      return "left";
    } else {
      // try right first
      return "right";
    }
  } else {
    // we want to suggest positions up first if y is further out
    if (position.y > ship.positions[0].y) {
      // try up first
      return "up";
    } else {
      // try down first
      return "down";
    }
  }
};

export const getShipPositionsInsideBounds = (
  position: Position,
  ship: Ship,
  ships: Ship[]
): Position[] | null => {
  let currentDirection = getProposedInitialDirection(position, ship);
  console.log("trying direction", currentDirection);
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
      return positions;
    }

    currentDirection = getNextDirection(currentDirection);
  }

  return null;
};
