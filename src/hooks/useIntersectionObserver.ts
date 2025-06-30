import { useEffect, useRef, useState } from "react";

interface Props {
  onEnter?: () => void;
  onLeave?: () => void;
  options?: IntersectionObserverInit;
}

const useIntersectionObserver = ({ onEnter, onLeave, options = {} }: Props) => {
  const refElement = useRef<null | Element>(null);
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIntersecting(entry.isIntersecting);

      if (entry.isIntersecting) {
        onEnter?.();
      }

      if (!entry.isIntersecting) {
        onLeave?.();
      }
    }, options);

    const el = refElement.current;

    if (el) {
      observer.observe(el);
    }

    return () => {
      if (el) {
        observer.unobserve(el);
      }
    };
  }, [options]);

  return { refElement, isIntersecting };
};

export default useIntersectionObserver;
