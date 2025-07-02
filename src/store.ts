import { configureStore } from "@reduxjs/toolkit";
import mobileLayoutReducer from "./store/mobileLayout";
import seachLoadingReducer from "./store/searchLoading";
import searchErrorReducer from "./store/searchError";

export const store = configureStore({
  reducer: {
    mobileLayout: mobileLayoutReducer,
    seachLoading: seachLoadingReducer,
    searchError: searchErrorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
