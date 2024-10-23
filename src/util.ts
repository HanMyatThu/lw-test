const arraysEqual = (arr1: number[], arr2: (number | null)[]): boolean => {
  return (
    arr1.length === arr2.length &&
    arr1.every((value, index) => value === arr2[index])
  );
};

export const isFibonacciMatch = (
  arr: number[][],
  slice: (number | null)[]
): boolean => {
  return arr.some((seq) => arraysEqual(seq, slice));
};
