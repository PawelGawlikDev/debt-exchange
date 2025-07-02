import { createSlice } from "@reduxjs/toolkit";

export interface MobileLayout {
  value: "table" | "cards";
}

const initialState: MobileLayout = {
  value: "table",
};

export const mobileLayout = createSlice({
  name: "mobileLayout",
  initialState,
  reducers: {
    setTable: (state) => {
      state.value = "table";
    },
    setCard: (state) => {
      state.value = "cards";
    },
  },
});

export const { setTable, setCard } = mobileLayout.actions;

export default mobileLayout.reducer;
