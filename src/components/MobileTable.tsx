import { columns } from "../constants/columns";
import type { Debts, SortingOrder } from "../types/table";
import CardList from "./CardList";
import React from "react";
import MobileSortingMenu from "./MobileSortingMenu";
import { Error, Empty } from "./Error";

const MobileTable = ({
  tableData,
  sortField,
  sortOrder,
  setSortField,
  setSortOrder,
  error,
}: {
  tableData: Debts[];
  sortField: keyof Debts;
  sortOrder: SortingOrder;
  setSortField: React.Dispatch<React.SetStateAction<keyof Debts>>;
  setSortOrder: React.Dispatch<React.SetStateAction<SortingOrder>>;
  error: boolean;
}) => {
  if (error) {
    return <Error />;
  } else if (tableData.length === 0) {
    return <Empty />;
  }

  return (
    <div className="table-mobile">
      <MobileSortingMenu
        sortField={sortField}
        sortOrder={sortOrder}
        setSortField={setSortField}
        setSortOrder={setSortOrder}
      />

      {tableData && <CardList columns={columns} tableData={tableData} />}
    </div>
  );
};

export default MobileTable;
