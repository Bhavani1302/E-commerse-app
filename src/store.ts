// store.ts
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./Auth"; // Path to your authSlice

export const store = configureStore({
  reducer: {
    auth: authReducer, // Name must match the slice name
  },
});

// Define RootState to help with typing in selectors
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
