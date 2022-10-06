import { CollectionContract } from "types/Collections";
import { useAPIContext } from "providers/APIProvider";
import { useEffect, useState } from "react";
import { DateCell } from "components/DateCell/DateCell";
import { CopyCell } from "components/CopyCell/CopyCell";

const title = "Contract collections";
const columns = [
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Chain",
  },
  {
    Header: "Symbol",
    accessor: "symbol",
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
    Header: "Time Created",
    accessor: "creation_date",
    Cell: ({ value }) => <DateCell value={value} />,
  },
];

export const useContractCollectionsTableData = () => {
  const [data, setData] = useState<CollectionContract[]>();
  const { apiService } = useAPIContext();

  useEffect(() => {
    const controller = new AbortController();
    apiService
      .getDeployedContractCollections({ signal: controller.signal })
      .then((collectionsArray) => {
        return collectionsArray.reduce((prev, current) => {
          return prev.concat(current);
        }, []);
      })
      .then(setData)
      .catch(() => {});
    return () => {
      controller.abort();
    };
  }, [apiService]);

  return { title, columns, data };
};
