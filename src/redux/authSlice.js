import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    login: {
      currentUser: null,
      isFetching: false,
      error: false,
      msg: null,
    },
    register: {
      isFetching: false,
      error: false,
      success: false,
    },
  },
  reducers: {
    loginStart: (state) => {
      state.login.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.login.isFetching = false;
      state.login.currentUser = action.payload;
      state.login.error = false;
      state.login.msg = null;
    },
    loginFailed: (state, action) => {
      state.login.isFetching = false;
      state.login.error = true;
      state.login.msg = action.payload;
    },
    loginResetError: (state) => {
      state.login.error = false;
      state.login.msg = "";
    },
    registerStart: (state) => {
      state.register.isFetching = true;
    },
    registerSuccess: (state) => {
      state.register.isFetching = false;
      state.register.error = false;
      state.register.success = true;
    },
    registerFailed: (state) => {
      state.register.isFetching = false;
      state.register.error = true;
    },
    logoutStart: (state) => {
      state.login.isFetching = true;
    },
    logoutSuccess: (state) => {
      state.login.isFetching = false;
      state.login.currentUser = null;
      state.login.error = false;
      state.login.msg = null;
    },
    logoutFailed: (state) => {
      state.login.isFetching = false;
      state.login.error = true;
      state.login.msg = null;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailed,
  registerStart,
  registerSuccess,
  registerFailed,
  logoutFailed,
  logoutStart,
  logoutSuccess,
  loginResetError,
} = authSlice.actions;

export default authSlice.reducer;
