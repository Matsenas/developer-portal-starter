import { Loading } from "components/Loading";
import React, { CSSProperties, ReactNode, useRef, useState } from "react";
import { Card, Table } from "react-bootstrap";
import { useSortBy, useTable } from "react-table";
import { OutsideClick } from "components/OutsideClick/OutsideClick";
import styles from "./styles.module.css";
import { Motion } from "../PageMotion/PageMotion";
import { Flex } from "../Flex/Flex";

export interface DataHook {
  title: string;
  columns: any[];
  data: any[] | undefined;
  pagination?: Pagination;
}

interface Pagination {
  totalPages: number | undefined;
  currentPage: number;
  onPreviousClick: () => void;
  onNextClick: () => void;
  onPageClick: (page: number) => void;
  navigationSet: number[] | null;
}

export interface CartTableProps {
  useData: () => DataHook;
  detailsComponent?: (value: any) => ReactNode;
  selectable?: boolean;
  style?: CSSProperties;
}

export function CardTable({
  useData,
  detailsComponent,
  selectable,
  style,
}: CartTableProps) {
  const { title, data, columns, pagination } = useData();

  const [selected, setSelected] = useState<any>();
  const [selectedRow, setSelectedRow] = useState<any>();
  const timeoutRef = useRef<any>(); /// Improves drawer animation look

  const maxDrawerWidth = "35%";
  const marginRight = selected ? maxDrawerWidth : "0";

  const onClickOutside = () => {
    selectable && setSelected(undefined);
    timeoutRef.current && clearTimeout(timeoutRef.current);
    setTimeout(() => {
      setSelectedRow(undefined);
    }, 250);
  };

  const onDidSelectRow = (row: any) => {
    if (!selectable) return;

    timeoutRef.current && clearTimeout(timeoutRef.current);

    const isSelected = selectedRow && selectedRow.id === row.id ? false : true;

    setSelected(isSelected);

    isSelected && setSelectedRow(row);

    !isSelected &&
      setTimeout(() => {
        setSelectedRow(undefined);
      }, 250);
  };

  const prepareRowClass = (row: any): string => {
    const selectedID = selectedRow && selectedRow.id === row.id;
    const selectedClass = selectedID
      ? "table-cell-selected"
      : "table-cell-normal";
    return selectable ? `${selectedClass} cursor-pointer` : selectedClass;
  };

  return (
    <>
      <Card.Header
        style={{
          backgroundColor: "white",
          border: "1px solid #edf2f9",
          borderBottom: "none",
          borderRadius: 0,
        }}
      >
        <h4 className="card-header-title" style={{ marginLeft: "1rem" }}>
          {title}
        </h4>
      </Card.Header>
      <OutsideClick
        onClickOutside={onClickOutside}
        style={{ flex: 1, overflowY: "auto" }}
      >
        <Card
          style={{
            ...style,
            borderLeft: "1px solid #edf2f9",
            borderRight: "1px solid #edf2f9",
            borderRadius: 0,
          }}
        >
          {data ? (
            <TableComponent
              data={data}
              prepareRowClass={prepareRowClass}
              onDidSelectRow={onDidSelectRow}
              marginRight={marginRight}
              columns={columns.map((column) => ({
                ...column,
                accessor:
                  column.accessor ??
                  column.Header.toLowerCase().split(" ").join("_"),
              }))}
            />
          ) : (
            <Loading />
          )}
        </Card>
        {selectable && (
          <RowDetails
            detailsComponent={detailsComponent}
            selectedRow={selectedRow}
            selected={selected}
            width={maxDrawerWidth}
            onClose={onClickOutside}
          />
        )}
      </OutsideClick>
      {pagination && pagination.navigationSet && (
        <Card.Footer
          style={{
            backgroundColor: "white",
            border: "1px solid #edf2f9",
            borderTop: "none",
            borderRadius: 0,
          }}
        >
          <Pagination
            onNextClick={pagination.onNextClick}
            onPreviousClick={pagination.onPreviousClick}
            onPageClick={pagination.onPageClick}
            navigationSet={pagination.navigationSet}
            currentPage={pagination.currentPage}
            totalPages={pagination.totalPages}
          />
        </Card.Footer>
      )}
    </>
  );
}

const TableComponent = ({
  data,
  columns,
  marginRight,
  onDidSelectRow,
  prepareRowClass,
}) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data }, useSortBy);

  return (
    <Motion>
      <Table
        size="sm"
        className="table-nowrap card-table"
        responsive
        style={{
          marginRight,
          transition: "all 250ms ease-in-out",
        }}
        {...getTableProps({ role: null })}
      >
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps({ role: null })}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        {data.length ? (
          <tbody {...getTableBodyProps({ role: null })}>
            {rows.map((row) => {
              prepareRow(row);
              const rowClass = prepareRowClass(row);
              return (
                <tr
                  className={rowClass}
                  {...row.getRowProps({ role: null })}
                  onClick={() => onDidSelectRow(row)}
                  style={{ userSelect: "none" }}
                >
                  {row.cells.map((cell) => {
                    return (
                      <td
                        {...cell.getCellProps({
                          className: cell.column.className,
                          role: null,
                        })}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        ) : (
          <tbody>
            <tr>
              <td>
                <p style={{ display: "contents" }}>No data.</p>
              </td>
            </tr>
          </tbody>
        )}
      </Table>
    </Motion>
  );
};

const RowDetails = ({
  detailsComponent,
  selectedRow,
  selected,
  width,
  onClose,
}) => {
  const className = `${styles.details} ${
    !!selected ? styles.details_open : styles.details_closed
  }`;

  return (
    <div className={className} style={{ width }}>
      <Flex justifyContent="flex-end">
        <button
          style={{
            border: "none",
            margin: 0,
            padding: "4px",
            position: "absolute",
            top: 2,
            right: 2,
            backgroundColor: "white",
          }}
          onClick={onClose}
        >
          <img
            src="/img/x.svg"
            alt="Close details"
            style={{
              margin: 0,
              padding: 0,
              height: "1.2rem",
              width: "1.2rem",
            }}
          />
        </button>
      </Flex>
      {selectedRow && detailsComponent(selectedRow.original)}
    </div>
  );
};

const Pagination = ({
  onPreviousClick,
  onNextClick,
  navigationSet,
  onPageClick,
  currentPage,
  totalPages,
}) => {
  const prevDisabled = currentPage === 1 ? "disabled" : "";
  const nextDisabled = currentPage === totalPages ? "disabled" : "";

  return (
    <Flex justifyContent="flex-end">
      <nav aria-label="nfts page navigation">
        <ul className="pagination" style={{ margin: 0 }}>
          <li className={`page-item ${prevDisabled}`}>
            <span
              className="page-link"
              onClick={onPreviousClick}
              style={{ cursor: "pointer", userSelect: "none" }}
            >
              Previous
            </span>
          </li>
          {navigationSet.map((page) => {
            const active = page === currentPage ? "active" : "";
            return (
              <li className={`page-item ${active}`}>
                <span
                  className="page-link"
                  style={{ cursor: "pointer", userSelect: "none" }}
                  onClick={() => onPageClick(page)}
                >
                  {page}
                </span>
              </li>
            );
          })}
          <li className={`page-item ${nextDisabled}`}>
            <span
              className="page-link"
              onClick={onNextClick}
              style={{ cursor: "pointer", userSelect: "none" }}
            >
              Next
            </span>
          </li>
        </ul>
      </nav>
    </Flex>
  );
};
