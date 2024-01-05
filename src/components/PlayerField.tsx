import { useMemo } from "react";
import clsx from "clsx";
import { Position, PatrolBoat, PlayerId, Ship } from "../types/entities";

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

const isShipAtPosition = (
  x: number,
  y: number,
  ships: Ship[]
): { hasShip: boolean; ship?: Ship } => {
  const ship = ships.find((ship) => {
    return ship.positions.find((coordinate) => {
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
        positions: [
          { x: 1, y: 1 },
          { x: 1, y: 2 },
        ],
        hitPoints: 2,
        type: "patrolBoat",
      } as PatrolBoat,
      {
        positions: [
          { x: 5, y: 4 },
          { x: 6, y: 4 },
        ],
        hitPoints: 2,
        type: "patrolBoat",
      } as PatrolBoat,
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
