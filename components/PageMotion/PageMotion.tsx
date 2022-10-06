import { CSSProperties, ReactNode } from "react";
import styles from "./styles.module.css";

interface Props {
  children: ReactNode;
}

export const Motion = ({ children }: Props) => {
  return <div className={styles.motion}>{children}</div>;
};
