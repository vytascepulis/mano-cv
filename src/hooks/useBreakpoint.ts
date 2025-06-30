import { useEffect, useState } from "react";

const breakpoints = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

const getBreakpoint = (screenWidth: number) => {
  if (screenWidth > 0 && screenWidth < breakpoints.md) {
    return "sm";
  }
  if (screenWidth >= breakpoints.md && screenWidth < breakpoints.lg) {
    return "md";
  }
  if (screenWidth >= breakpoints.lg && screenWidth < breakpoints.xl) {
    return "lg";
  }
  if (screenWidth >= breakpoints.xl && screenWidth < breakpoints["2xl"]) {
    return "xl";
  }
  if (screenWidth >= breakpoints["2xl"]) {
    return "2xl";
  }
};

function useBreakpoint() {
  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0,
  );

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return getBreakpoint(width);
}

export default useBreakpoint;
