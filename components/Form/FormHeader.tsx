import { Flex } from "../Flex/Flex";
import Image from "next/image";

interface Props {
  title: string;
  subtitle: string;
}

export const FormHeader = ({ title, subtitle }: Props) => {
  return (
    <>
      <Flex column justifyContent="center">
        <Image src="/img/logo.svg" width={155} height={31} />
        <div style={{ paddingBottom: "3rem" }} />
        <h1 className="display-5 text-center mb-3">{title}</h1>
        <p className="text-muted text-center mb-5">{subtitle}</p>
      </Flex>
    </>
  );
};
