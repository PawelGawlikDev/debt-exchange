import React, { useState, useEffect } from "react";
import type { Debts, SortingOrder } from "../types/table";
import { columns } from "../constants/columns";
import "../style/mobileSorting.less";

const MobileSortingMenu = ({
  sortField,
  sortOrder,
  setSortField,
  setSortOrder,
}: {
  sortField: keyof Debts;
  sortOrder: SortingOrder;
  setSortField: React.Dispatch<React.SetStateAction<keyof Debts>>;
  setSortOrder: React.Dispatch<React.SetStateAction<SortingOrder>>;
}) => {
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);

  const handleSortFieldSelect = (field: keyof Debts) => {
    setSortField(field);
    setIsSortMenuOpen(false);
  };

  useEffect(() => {
    if (isSortMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isSortMenuOpen]);
  return (
    <>
      <div className="sort-controls">
        <button
          className="sort-field-button"
          onClick={() => setIsSortMenuOpen(true)}>
          Sortuj według:{" "}
          {columns.find((col) => col.accessor === sortField)?.label}
        </button>
        <button
          className="sort-order-button"
          onClick={() =>
            setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"))
          }>
          {sortOrder === "asc" ? "↑ Rosnąco" : "↓ Malejąco"}
        </button>
      </div>

      {isSortMenuOpen && (
        <div
          className="sort-menu-overlay"
          onClick={() => setIsSortMenuOpen(false)}>
          <div
            className="sort-menu-content"
            onClick={(e) => e.stopPropagation()}>
            <h3>Wybierz pole do sortowania</h3>
            <ul>
              {columns.map((col) => (
                <li
                  key={col.accessor}
                  className={sortField === col.accessor ? "active" : ""}
                  onClick={() => handleSortFieldSelect(col.accessor)}>
                  {col.label}
                </li>
              ))}
            </ul>
            <button onClick={() => setIsSortMenuOpen(false)}>Anuluj</button>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileSortingMenu;
