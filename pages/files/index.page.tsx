import { TablePage } from "components/TablePage/TablePage";
import { useFilesTableData } from "./useFilesTableData";

export default () => (
  <div className="main-content">
    <TablePage
      title="Files"
      subtitle="A list of files you have uploaded to IPFS"
      dataHook={useFilesTableData}
    />
  </div>
);
