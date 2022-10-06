import { ReactNode } from "react";
import { Card } from "react-bootstrap";

interface Props {
  title?: string;
  children: ReactNode;
}
export function AdminstrationCard({ title, children }: Props) {
  return (
    <Card>
      {title && <Card.Header>{title}</Card.Header>}
      <Card.Body>{children}</Card.Body>
    </Card>
  );
}
