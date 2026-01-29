import { configureStore } from "@reduxjs/toolkit";
import { countriesApi } from "../country-slice/coutries-api";
import { languagesApi } from "../languages-slice/languagesApi";
// Add this

export const store = configureStore({
  reducer: {
    [countriesApi.reducerPath]: countriesApi.reducer,
    [languagesApi.reducerPath]: languagesApi.reducer, // Add this
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    })
      .concat(countriesApi.middleware)
      .concat(languagesApi.middleware), // Add this
});

/* ===== Types ===== */
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
