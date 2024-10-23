import { useEffect, useState } from "react";

export const UseDebounced = (value: string | number | null, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState<string | number | null>(
    null
  );
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};
