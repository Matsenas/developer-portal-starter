import { CSSProperties } from "react";
import { Container } from "react-bootstrap";

export const FormContainer = ({ children }) => {
  const innerContainerStyle: CSSProperties = {
    position: "relative",
    width: "100%",
    top: "10%",
  };
  return (
    <Container
      style={{
        height: "100vh",
        maxWidth: "25rem",
      }}
    >
      <div style={innerContainerStyle}>{children}</div>
    </Container>
  );
};
