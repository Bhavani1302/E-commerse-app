import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  email: "",
  password: "",
  isSignup: false,
};

const Auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPassword: (state, action) => {
      state.password = action.payload;
    },
    toggleSignup: (state) => {
      state.isSignup = !state.isSignup;
    },
  },
});

export const { setEmail, setPassword, toggleSignup } = Auth.actions;
export default Auth.reducer;
