import { ReactNode } from "react";

export const BadgeCell = ({
  value,
  isError,
}: {
  value: ReactNode;
  isError?: boolean;
}) => {
  const backgroundColor = !isError ? "#EDF2F9" : "#FCEBEE";
  const color = !isError ? "#6E84A3" : "#E63757";

  return (
    <p
      style={{
        margin: 0,
        backgroundColor,
        display: "inline",
        padding: "0.2rem 0.4rem",
        borderRadius: "4px",
        color,
      }}
    >
      {value}
    </p>
  );
};
