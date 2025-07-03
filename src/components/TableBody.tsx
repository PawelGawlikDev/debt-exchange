import { useState } from "react";
import type { Debts, Columns } from "../types/table";
import { getFormatedDate } from "../utils/getFormatedDate";

const TableBody = ({
  tableData,
  columns,
}: {
  tableData: Debts[];
  columns: Columns[];
}) => {
  return (
    <>
      {tableData.map((data) => {
        return (
          <tr key={data.Id}>
            {columns.map(({ accessor }) => {
              const tData = data[accessor] ? data[accessor] : "——";
              return (
                <TableCell
                  key={`${data.Id}-${accessor}`}
                  accessor={accessor}
                  tData={tData}
                />
              );
            })}
          </tr>
        );
      })}
    </>
  );
};

const TableCell = ({
  accessor,
  tData,
}: {
  accessor: keyof Debts;
  tData: string | number | Date;
}) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const handleDataClick = () => {
    setIsActive((active) => !active);
  };

  const displayData = () => {
    if (tData instanceof Date) {
      return getFormatedDate(tData);
    } else if (typeof tData === "number") {
      return tData.toLocaleString("pl-PL", {
        useGrouping: true,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    } else {
      return tData;
    }
  };

  return (
    <td
      data-testid={`${accessor}-cell`}
      onClick={handleDataClick}
      className={`${accessor === "Name" && !isActive ? "hidden-text cursor-click" : ""} ${accessor === "Name" ? "sticky-cell" : ""}`}
      key={accessor}>
      {displayData()}
    </td>
  );
};

export default TableBody;
