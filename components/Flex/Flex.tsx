import { CSSProperties, ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  column?: boolean;
  gap?: number;
  justifyContent?: "center" | "space-between" | "flex-end" | "flex-start";
  alignItems?: "center" | "flex-start" | "flex-end";
  wrap?: boolean;
}

export const Flex = ({
  children,
  className,
  style: styleProp,
  column,
  gap,
  justifyContent,
  alignItems,
  wrap,
}: Props) => {
  const style: CSSProperties = {
    display: "flex",
    flexDirection: column ? "column" : "row",
    gap: gap ? `${gap}rem` : "0",
    justifyContent,
    alignItems,
    flexWrap: wrap ? "wrap" : "nowrap",
    ...styleProp,
  };

  return <div {...{ className, style }}>{children}</div>;
};
