import { Locator } from "@playwright/test";
import { test, expect } from "../utils/fixtures";
import { delay, HttpResponse } from "msw";

test.describe("Table tests", { tag: "@mobile" }, () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("domcontentloaded");
  });

  test("Check table", async ({ page }) => {
    let table: Locator;
    await expect
      .poll(async () => {
        table = page.getByTestId("table");
        const isTableVIsoble = await table.isVisible();
        return isTableVIsoble;
      })
      .toBeTruthy();
  });

  test("Check layout checkbox", async ({ page }) => {
    let checkbox: Locator;
    await expect
      .poll(async () => {
        checkbox = page.getByTestId("toggle");
        const isTableVIsoble = await checkbox.isVisible();
        return isTableVIsoble;
      })
      .toBeTruthy();
  });

  test("Check header", async ({ page }) => {
    let header: Locator;
    let searchbox: Locator;

    await test.step("check header", async () => {
      await expect
        .poll(async () => {
          header = page.getByTestId("header");
          const isHeaderVIsoble = await header.isVisible();
          return isHeaderVIsoble;
        })
        .toBeTruthy();
    });

    await test.step("check searchbox", async () => {
      await expect
        .poll(async () => {
          searchbox = page.locator("#seachDebtsInput");
          const isSearchBox = await searchbox.isVisible();
          return isSearchBox;
        })
        .toBeTruthy();
    });
  });

  test("Check table headers", async ({ page }) => {
    const headers: string[] = ["Name", "NIP", "Number", "Price", "Date"];
    const tableHeaders: Locator[] = [];

    for (const header of headers) {
      await test.step(`get ${header}`, async () => {
        const tableHead = page.getByTestId(`${header}-head`);
        await expect(tableHead).toBeVisible();
        tableHeaders.push(tableHead);
      });
    }

    expect(tableHeaders.length).toEqual(headers.length);
  });

  test("Check cells", async ({ page }) => {
    const cells: string[] = ["Name", "NIP", "Number", "Price", "Date"];

    for (const cell of cells) {
      await test.step(`get ${cell}`, async () => {
        let tableCells: Locator[] = [];
        await expect
          .poll(async () => {
            tableCells = await page.getByTestId(`${cell}-cell`).all();
            return tableCells.length;
          })
          .toEqual(10);
        for (const cell of tableCells) {
          await expect(cell).toBeVisible();
        }
      });
    }
  });

  test("Sort in Name column", async ({ page }) => {
    const table: Locator = page.locator("table");
    const orderBeforeSort: string[] = [];
    const orderAfterSort: string[] = [];
    const nameHeader = table.getByTestId("Name-head");
    await expect(nameHeader.getByTestId("asc-arrow")).toBeVisible();

    const defaultOrderCells = await table.getByTestId("Name-cell").all();
    for (const cell of defaultOrderCells) {
      const cellText = await cell.textContent();
      expect(cellText).not.toBeNull();
      orderBeforeSort.push(cellText!);
    }

    await nameHeader.click();
    await expect(nameHeader.getByTestId("desc-arrow")).toBeVisible();

    const newOrderCells = await table.getByTestId("Name-cell").all();
    for (const cell of newOrderCells) {
      const cellText = await cell.textContent();
      expect(cellText).not.toBeNull();
      orderAfterSort.push(cellText!);
    }

    expect(orderAfterSort).toEqual(orderBeforeSort.reverse());
  });

  test("Sort in orher columns", async ({ page }) => {
    const table: Locator = page.locator("table");
    const columns: string[] = ["NIP", "Number", "Price", "Date"];

    for (const column of columns) {
      const orderBeforeSort: string[] = [];
      const orderAfterSort: string[] = [];
      const columnHeader = table.getByTestId(`${column}-head`);
      await expect(columnHeader.getByTestId("asc-arrow")).toBeHidden();
      await columnHeader.click();
      await expect(columnHeader.getByTestId("asc-arrow")).toBeVisible();
      const defaultOrderCells = await table.getByTestId(`${column}-cell`).all();
      for (const cell of defaultOrderCells) {
        const cellText = await cell.textContent();
        expect(cellText).not.toBeNull();
        orderBeforeSort.push(cellText!);
      }

      await columnHeader.click();
      await expect(columnHeader.getByTestId("desc-arrow")).toBeVisible();

      const newOrderCells = await table.getByTestId(`${column}-cell`).all();
      for (const cell of newOrderCells) {
        const cellText = await cell.textContent();
        expect(cellText).not.toBeNull();
        orderAfterSort.push(cellText!);
      }

      expect(orderAfterSort).toEqual(orderBeforeSort.reverse());
    }
  });

  test("Search correct phrase", async ({ page }) => {
    const table = page.getByTestId("table");
    const searchbox = page.locator("#seachDebtsInput");
    await searchbox.fill("test");
    await expect
      .poll(async () => {
        const cells = await table.getByTestId("Name-cell").all();
        return cells.length;
      })
      .toEqual(3);
  });

  test("Search too short phrase", async ({ page }) => {
    const table = page.getByTestId("table");
    const searchbox = page.locator("#seachDebtsInput");
    const cellsBeforeSearch: string[] = [];
    const cellsAfterSearch: string[] = [];

    await expect
      .poll(async () => {
        const cells = await table.getByTestId("Name-cell").all();
        for (const cell of cells) {
          const cellText = await cell.textContent();
          expect(cellText).not.toBeNull();
          cellsBeforeSearch.push(cellText!);
        }
        return cells.length;
      })
      .toEqual(10);

    await searchbox.fill("te");
    await expect
      .poll(async () => {
        const cells = await table.getByTestId("Name-cell").all();
        for (const cell of cells) {
          const cellText = await cell.textContent();
          expect(cellText).not.toBeNull();
          cellsAfterSearch.push(cellText!);
        }
        return cells.length;
      })
      .toEqual(10);

    expect(cellsBeforeSearch).toStrictEqual(cellsAfterSearch);
  });

  test("Change layout", async ({ page }) => {
    const checkbox: Locator = page.getByTestId("toggle");
    await checkbox.click();
    await expect
      .poll(async () => {
        const cards = await page.getByTestId("dataCard").all();
        return cards.length;
      })
      .toEqual(10);
  });
});

test.describe("Different init data", () => {
  test.afterEach(async ({ worker }) => {
    await worker.resetHandlers();
  });

  test("Error during loading", async ({ page, worker, http }) => {
    await worker.use(
      http.get(
        "https://rekrutacja-webhosting-it.krd.pl/api/Recruitment/GetTopDebts",
        async () => {
          await delay(250);
          return new HttpResponse(null, {
            status: 404,
          });
        },
      ),
    );

    await page.goto("/");
    let error: Locator;
    await expect
      .poll(async () => {
        error = page.getByTestId("error");
        await error.waitFor({ timeout: 5000 });
        await expect(
          error.getByText("Wystąpił błąd podczas pobierania danych"),
        ).toBeVisible();
        return error.isVisible();
      })
      .toBeTruthy();
  });

  test("Empty data", async ({ page, worker, http }) => {
    await worker.use(
      http.get(
        "https://rekrutacja-webhosting-it.krd.pl/api/Recruitment/GetTopDebts",
        async () => {
          await delay(250);
          return HttpResponse.json([], {
            status: 200,
          });
        },
      ),
    );

    await page.goto("/");
    let error: Locator;
    await expect
      .poll(async () => {
        error = page.getByTestId("error");
        await error.waitFor({ timeout: 5000 });
        await expect(error.getByText("Brak danych")).toBeVisible();
        return error.isVisible();
      })
      .toBeTruthy();
  });
});
