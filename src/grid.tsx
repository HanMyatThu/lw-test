import { useEffect, useState } from "react";

import { GridCell } from "./grid-cell";
import toast from "react-hot-toast";
import { isFibonacciMatch } from "./util";

interface GridProps {
  gridSize: number;
  gridData: (number | null)[][];
}

interface ISelectedCells {
  rowIndex: number;
  colIndex: number;
}

export const Grid = ({ gridSize, gridData }: GridProps) => {
  const [selectedCells, setSelectedCells] = useState<ISelectedCells[]>([]);
  const [removedCells, setRemovedCells] = useState<ISelectedCells[]>([]);
  const [isTriggered, setIsTriggered] = useState<boolean>(false);

  const fibonacci = new Set([1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144]);

  useEffect(() => {
    if (isTriggered) {
      toast("Removed Numbers", {
        duration: 2000,
        className: "text-blue-500 font-semibold",
      });
    }
  }, [isTriggered]);

  const handleOnClick = async (rowIndex: number, colIndex: number) => {
    setSelectedCells(() => []);
    setRemovedCells(() => []);
    setIsTriggered(false);

    increaseCell(rowIndex, colIndex);
    for (let i = 0; i < gridSize; i++) {
      if (i !== colIndex) increaseCell(rowIndex, i);
      if (i !== rowIndex) increaseCell(i, colIndex);
    }

    // add delay to display first before removing the numbers
    await new Promise((resolve) => setTimeout(resolve, 2500));
    checkFibonnaci();
  };

  const increaseCell = (row: number, col: number) => {
    const value = gridData[row][col];

    setSelectedCells((prevCells) => {
      const newCells = [...prevCells, { rowIndex: row, colIndex: col }];
      return newCells;
    });

    if (value === null || value === 0) {
      gridData[row][col] = 1;
    } else {
      gridData[row][col] = Number(gridData[row][col]!) + 1;
    }
  };

  const checkFibonnaci = () => {
    const fibonacciArray = Array.from(fibonacci);
    const sequences = [];

    for (let i = 0; i <= fibonacciArray.length - 5; i++) {
      sequences.push(fibonacciArray.slice(i, i + 5));
    }

    // remove vertically
    for (let rowIndex = 0; rowIndex < gridData.length; rowIndex++) {
      const row = gridData[rowIndex];
      for (let colIndex = 0; colIndex <= row.length - 5; colIndex++) {
        const slice = row.slice(colIndex, colIndex + 5);
        if (isFibonacciMatch(sequences, slice)) {
          for (let i = colIndex; i < colIndex + 5; i++) {
            gridData[rowIndex][i] = 0;
            setIsTriggered(true);

            setRemovedCells((prevCells) => {
              const newCells = [
                ...prevCells,
                { rowIndex: rowIndex, colIndex: i },
              ];
              return newCells;
            });
          }
        }
      }
    }

    //remove horizontally
    for (let colIndex = 0; colIndex < gridData[0].length; colIndex++) {
      for (let rowIndex = 0; rowIndex <= gridData.length - 5; rowIndex++) {
        const slice = [
          gridData[rowIndex][colIndex],
          gridData[rowIndex + 1][colIndex],
          gridData[rowIndex + 2][colIndex],
          gridData[rowIndex + 3][colIndex],
          gridData[rowIndex + 4][colIndex],
        ];
        if (isFibonacciMatch(sequences, slice)) {
          for (let i = 0; i < 5; i++) {
            gridData[rowIndex + i][colIndex] = 0;
            setIsTriggered(true);

            setRemovedCells((prevCells) => {
              const newCells = [
                ...prevCells,
                { rowIndex: rowIndex + i, colIndex: colIndex },
              ];
              return newCells;
            });
          }
        }
      }
    }
  };

  return (
    <div className="flex text-blue-500 text-2xl">
      <div
        className="grid gap-1"
        style={{
          gridTemplateColumns: "repeat(50, 32px)",
          gridTemplateRows: "repeat(50, 32px)",
        }}
      >
        {gridData.map((d, rId) => (
          <div key={rId}>
            {d.map((item, cId) => (
              <GridCell
                key={`${rId}-${cId}`}
                rowId={rId}
                colId={cId}
                text={item}
                onClick={handleOnClick}
                selectedCells={selectedCells}
                removedCells={removedCells}
                isTriggered={isTriggered}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
