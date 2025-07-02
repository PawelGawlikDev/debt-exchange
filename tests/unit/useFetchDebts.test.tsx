import { renderHook, waitFor } from "@testing-library/react";
import { http, HttpResponse } from "msw";
import { describe, expect, test } from "vitest";
import { server } from "../../vitest-setup";
import { useFetchDebts } from "../../src/hooks/useFetchDebts";
import { createWrapper } from "../utils/utils";

const sortedData = [
  {
    Id: 1,
    Number: "DI/KOSZT/P/138483",
    Name: "Edward Szulc (Test)",
    Value: 20000,
    NIP: "1112223301",
    Date: new Date("2017-02-28T23:00:00.000Z"),
    DocumentType: "Faktura VAT",
    Price: 12300,
    Address: "ul. Paderewskiego 13 50-312 Wrocław",
  },
  {
    Id: 6,
    Number: "DI/MON/P/1139",
    Name: "Marcin Szymczak (Test)",
    Value: 30000,
    NIP: "1112223306",
    Date: new Date("2017-06-01T22:00:00.000Z"),
    DocumentType: "Faktura VAT",
    Price: 37192,
    Address: "ul. Ładna 3/6 50-312 Wrocław",
  },
  {
    Id: 10,
    Number: "DI/KOSZT/P/94911",
    Name: "Piotr Szymański (Test)",
    Value: 10000,
    NIP: "1112223310",
    Date: new Date("2017-04-14T22:00:00.000Z"),
    DocumentType: "Faktura VAT",
    Price: 21300,
    Address: "ul. POW 64 50-312 Wrocław",
  },
];

describe("query hook", () => {
  test("successful query hook", async () => {
    const { result } = renderHook(
      () =>
        useFetchDebts(
          "https://rekrutacja-webhosting-it.krd.pl/api/Recruitment/GetTopDebts",
        ),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    await waitFor(() => expect(result.current.tableData).toEqual(sortedData));
  });

  test("failure query hook", async () => {
    server.use(
      http.get("*", () => {
        return HttpResponse.error();
      }),
    );

    const { result } = renderHook(
      () =>
        useFetchDebts(
          "https://rekrutacja-webhosting-it.krd.pl/api/Recruitment/GetTopDebts",
        ),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => expect(result.current.isError).toBe(true), {
      timeout: 5000,
    });
    await waitFor(() => expect(result.current.tableData).toEqual(null));
  });

  test("post query hook", async () => {
    const { result } = renderHook(
      () =>
        useFetchDebts(
          "https://rekrutacja-webhosting-it.krd.pl/api/Recruitment/GetFilteredDebts",
          {
            method: "POST",
            headers: {
              "Content-type": "application/json",
            },
            body: JSON.stringify({ phrase: "Test" }),
          },
        ),
      {
        wrapper: createWrapper(),
      },
    );

    await waitFor(() => expect(result.current.isLoading).toBe(false));
    await waitFor(() => expect(result.current.tableData).toEqual(sortedData));
  });
});
