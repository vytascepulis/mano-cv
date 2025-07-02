import { useRef, useState } from "react";

const useElementSize = () => {
  const [size, setSize] = useState<{ width: number; height: number } | null>(
    null,
  );
  const refElement = useRef<null | Element>(null);

  const calculate = () => {
    const rect = refElement.current?.getBoundingClientRect();

    if (rect) {
      setSize({ height: rect.height, width: rect.width });
    }
  };

  return { refElement, size, calculate };
};

export default useElementSize;
