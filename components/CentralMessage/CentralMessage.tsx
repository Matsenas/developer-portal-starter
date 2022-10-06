import { CSSProperties, ReactNode } from "react";
import { Container } from "react-bootstrap";
import Image from "next/image";
import { Flex } from "components/Flex/Flex";

interface Props {
  title: string;
  subtitle?: string;
  children?: ReactNode;
  image?: JSX.Element;
}

export const CentralMessage = ({ title, subtitle, children, image }: Props) => {
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
      <div style={innerContainerStyle}>
        <Flex column justifyContent="center" alignItems="center">
          <Image src="/img/logo.svg" width={155} height={31} />
          <div style={{ paddingBottom: "3rem" }} />
          {image}
          <h1 className="display-5 text-center mb-3">{title}</h1>
          {subtitle && (
            <p className="text-muted text-center mb-5">{subtitle}</p>
          )}
          {children}
        </Flex>
      </div>
    </Container>
  );
};
