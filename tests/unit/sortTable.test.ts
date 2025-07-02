import { describe, test, expect } from "vitest";
import { sortTableData } from "../../src/utils/sortTableData";
import tableData from "../data/mockTopDebts.json";

describe("sort table data function", () => {
  test("sort by number asc", () => {
    const sortedByNumber = sortTableData(tableData, "Price", "asc");
    const prices = sortedByNumber?.map((item) => item.Price);

    expect(prices).toEqual([12300.0, 21300.0, 37192.0]);
  });
  test("sort by number desc", () => {
    const sortedByNumber = sortTableData(tableData, "Price", "desc");
    const prices = sortedByNumber?.map((item) => item.Price);

    expect(prices).toEqual([37192.0, 21300.0, 12300.0]);
  });

  test("sort by string asc", () => {
    const sortedByName = sortTableData(tableData, "Name", "asc");
    const names = sortedByName?.map((item) => item.Name);

    expect(names).toEqual([
      "Edward Szulc (Test)",
      "Marcin Szymczak (Test)",
      "Piotr Szymański (Test)",
    ]);
  });
  test("sort by string desc", () => {
    const sortedByName = sortTableData(tableData, "Name", "desc");
    const names = sortedByName?.map((item) => item.Name);

    expect(names).toEqual([
      "Piotr Szymański (Test)",
      "Marcin Szymczak (Test)",
      "Edward Szulc (Test)",
    ]);
  });

  test("sort by date asc", () => {
    const normalizedData = tableData.map((item) => ({
      ...item,
      Date: new Date(item.Date),
    }));

    const sortedByDate = sortTableData(normalizedData, "Date", "asc");
    const dates = sortedByDate?.map((item) => item.Date);
    expect(dates).toEqual([
      new Date("2017-02-28T23:00:00.000Z"),
      new Date("2017-04-14T22:00:00.000Z"),
      new Date("2017-06-01T22:00:00.000Z"),
    ]);
  });
  test("sort by date desc", () => {
    const normalizedData = tableData.map((item) => ({
      ...item,
      Date: new Date(item.Date),
    }));

    const sortedByDate = sortTableData(normalizedData, "Date", "desc");
    const dates = sortedByDate?.map((item) => item.Date);

    expect(dates).toEqual([
      new Date("2017-06-01T22:00:00.000Z"),
      new Date("2017-04-14T22:00:00.000Z"),
      new Date("2017-02-28T23:00:00.000Z"),
    ]);
  });
});
