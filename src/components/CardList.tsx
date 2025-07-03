import type { Columns, Debts } from "../types/table";
import "../style/mobileTable.less";
import { getFormatedDate } from "../utils/getFormatedDate";
import { useState } from "react";

const CardList = ({
  columns,
  tableData,
}: {
  columns: Columns[];
  tableData: Debts[];
}) => {
  return (
    <div className="cards">
      {tableData.map((row) => (
        <div className="card" key={row.Id} data-testid="dataCard">
          {columns.map(({ label, accessor }) => (
            <Card
              key={`${accessor}-${row.Id}`}
              accessor={accessor}
              label={label}
              row={row}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

const Card = ({
  accessor,
  label,
  row,
}: {
  accessor: keyof Debts;
  label: string;
  row: Debts;
}) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const displayData = () => {
    if (row[accessor] instanceof Date) {
      return getFormatedDate(row[accessor]);
    } else if (typeof row[accessor] === "number") {
      return row[accessor].toLocaleString("pl-PL", {
        useGrouping: true,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      });
    } else {
      return row[accessor];
    }
  };
  return (
    <div key={accessor} className="card-row">
      <strong>{label}:</strong>
      <span
        onClick={() => setIsActive(!isActive)}
        className={`${isActive ? "" : "hidden-text"}`}>
        {displayData()}
      </span>
    </div>
  );
};

export default CardList;
