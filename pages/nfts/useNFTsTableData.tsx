import { Mint } from "types/MintsRes";
import { useRouter } from "next/router";
import { useAPIContext } from "providers/APIProvider";
import { useEffect, useRef, useState } from "react";
import { DateCell } from "components/DateCell/DateCell";
import { DataHook } from "components/Table/CardTable";
import { CopyCell } from "components/CopyCell/CopyCell";
import { usePagination } from "hooks/usePagination";

const title = "NFTs";
const columns = [
  {
    Header: "Token Id",
  },
  {
    Header: "Contract",
    accessor: "contract_name",
  },
  {
    Header: "Minted To",
    accessor: "mint_to_address",
    Cell: ({ value }) => <CopyCell value={value} />,
  },
  {
    Header: "Metadata Uri",
    Cell: ({ value }) => <CopyCell value={value} isLink />,
  },
  {
    Header: "Transaction hash",
    accessor: "transaction_hash",
    Cell: ({ value, row }) => {
      const mint = row.original as Mint;
      return (
        <CopyCell
          value={value}
          isLink
          linkHref={mint.transaction_external_url}
        />
      );
    },
  },

  {
    Header: "Time Created (UTC)",
    accessor: "mint_date",
    Cell: ({ value }) => <DateCell value={value} />,
  },
];

export const useNFTsTableData = (): DataHook => {
  const router = useRouter();

  const page = router.query.page ? parseInt(router.query.page.toString()) : 1;

  const [data, setData] = useState<Mint[]>();

  const { apiService } = useAPIContext();

  const { pagination, setTotalPages } = usePagination({ navPath: "nfts" });

  useEffect(() => {
    const controller = new AbortController();
    setData(undefined);
    apiService
      .getMints({
        page,
        signal: controller.signal,
      })
      .then((res) => {
        setData(res.minted_nfts);
        setTotalPages(res.total);
      })
      .catch(() => {});
    return () => {
      controller.abort();
    };
  }, [page, apiService]);

  return {
    title,
    columns,
    data,
    pagination,
  };
};
