import { HeaderFC } from "components/Header/HeaderFC";
import dynamic from "next/dynamic";
import { Container } from "react-bootstrap";
import { Flex } from "../Flex/Flex";
import { CartTableProps } from "../Table/CardTable";

const CardTable = dynamic<CartTableProps>(
  () => import("../Table/CardTable").then((module) => module.CardTable),
  {
    ssr: false,
  }
);

interface Props {
  title: string;
  subtitle: string;
  dataHook: any;
  selectable?: boolean;
  detailsComponent?: (value?) => React.ReactNode;
  segmentComponent?: (value?) => React.ReactNode;
  filterComponent?: (value?) => React.ReactNode;
}

export const TablePage = ({
  title,
  subtitle,
  dataHook,
  selectable,
  detailsComponent,
  segmentComponent,
  filterComponent,
}: Props) => {
  return (
    <Container
      fluid
      style={{
        display: "flex",
        position: "relative",
        height: "100vh",
        flexDirection: "column",
      }}
    >
      <HeaderFC title={title} noMargin />
      <p className="text-muted">{subtitle}</p>
      {segmentComponent && segmentComponent()}
      {filterComponent && filterComponent()}
      <Flex
        column
        style={{
          flex: 1,
          position: "relative",
          maxHeight: "65%",
          height: "65%",
          overflow: "hidden",
        }}
      >
        <CardTable
          style={{ height: "100%", maxHeight: "100%", overflowY: "auto" }}
          useData={dataHook}
          selectable={selectable}
          detailsComponent={detailsComponent}
        />
      </Flex>
    </Container>
  );
};
