import { test, describe, expect } from "vitest";
import { getFormatedDate } from "../../src/utils/getFormatedDate";

describe("getFormatedDate tests", () => {
  const correctDate = new Date("2017-04-15T00:00:00");
  test("format correct date", () => {
    expect(getFormatedDate(correctDate)).toBe("15-04-2017");
  });
  test("returns fallback for invalid Date object", () => {
    const invalidDate = new Date("invalid");
    expect(getFormatedDate(invalidDate)).toBe("—");
  });

  test("returns fallback when passed a string", () => {
    expect(getFormatedDate("2017-04-15" as unknown as Date)).toBe("—");
  });

  test("returns fallback when passed null", () => {
    expect(getFormatedDate(null as unknown as Date)).toBe("—");
  });
});
