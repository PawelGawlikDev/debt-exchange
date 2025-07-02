import type { Columns } from "../types/table";

export const columns: Columns[] = [
  { label: "Dłużnik", accessor: "Name", sortable: true },
  { label: "NIP", accessor: "NIP", sortable: true },
  { label: "Numer", accessor: "Number", sortable: true },
  { label: "Kwota zadłużenia", accessor: "Price", sortable: true },
  { label: "Data powstania zobowiązania", accessor: "Date", sortable: true },
];
