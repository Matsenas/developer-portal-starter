import React, { CSSProperties, ReactNode, useEffect, useRef } from "react";

const useClickOutside = ({ elementRef, onClickOutside }) => {
  useEffect(() => {
    function onMouseDown(event) {
      if (!elementRef || !elementRef.current) return;
      !elementRef.current.contains(event.target) && onClickOutside?.();
    }

    document.addEventListener("mousedown", onMouseDown);
    return () => {
      document.removeEventListener("mousedown", onMouseDown);
    };
  }, []);

  return { elementRef };
};

interface Props {
  onClickOutside: () => void;
  children: ReactNode;
  style?: CSSProperties;
}

export const OutsideClick = ({ onClickOutside, children, style }: Props) => {
  const elementRef = useRef(null);
  useClickOutside({ elementRef, onClickOutside });
  return (
    <div ref={elementRef} style={style}>
      {children}
    </div>
  );
};
