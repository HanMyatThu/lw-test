import { twMerge } from "tailwind-merge";
import { useEffect, useState } from "react";

import { UseDebounced } from "./use-debounced";

interface GridCellProps {
  rowId: number;
  colId: number;
  text: number | null;
  onClick: (rowId: number, colId: number) => void;
  isTriggered: boolean;
}

type ChangeType = "add" | "del" | null;

export const GridCell = ({
  rowId,
  colId,
  text,
  onClick,
  isTriggered = false,
}: GridCellProps) => {
  const debouncedValue = UseDebounced(text, 300);
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

  return (
    <div
      onClick={() => onClick(rowId, colId)}
      className={twMerge(
        "w-8 h-8 items-center bg-white border border-neutral-500 cursor-pointer transition-colors text-black font-semibold text-sm text-center justify-center",
        changedColor === "add" && "bg-yellow-200 transition ease-in delay-150",
        changedColor === "del" && "bg-green-400 transition ease-out"
      )}
    >
      {`${debouncedValue ? debouncedValue : ""}`}
    </div>
  );
};
