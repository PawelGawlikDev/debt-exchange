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

  return (
    <td
      data-testid={`${accessor}-cell`}
      onClick={handleDataClick}
      className={`${accessor === "Name" && !isActive ? "hidden-text" : ""} ${accessor === "Name" ? "sticky-cell" : ""}`}
      key={accessor}>
      {tData instanceof Date ? getFormatedDate(tData) : tData}
    </td>
  );
};

export default TableBody;
