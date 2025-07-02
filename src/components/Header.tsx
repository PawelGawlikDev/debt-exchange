import React, { useEffect, useState } from "react";
import SearchBox from "./SearchBox";
import { setTable, setCard } from "../store/mobileLayout";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import type { Debts } from "../types/table";
import Toggle from "./Toggle";

const Header = ({
  setTableData,
  defaultDebts,
}: {
  setTableData: React.Dispatch<React.SetStateAction<Debts[] | null>>;
  defaultDebts: Debts[];
}) => {
  const [isMobileCheckboxChecked, setIsMobileCheckboxChecked] = useState(false);
  const mobileLayout = useAppSelector((state) => state.mobileLayout.value);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isMobileCheckboxChecked) {
      dispatch(setCard());
    } else {
      dispatch(setTable());
    }
  }, [isMobileCheckboxChecked, dispatch]);
  return (
    <div className="header" data-testid="header">
      <div className="header__search">
        <label htmlFor="seachDebtsInput" className="label">
          Podaj NIP lub nazwę dłużnika
        </label>
        <SearchBox setTableData={setTableData} defaultDebts={defaultDebts} />
      </div>
      <div className="layout-checkbox" data-testid="layoutCheckbox">
        <span className="toggle_label">Wybierz widok</span>
        <div className="">
          <label htmlFor="mobileLayoutCheckbox" className="toggle_label">
            {mobileLayout === "table" ? "Tabela" : "Karty"}
          </label>
          <Toggle
            toggled={isMobileCheckboxChecked}
            onToggle={() =>
              setIsMobileCheckboxChecked(!isMobileCheckboxChecked)
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
