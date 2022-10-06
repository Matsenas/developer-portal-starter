import { TablePage } from "components/TablePage/TablePage";
import { useNFTsTableData } from "./useNFTsTableData";

export default () => {
  return (
    <div className="main-content">
      <TablePage
        title="NFTs"
        subtitle="A list of NFTs you have minted."
        dataHook={useNFTsTableData}
      />
    </div>
  );
};
