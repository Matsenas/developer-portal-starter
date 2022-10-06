// @ts-nocheck
import { Col, Container, Row } from "react-bootstrap";
import Header from "./Header";

interface Props {
  title: string;
  noMargin?: boolean;
}

export const HeaderFC = ({ title, noMargin }: Props) => {
  if (noMargin) {
    return (
      <Header>
        <Header.Body>
          <Row className="row align-items-end pt-3">
            <Col>
              <Header.Title as="h1">{title}</Header.Title>
            </Col>
          </Row>
        </Header.Body>
      </Header>
    );
  }
  return (
    <Header>
      <Container fluid>
        <Header.Body>
          <Row className="row align-items-end pt-3">
            <Col>
              <Header.Title as="h1">{title}</Header.Title>
            </Col>
          </Row>
        </Header.Body>
      </Container>
    </Header>
  );
};
