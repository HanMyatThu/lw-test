import { twMerge } from "tailwind-merge";
import { UseDebounced } from "./use-debounced";

interface GridCellProps {
  rowId: number;
  colId: number;
  text: number | null;
  selectedRows: number[];
  selectedCols: number[];
  onClick: (rowId: number, colId: number) => void;
}

export const GridCell = ({ rowId, colId, text, onClick }: GridCellProps) => {
  const displayedText = UseDebounced(text, 20);
  return (
    <div
      onClick={() => onClick(rowId, colId)}
      className={twMerge(
        "w-8 h-8 items-center bg-white border border-neutral-500 cursor-pointer transition-colors hover:bg-neutral-300 text-black font-semibold text-sm text-center justify-center"
      )}
    >
      {`${displayedText ? displayedText : ""}`}
    </div>
  );
};
