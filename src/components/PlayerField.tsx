import { useMemo } from "react";
import clsx from "clsx";
import { Coordinates, PatrolBoat, PlayerId, Ship } from "../types/entities";

type Props = {
  playerId: PlayerId;
};

const createGrid = (x: number, y: number): Array<Array<Coordinates>> => {
  const grid = [];

  for (let i = 0; i < y; i++) {
    const row = new Array<Coordinates>();
    for (let j = 0; j < x; j++) {
      row.push({ x: j, y: i } as Coordinates);
    }
    grid.push(row);
  }

  return grid;
};

const isShipAtPosition = (
  x: number,
  y: number,
  ships: Ship[]
): { hasShip: boolean; ship?: Ship } => {
  const ship = ships.find((ship) => {
    return ship.coordinates.find((coordinate) => {
      return coordinate.x === x && coordinate.y === y;
    });
  });

  return ship ? { hasShip: true, ship } : { hasShip: false };
};

const PlayerField = ({ playerId }: Props) => {
  const grid = useMemo(() => {
    return createGrid(10, 10);
  }, []);

  const ships = useMemo(() => {
    if (playerId !== "player1") {
      return [];
    }
    return [
      {
        coordinates: [
          { x: 1, y: 1 } as Coordinates,
          { x: 1, y: 2 } as Coordinates,
        ] as PatrolBoat["coordinates"],
        hitPoints: 2,
      },
      {
        coordinates: [
          { x: 5, y: 4 } as Coordinates,
          { x: 6, y: 4 } as Coordinates,
        ] as PatrolBoat["coordinates"],
        hitPoints: 2,
      },
    ];
  }, [playerId]);

  const onGridClick = (x: number, y: number) => {
    console.log("onGridClick", x, y, playerId);
  };

  return (
    <div className="relative bg-white p-4">
      {grid.map((row, y) => (
        <div className="grid grid-cols-10" key={y}>
          {row.map(({ x, y }) => (
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
                onClick={() => onGridClick(x, y)}
              >
                {isShipAtPosition(x, y, ships).hasShip && (
                  <div className="absolute w-full h-full bg-gray-400">ship</div>
                )}
                <span className="pointer-events-none hidden absolute text-xs">
                  {x}, {y}
                </span>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default PlayerField;
