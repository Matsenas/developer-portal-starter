import { SIZE, useMaxWidth } from "hooks/useMaxWidth";
import { useRef, useState } from "react";
import { isMounted } from "helpers/isMounted";
import { format } from "date-fns";
import { Log } from "types/Log";
import { CSSProperties } from "react";
import styles from "./styles.module.css";
import { FilterQuery, useLogsTableData } from "./useLogsTableData";
import { Flex } from "components/Flex/Flex";
import { BadgeCell } from "components/BadgeCell/BadgeCell";
import { TablePage } from "components/TablePage/TablePage";
import { SelectField, Option } from "components/SelectField/SelectField";
import { Input } from "components/InputField/Input";
import { Button } from "react-bootstrap";

interface FilterOption extends Option {
  selectableInput?: Option[];
}

const filterOptions: FilterOption[] = [
  {
    label: "Filter by Status",
    value: "filter_by_status",
    selectableInput: [
      {
        label: "Success",
        value: "success",
      },
      {
        label: "Client error",
        value: "client_error",
      },
      {
        label: "Server error",
        value: "server_error",
      },
    ],
  },
];

export default function Logs() {
  const [filterQueries, setFilterQueries] = useState<FilterQuery[]>([]);

  const [selectable, setSelectable] = useState(true);

  isMounted() &&
    useMaxWidth({
      size: SIZE.L,
      handler: (smallerThanL) => {
        setSelectable(smallerThanL ? false : true);
      },
    });

  return (
    <div className="main-content">
      <TablePage
        title="Logs"
        subtitle="This is a list of all requests you've made to the NFTPort API."
        dataHook={() => useLogsTableData({ filterQueries })}
        selectable={selectable}
        detailsComponent={(row) => <LogDetails row={row} />}
        filterComponent={() => (
          <FilterSection
            options={filterOptions}
            filterQueriesDidChange={setFilterQueries}
          />
        )}
      />
    </div>
  );
}

const LogDetails = ({ row: log }: { row: Log }) => {
  const res = new Response(null, {
    status: log.status as number,
  });
  const finalValue = res.ok ? `${log.status} OK` : `${log.status} ERR`;

  const date = Date.parse(log.request_date);
  const dateString = format(date, "yyyy-MM-dd HH:mm:ss");

  return (
    <div style={{ padding: "1rem" }}>
      <H4
        style={{ marginBottom: "1.5rem" }}
      >{`${log.method} ${log.endpoint}`}</H4>
      <div className={styles.grid}>
        <P muted>Status</P>
        <Flex>
          <BadgeCell value={finalValue} isError={!res.ok} />
        </Flex>
        <P muted>Time (UTC)</P>
        <P>{dateString}</P>
        {log.error_code && (
          <>
            <P muted>Error code</P>
            <P>{log.error_code}</P>
          </>
        )}
        {log.error_message && (
          <>
            <P muted>Error message</P>
            <P>{log.error_message}</P>
          </>
        )}
        <P muted>Request details</P>
        <pre style={{ overflowWrap: "anywhere", whiteSpace: "pre-line" }}>
          {JSON.stringify(log.request_details, null, 4)}
        </pre>
      </div>
    </div>
  );
};

const FilterSection = ({
  options,
  filterQueriesDidChange,
}: {
  options: FilterOption[];
  filterQueriesDidChange: (queries: FilterQuery[]) => void;
}) => {
  const [selectedOption, setSelectedOption] = useState<FilterOption>(
    options[0]
  );
  const [selectedFilterOption, setSelectedFilterOption] =
    useState<Option | null>(null);

  const [filterMap, setFilterMap] = useState(new Map<string, string>());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMap = new Map(filterMap);
    newMap.set(selectedOption.value, e.currentTarget.value);
    setFilterMap(newMap);

    filterQueriesDidChange(
      Array.from(newMap, ([label, value]) => {
        return {
          label,
          value,
        };
      })
    );
  };

  const handleSelectChange = (option: Option, _name: string) => {
    setSelectedOption(option);
  };

  const handleFilterOptionSelectChange = (option: Option, _name: string) => {
    const newMap = new Map(filterMap);
    newMap.set(selectedOption.value, option.value);
    setFilterMap(newMap);
    setSelectedFilterOption(option);
    filterQueriesDidChange(
      Array.from(newMap, ([label, value]) => {
        return {
          label,
          value,
        };
      })
    );
  };

  const filteringActive = Array.from(filterMap.values()).some(
    (value) => !!value
  );

  return (
    <Flex className="mb-4" justifyContent="space-between" gap={1} wrap>
      <Flex gap={1} wrap>
        {selectedOption.selectableInput ? (
          <div style={{ minWidth: "20rem" }}>
            <SelectField
              key={selectedOption.value}
              value={selectedFilterOption}
              name="predefinedOption"
              placeholder="Select available filtering option"
              options={selectedOption.selectableInput}
              onSelectChanged={handleFilterOptionSelectChange}
            />
          </div>
        ) : (
          <Input
            key={selectedOption.value}
            name="query"
            value={filterMap.get(selectedOption.value) || ""}
            onValueChange={handleChange}
          />
        )}
        <div style={{ minWidth: "10rem" }}>
          <SelectField
            name="filter"
            initialValue={selectedOption}
            options={options}
            onSelectChanged={handleSelectChange}
          />
        </div>
      </Flex>
      {filteringActive && (
        <Button
          className="btn btn-light"
          onClick={() => {
            setFilterMap(new Map());
            setSelectedFilterOption(null);
            filterQueriesDidChange([]);
          }}
        >
          Clear filters
        </Button>
      )}
    </Flex>
  );
};

// TODO extract ?
const P = ({
  children,
  muted,
  style,
}: {
  children: string | number;
  muted?: boolean;
  style?: CSSProperties;
}) => {
  const dStyle: CSSProperties = {
    margin: 0,
    padding: 0,
    color: muted ? "#6E84A3" : "inherit",
  };
  return <p style={{ ...dStyle, ...style }}>{children}</p>;
};

const H4 = ({
  children,
  style,
}: {
  children: string | number;
  style?: CSSProperties;
}) => {
  return <h4 style={{ margin: "0", padding: "0", ...style }}>{children}</h4>;
};
