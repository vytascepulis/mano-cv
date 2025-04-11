import { useEffect } from "react";

interface Props {
  element: React.RefObject<HTMLElement | null>;
  callback: () => void;
  ignores?: React.RefObject<HTMLElement | null>[];
}

function useClickOutside({ element, callback, ignores }: Props) {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (!element.current) return;

      let ignore = false;

      ignores?.forEach((node) => {
        if (node.current?.contains(event.target as Node)) {
          ignore = true;
        }
      });

      if (ignore) {
        return;
      }

      if (element.current && !element.current.contains(event.target as Node)) {
        callback();
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [ignores, element, callback]);
}

export default useClickOutside;
