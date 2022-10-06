import { Contract } from "types/Contracts";
import { useAPIContext } from "providers/APIProvider";
import { useEffect, useState } from "react";
import { CopyCell } from "components/CopyCell/CopyCell";
import { DateCell } from "components/DateCell/DateCell";

const title = "Contracts deployed";
const columns = [
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Chain",
  },
  {
    Header: "Standard",
    accessor: "type",
    Cell: ({ value }) => value.toUpperCase(),
  },
  {
    Header: "Address",
    Cell: ({ value }) => <CopyCell value={value} />,
  },
  {
    Header: "Transaction hash",
    accessor: "transaction_hash",
    Cell: ({ value }) => <CopyCell value={value} />,
  },
  {
    Header: "Transaction Url",
    accessor: "transaction_external_url",
    Cell: ({ value }) => <CopyCell value={value} isLink />,
  },
  {
    Header: "Time Created (UTC)",
    accessor: "creation_date",
    Cell: ({ value }) => <DateCell value={value} />,
  },
];

export const useContractsTableData = () => {
  const [data, setData] = useState<Contract[]>();
  const { apiService } = useAPIContext();

  useEffect(() => {
    const controller = new AbortController();
    apiService
      .getDeployedContracts({ signal: controller.signal })
      .then((res) => res.contracts)
      .then(setData)
      .catch(() => {});
    return () => {
      controller.abort();
    };
  }, [apiService]);

  return { title, columns, data };
};
