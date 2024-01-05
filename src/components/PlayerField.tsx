import { useMemo } from "react";
import clsx from "clsx";

type Props = {
  playerName: string;
};

type Coordinate = {
  x: number;
  y: number;
};

const createGrid = (x: number, y: number): Array<Array<Coordinate>> => {
  const grid = [];

  for (let i = 0; i < y; i++) {
    const row = new Array<Coordinate>();
    for (let j = 0; j < x; j++) {
      row.push({ x: j, y: i } as Coordinate);
    }
    grid.push(row);
  }

  return grid;
};

const PlayerField = ({ playerName }: Props) => {
  const grid = useMemo(() => {
    return createGrid(10, 10);
  }, []);

  const onGridClick = (x: number, y: number) => {
    console.log("onGridClick", x, y, playerName);
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
