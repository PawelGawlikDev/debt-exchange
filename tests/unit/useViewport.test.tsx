import { act, renderHook, waitFor } from "@testing-library/react";
import { describe, expect, test } from "vitest";
import { useViewport } from "../../src/hooks/useViewport";
import { createWrapper } from "../utils/utils";

describe("viewport hook", () => {
  test("updates width", async () => {
    window.innerWidth = 800;
    const { result } = renderHook(() => useViewport(), {
      wrapper: createWrapper(),
    });

    act(() => {
      window.innerWidth = 1024;
      window.dispatchEvent(new Event("resize"));
    });

    await waitFor(() => {
      expect(result.current.width).toBe(1024);
    });
  });
});
