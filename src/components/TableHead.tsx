import type { Columns, Debts, SortingOrder } from "../types/table";

const TableHead = ({
  columns,
  handleSorting,
  sortField,
  sortOrder,
}: {
  columns: Columns[];
  handleSorting: (field: keyof Debts) => void;
  sortField: keyof Debts;
  sortOrder: SortingOrder;
}) => {
  return (
    <tr>
      {columns.map((col) => (
        <th
          key={col.accessor}
          onClick={() => handleSorting(col.accessor)}
          data-testid={`${col.accessor}-head`}
          className={`${col.accessor === "Name" ? "sticky-cell" : ""} cursor-click`}>
          {col.label}
          {sortField === col.accessor && (
            <span
              data-testid={`${sortOrder}-arrow`}
              style={{ marginLeft: "4px" }}>
              {sortOrder === "asc" ? "↑" : "↓"}
            </span>
          )}
        </th>
      ))}
    </tr>
  );
};

export default TableHead;
