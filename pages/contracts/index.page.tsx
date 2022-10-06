import { CSSProperties, ReactNode, useState } from "react";
import { useContractsTableData } from "./useContractsTableData";
import { useContractCollectionsTableData } from "./useContractCollectionsTableData";
import { TablePage } from "components/TablePage/TablePage";
import { Flex } from "components/Flex/Flex";

const segmentsNames = ["contracts", "collections"];

export default () => {
  const [selectedSegment, setSelectedSegment] = useState(segmentsNames[0]);

  const SegmentComponent = () => (
    <SegmentSwitch>
      <SegmentButton
        name="contracts"
        title="Product contracts"
        active={selectedSegment === "contracts"}
        onSelect={setSelectedSegment}
      />
      <SegmentButton
        name="collections"
        title="Collection contracts"
        active={selectedSegment === "collections"}
        onSelect={setSelectedSegment}
      />
    </SegmentSwitch>
  );

  return (
    <div className="main-content">
      <TablePage
        key={selectedSegment}
        title="Contracts"
        subtitle="A list of contracts you have deployed."
        dataHook={
          selectedSegment === "contracts"
            ? useContractsTableData
            : useContractCollectionsTableData
        }
        segmentComponent={() => <SegmentComponent />}
      />
    </div>
  );
};

const SegmentSwitch = ({ children }: { children: ReactNode }) => (
  <Flex className="mb-4 w-100 justify-content-center rounded overflow-hidden">
    <Flex className="rounded overflow-hidden">{children}</Flex>
  </Flex>
);

interface Props {
  name: string;
  title: string;
  active: boolean;
  onSelect: (name: string) => void;
}

const SegmentButton = ({ name, title, active, onSelect }: Props) => {
  const base: CSSProperties = {
    border: "2px solid gray",
    color: active ? "white" : "#3b506c",
    borderColor: active ? "#2c7be5" : "#edf2f9",
    backgroundColor: active ? "#2c7be5" : "#edf2f9",
    padding: "0.5rem 1rem",
  };

  return (
    <button
      style={base}
      onClick={() => {
        onSelect(name);
      }}
    >
      {title}
    </button>
  );
};
