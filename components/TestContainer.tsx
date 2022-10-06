import * as React from 'react';
import { Container } from "react-bootstrap";

export const TestContainer = () => {
    const divStyle = {
        color: 'blue',
      };
    return (
        <Container
        style={{
            height: "100vh",
            maxWidth: "25rem",
        }}
        >
        <div style={divStyle}>Hello World</div>
        </Container>
    );
};
