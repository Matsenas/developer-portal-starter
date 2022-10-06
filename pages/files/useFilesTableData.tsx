import { BadgeCell } from "components/BadgeCell/BadgeCell";
import { CopyCell } from "components/CopyCell/CopyCell";
import { DateCell } from "components/DateCell/DateCell";
import { File } from "types/Files";
import { useAPIContext } from "providers/APIProvider";
import { useEffect, useState } from "react";

const title = "Uploaded files";
const columns = [
  {
    Header: "Ipfs Uri",
    Cell: ({ value, row }) => <CopyCell value={value} isLink />,
  },
  {
    Header: "Upload Type",
    accessor: "type",
    Cell: ({ value, row }) => (
      <BadgeCell value={(value as string).toUpperCase()} />
    ),
  },
  {
    Header: "Time Created (UTC)",
    accessor: "uploaded_date",
    Cell: ({ value, row }) => <DateCell value={value} />,
  },
];

export const useFilesTableData = () => {
  const [data, setData] = useState<File[]>();
  const { apiService } = useAPIContext();

  useEffect(() => {
    const controller = new AbortController();
    apiService
      .getFiles({ signal: controller.signal })
      .then((res) => res.storage)
      .then(setData)
      .catch(() => {});
    return () => {
      controller.abort();
    };
  }, [apiService]);

  return { title, columns, data };
};
