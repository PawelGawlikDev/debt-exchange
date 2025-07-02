import { createSlice } from "@reduxjs/toolkit";

export interface SearchLoading {
  value: boolean;
}

const initialLoadingState: SearchLoading = {
  value: false,
};

export const seachLoading = createSlice({
  name: "seachLoading",
  initialState: initialLoadingState,
  reducers: {
    loading: (state) => {
      state.value = true;
    },
    finish: (state) => {
      state.value = false;
    },
  },
});

export const { loading, finish } = seachLoading.actions;

export default seachLoading.reducer;
