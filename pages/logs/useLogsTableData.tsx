import { Log } from "types/Log";
import { useAPIContext } from "providers/APIProvider";
import { useEffect, useRef, useState } from "react";
import { BadgeCell } from "components/BadgeCell/BadgeCell";
import { DateCell } from "components/DateCell/DateCell";

const title = "API logs";
const columns = [
  {
    Header: "Method",
  },
  {
    Header: "Endpoint",
  },
  {
    Header: "Status",
    Cell: ({ value, row }) => {
      const res = new Response(null, {
        status: value as number,
      });
      const finalValue = res.ok ? `${value} OK` : `${value} ERR`;
      return <BadgeCell value={finalValue} isError={!res.ok} />;
    },
  },
  {
    Header: "Error",
    accessor: "error_message",
  },
  {
    Header: "Time (UTC)",
    accessor: "request_date",
    Cell: ({ value, row }) => <DateCell value={value} />,
  },
];

export type FilterQuery = {
  label: string;
  value: string;
};

export const useLogsTableData = ({
  filterQueries,
}: {
  filterQueries: FilterQuery[];
}) => {
  const [data, setData] = useState<Log[]>();
  const { apiService } = useAPIContext();

  const abortRef = useRef(new AbortController());

  useEffect(() => {
    setData(undefined);
    abortRef.current = new AbortController();
    apiService
      .getLogs({ signal: abortRef.current.signal, filterQueries })
      .then((res) => res.logs)
      .then(setData)
      .catch(() => {});

    const controller = abortRef.current;
    return () => {
      controller.abort();
    };
  }, [apiService, filterQueries]);

  return { title, columns, data };
};
