export type Debts = {
  Id: number;
  Number: string;
  Name: string;
  Value: number;
  NIP: string;
  Date: string | Date;
  DocumentType: string;
  Price: number;
  Address: string;
};

export type Columns = {
  label: string;
  accessor: keyof Debts;
  sortable: boolean;
};

export type SortingOrder = "asc" | "desc";
