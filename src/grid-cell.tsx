import { twMerge } from "tailwind-merge";
import { useEffect, useState } from "react";

import { UseDebounced } from "./use-debounced";

interface ISelectedCells {
  rowIndex: number;
  colIndex: number;
}

interface GridCellProps {
  rowId: number;
  colId: number;
  text: number | null;
  onClick: (rowId: number, colId: number) => void;
  isTriggered: boolean;
  selectedCells: ISelectedCells[];
  removedCells: ISelectedCells[];
}

type ChangeType = "add" | "del" | null;

export const GridCell = ({
  rowId,
  colId,
  text,
  onClick,
  isTriggered = false,
  selectedCells = [],
  removedCells,
}: GridCellProps) => {
  const debouncedValue = UseDebounced(text, 200);
  const [changedColor, setChangeColor] = useState<ChangeType>(null);

  useEffect(() => {
    if (text && !isTriggered) {
      setChangeColor("add");
    } else if (text === 0 && isTriggered) {
      setChangeColor("del");
    }
    const timer = setTimeout(() => {
      setChangeColor(null);
    }, 300);

    return () => clearTimeout(timer);
  }, [text, isTriggered]);

  const isCellSelected = selectedCells.find(
    (cell) => cell.colIndex === colId && cell.rowIndex === rowId
  );

  const isCellRemoved = removedCells.find(
    (cell) => cell.colIndex === colId && cell.rowIndex === rowId
  );

  return (
    <div
      onClick={() => onClick(rowId, colId)}
      className={twMerge(
        "w-8 h-8 flex mt-1 bg-white border border-neutral-300 cursor-pointer transition-colors text-neutral-900/80 hover:text-neutral-500 font-semibold text-sm text-center justify-center items-center shadown-sm rounded-md",
        changedColor === "add" &&
          isCellSelected &&
          "bg-yellow-200 transition ease-in delay-150",
        changedColor === "del" &&
          isCellRemoved &&
          "bg-green-400 transition ease-out "
      )}
    >
      {`${debouncedValue ? debouncedValue : ""}`}
    </div>
  );
};
