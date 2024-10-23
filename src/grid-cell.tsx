import { twMerge } from "tailwind-merge";
import { useEffect, useState } from "react";

interface GridCellProps {
  rowId: number;
  colId: number;
  text: number | null;
  onClick: (rowId: number, colId: number) => void;
}

export const GridCell = ({ rowId, colId, text, onClick }: GridCellProps) => {
  const [changedColor, setChangeColor] = useState(false);

  useEffect(() => {
    if (text) {
      setChangeColor(true);

      const timer = setTimeout(() => {
        setChangeColor(false);
      }, 150);

      return () => clearTimeout(timer);
    }
  }, [text]);

  return (
    <div
      onClick={() => onClick(rowId, colId)}
      className={twMerge(
        "w-8 h-8 items-center bg-white border border-neutral-500 cursor-pointer transition-colors text-black font-semibold text-sm text-center justify-center",
        changedColor && "bg-yellow-200"
      )}
    >
      {`${text ? text : ""}`}
    </div>
  );
};
