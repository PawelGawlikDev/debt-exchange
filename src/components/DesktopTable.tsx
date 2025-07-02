import TableBody from "./TableBody";
import TableHead from "./TableHead";
import { columns } from "../constants/columns";
import type { Debts, SortingOrder } from "../types/table";
import { Error, Empty } from "./Error";
import "../style/table.less";

const DesktopTable = ({
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
  const handleSorting = (field: keyof Debts) => {
    if (field === sortField) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortOrder("asc");
    }
  };

  if (error) {
    return <Error />;
  } else if (tableData.length === 0) {
    return <Empty />;
  }

  return (
    <>
      {tableData.length > 0 && (
        <table className="table" data-testid="table">
          <thead>
            <TableHead
              columns={columns}
              handleSorting={handleSorting}
              sortField={sortField}
              sortOrder={sortOrder}
            />
          </thead>
          <tbody>
            <TableBody columns={columns} tableData={tableData} />
          </tbody>
        </table>
      )}
    </>
  );
};

export default DesktopTable;
