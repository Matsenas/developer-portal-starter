import Link from "next/link";
import { CSSProperties } from "react";
import { Form } from "react-bootstrap";
import { Flex } from "../Flex/Flex";

interface Props {
  name: string;
  value: string | number;
  label?: string;
  onValueChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: "email" | "password" | "text" | "number";
  note?: string;
  error?: string;
  readonly?: boolean;
  helpLink?: {
    title: string;
    path: string;
  };
  onClick?: (event: React.MouseEvent) => void;
  style?: CSSProperties;
}

export const Input = ({
  placeholder,
  type,
  value,
  onValueChange,
  name,
  label,
  note,
  error,
  readonly,
  helpLink,
  onClick,
  style,
}: Props) => {
  const shouldRenderAccesory = label || helpLink;

  return (
    <Flex column style={{ flexGrow: 1 }}>
      {shouldRenderAccesory && (
        <Flex justifyContent="space-between">
          {label && <Form.Label>{label}</Form.Label>}
          {helpLink && (
            <Link href={helpLink.path}>
              <a style={{ color: "#95AAC9", fontSize: "0.9rem" }}>
                {helpLink.title}
              </a>
            </Link>
          )}
        </Flex>
      )}
      <Form.Control
        onClick={onClick}
        readOnly={readonly}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onValueChange}
        style={style}
      />
      {error && (
        <small style={{ color: "red", padding: "0.3rem 0.5rem 0px" }}>
          {error}
        </small>
      )}
      {note && (
        <small style={{ padding: "0.3rem 0.5rem 0.5rem" }}>{note}</small>
      )}
    </Flex>
  );
};
