import type { Debts } from "../types/table";
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

export const fetchDebtData = (
  url: string | URL,
  init?: RequestInit,
): Promise<Debts[]> =>
  fetch(url, init)
    .then((response) => response.json())
    .then((data) =>
      data.map((item: Debts) => ({
        ...item,
        Date: new Date(item.Date),
      })),
    );

export function useFetchDebts(
  url: string | URL,
  init?: RequestInit,
  queryKey: unknown[] = ["repoData"],
  enable: boolean = true,
) {
  const [tableData, setTableData] = useState<Debts[] | null>(null);

  const { isError, error, data, isLoading } = useQuery({
    queryKey: [queryKey, url, init],
    queryFn: () => fetchDebtData(url, init),
    enabled: enable,
    retry: 1,
  });

  useEffect(() => {
    if (isError) {
      setTableData(null);
      return;
    }
    if (data) {
      const parsedDates = data.map((item) => ({
        ...item,
        Date: new Date(item.Date),
      }));

      const sorted = parsedDates.sort((a, b) =>
        a.Name.localeCompare(b.Name, "pl", { numeric: true }),
      );

      setTableData(sorted);
    } else {
      setTableData(null);
    }
  }, [isError, data, error]);

  return { isLoading, error, isError, tableData, setTableData };
}
