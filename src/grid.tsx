import { useState } from "react";
import { GridCell } from "./grid-cell";

const gridSize = 50;

export const Grid = () => {
  const data: (number | null)[][] = Array.from({ length: gridSize }, () =>
    Array(gridSize).fill(null)
  );
  const [gridData, setGridData] = useState(data);
  const [rows, setROws] = useState<number[]>([]);
  const [removedRow, setRemoveRows] = useState<number[]>([]);
  const [columns, setColumns] = useState<number[]>([]);
  const [removeColumn, setRemovedColumns] = useState<number[]>([]);

  const fibonacci = new Set([1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144]);

  const handleOnClick = async (rowIndex: number, colIndex: number) => {
    increaseCell(rowIndex, colIndex);
    for (let i = 0; i < gridSize; i++) {
      if (i !== colIndex) increaseCell(rowIndex, i);
      if (i !== rowIndex) increaseCell(i, colIndex);
    }

    setTimeout(() => {
      setROws([]);
      setColumns([]);
    }, 100);
  };

  const increaseCell = (row: number, col: number) => {
    const isRowExisted = rows.find((r) => r === row);
    if (!isRowExisted) {
      const newRows: number[] = rows;
      rows.push(row);
      setROws(newRows);
    }

    const isColExisted = columns.find((c) => c === col);
    if (!isColExisted) {
      const newColumns: number[] = columns;
      newColumns.push(col);
      setROws(newColumns);
    }

    const value = gridData[row][col];

    if (value === null) {
      gridData[row][col] = 1;
    } else {
      gridData[row][col] = Number(gridData[row][col]!) + 1;
    }
    setGridData(gridData);
  };

  const fibonacciCheck = (row: number, col: number) => {
    for (let i = 0; i < gridSize; i++) {
      //cells[13][1,2,3,4,5,6,7,8] checking row
      const data: (number | null)[] = gridData[row];
      checkLine(data, row, "row");
    }

    for (let i = 0; i < gridSize; i++) {
      //loop every cell array for a column index
      const column: (number | null)[] = gridData.map((row) => row[col]);
      checkLine(column, col, "col");
    }
  };

  const checkLine = (
    line: (number | null)[],
    mainIndex: number,
    type: "row" | "col"
  ) => {
    const fibonacciArray = Array.from(fibonacci);
    const sequences = [];

    for (let i = 0; i <= fibonacciArray.length - 5; i++) {
      sequences.push(fibonacciArray.slice(i, i + 5));
    }

    for (let i = 0; i <= line.length - 5; i++) {
      const subArray = line.slice(i, i + 5);
      let index = i;
      if (
        sequences.some(
          (seq) => JSON.stringify(seq) === JSON.stringify(subArray)
        )
      ) {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        for (const _ of subArray) {
          if (type === "row") {
            clearCell(mainIndex, index); // Clear row cells
          } else {
            clearCell(index, mainIndex); // Clear column cells
          }
          index++;
        }
      }
    }
  };

  const clearCell = (row: number, col: number) => {
    gridData[row][col] = null;
    setRemoveRows([...removedRow, row]);
    setRemovedColumns([...removeColumn, col]);
  };

  return (
    <div className="flex text-blue-500 text-2xl">
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(50, 22px)",
          gridTemplateRows: "repeat(50, 22px)",
          gap: "1px",
        }}
      >
        {gridData.map((d, rId) => (
          <div key={rId}>
            {d.map((item, cId) => (
              <GridCell
                rowId={rId}
                colId={cId}
                text={item}
                onClick={handleOnClick}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
