import { createSlice } from "@reduxjs/toolkit";

export interface SearchError {
  value: boolean;
}

const initialErrorState: SearchError = {
  value: false,
};

export const searchError = createSlice({
  name: "searchError",
  initialState: initialErrorState,
  reducers: {
    changeErrorState: (state) => {
      state.value = true;
    },
  },
});

export const { changeErrorState } = searchError.actions;

export default searchError.reducer;
