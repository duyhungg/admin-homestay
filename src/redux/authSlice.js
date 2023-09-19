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
      msg: null,
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
      state.login.msg = null;
    },
    registerFailed: (state, action) => {
      state.register.isFetching = false;
      state.register.error = true;
      state.login.msg = action.payload;
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
    updateToken: (state, action) => {
      // Cập nhật token trong Redux store
      state.login.currentUser.data.token = action.payload;
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
  updateToken,
} = authSlice.actions;

export default authSlice.reducer;
