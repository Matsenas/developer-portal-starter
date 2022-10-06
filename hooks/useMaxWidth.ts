import { useEffect, useRef } from "react";

export enum SIZE {
  S = "440",
  L = "1100"
}

interface Props {
  size: SIZE;
  handler: (matches: boolean) => void;
}

export const useMaxWidth = ({ size, handler }: Props) => {
  const mqlRef = useRef(window.matchMedia(`(max-width: ${size}px)`));

  const internal = (e: any) => {
    handler(e.matches);
  };

  useEffect(() => {
    mqlRef.current.addEventListener("change", internal);
    return () => {
      mqlRef.current.removeEventListener("change", internal);
    };
  }, []);
};
