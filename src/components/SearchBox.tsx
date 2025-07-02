import { useState, useEffect } from "react";
import debounce from "../utils/debounce";
import type { Debts } from "../types/table";
import { useFetchDebts } from "../hooks/useFetchDebts";
import { useAppDispatch } from "../hooks/useRedux";
import { loading, finish } from "../store/searchLoading";
import { changeErrorState } from "../store/searchError";
import "../style/searchbox.less";

interface SearchBoxProps {
  setTableData: (data: Debts[]) => void;
  defaultDebts: Debts[];
}

const SearchBox = ({ setTableData, defaultDebts }: SearchBoxProps) => {
  const [userInput, setUserInput] = useState<string>("");
  const [enable, setEnable] = useState<boolean>(false);
  const [searchPhrase, setSearchPhrase] = useState<string>("");
  const [wasSearching, setWasSearching] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const { tableData, isLoading, isError } = useFetchDebts(
    "https://rekrutacja-webhosting-it.krd.pl/api/Recruitment/GetFilteredDebts",
    {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ phrase: searchPhrase }),
    },
    ["filteredDebts", searchPhrase],
    enable,
  );

  useEffect(() => {
    if (isError) {
      dispatch(changeErrorState());
    }
  }, [isError, dispatch]);

  useEffect(() => {
    if (isLoading) {
      dispatch(loading());
    } else {
      dispatch(finish());
    }
  }, [isLoading, dispatch]);

  useEffect(() => {
    if (!enable) return;

    if (searchPhrase.trim().length >= 3 && tableData) {
      setTableData(tableData);
    }
  }, [tableData, searchPhrase, enable, setTableData]);

  const debouncedSearch = debounce((value: string) => {
    const trimmed = value.trim();

    if (trimmed === "" || trimmed.length < 3) {
      if (!wasSearching) {
        setTableData(defaultDebts);
      }

      setEnable(false);
      setSearchPhrase("");
      setWasSearching(false);
    } else {
      setWasSearching(true);
      setSearchPhrase(value);
      setEnable(true);
    }
  }, 300);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserInput(value);
    debouncedSearch(value);
  };

  return (
    <input
      className="search-box"
      id="seachDebtsInput"
      type="text"
      placeholder="NIP, nazwa dłużnika"
      value={userInput}
      onChange={handleChange}
    />
  );
};

export default SearchBox;
