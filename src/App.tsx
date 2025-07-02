import { useEffect, useMemo, useState } from "react";
import { useFetchDebts } from "./hooks/useFetchDebts";
import MobileTable from "./components/MobileTable";
import DesktopTable from "./components/DesktopTable";
import MobileTablePlacecholder from "./components/MobileTablePlaceholder";
import DesktopTablePlacecholder from "./components/DesktopTablePlaceholder";
import Spinner from "./components/Spinner";
import Header from "./components/Header";
import { useAppSelector } from "./hooks/useRedux";
import { useViewportContext } from "./context/VievportContext";
import { sortTableData } from "./utils/sortTableData";
import type { Debts, SortingOrder } from "./types/table";
import "./style/main.less";

function App() {
  const { tableData, setTableData, isLoading, isError } = useFetchDebts(
    "https://rekrutacja-webhosting-it.krd.pl/api/Recruitment/GetTopDebts",
  );
  const [defaultDebts, setDefaultDebts] = useState<Debts[]>([]);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const { width } = useViewportContext();
  const loading: boolean = useAppSelector((state) => state.seachLoading.value);
  const mobileLayout: "table" | "cards" = useAppSelector(
    (state) => state.mobileLayout.value,
  );
  const error: boolean = useAppSelector((state) => state.searchError.value);

  const [sortField, setSortField] = useState<keyof Debts>("Name");
  const [sortOrder, setSortOrder] = useState<SortingOrder>("asc");

  useEffect(() => {
    setIsMobile(width < 768);
  }, [width]);

  useEffect(() => {
    if (tableData && defaultDebts.length === 0) {
      setDefaultDebts(tableData);
    }
  }, [tableData, defaultDebts.length]);

  const sortedData = useMemo(() => {
    if (!tableData) return [];
    return sortTableData(tableData, sortField, sortOrder) || tableData;
  }, [tableData, sortField, sortOrder]);

  return (
    <>
      {defaultDebts && (
        <Header defaultDebts={defaultDebts} setTableData={setTableData} />
      )}
      {loading ? (
        <div className="spinner-wrapper">
          <Spinner />
        </div>
      ) : (
        <div className="table-container">
          {isMobile && mobileLayout === "cards" ? (
            (isLoading || tableData === null) && !(error || isError) ? (
              <MobileTablePlacecholder />
            ) : (
              <MobileTable
                error={error || isError}
                tableData={sortedData}
                sortField={sortField}
                sortOrder={sortOrder}
                setSortField={setSortField}
                setSortOrder={setSortOrder}
              />
            )
          ) : (isLoading || tableData === null) && !(error || isError) ? (
            <DesktopTablePlacecholder />
          ) : (
            <DesktopTable
              error={error || isError}
              tableData={sortedData}
              setSortField={setSortField}
              sortField={sortField}
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
            />
          )}
        </div>
      )}
    </>
  );
}

export default App;
