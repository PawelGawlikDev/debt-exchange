import type { Debts, SortingOrder } from "../types/table";

export const sortTableData = (
  tableData: Debts[],
  sortField: keyof Debts,
  sortOrder: SortingOrder,
) => {
  if (!sortField) return;

  const sorted = [...tableData].sort((a, b) => {
    const aVal = a[sortField];
    const bVal = b[sortField];

    if (aVal instanceof Date && bVal instanceof Date) {
      return sortOrder === "asc"
        ? aVal.getTime() - bVal.getTime()
        : bVal.getTime() - aVal.getTime();
    }

    if (typeof aVal === "number" && typeof bVal === "number") {
      return sortOrder === "asc" ? aVal - bVal : bVal - aVal;
    }
    return sortOrder === "asc"
      ? aVal.toString().localeCompare(bVal.toString(), "pl", { numeric: true })
      : bVal.toString().localeCompare(aVal.toString(), "pl", { numeric: true });
  });

  return sorted;
};
