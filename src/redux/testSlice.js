import { createSlice } from "@reduxjs/toolkit";

const testSlice = createSlice({
  name: "testAPI",
  initialState: {
    testApi: {
      isFetching: false,
      error: false,
      msg: null,
    },
  },
  reducers: {
    testStart: (state) => {
      state.testApi.isFetching = true;
    },
    testSuccess: (state, action) => {
      state.testApi.isFetching = false;
      state.testApi.msg = action.payload;
      state.testApi.error = false;
    },
    testFailed: (state) => {
      state.testApi.isFetching = false;
      state.testApi.error = true;
    },
  },
});

export const { testFailed, testStart, testSuccess } = testSlice.actions;

export default testSlice.reducer;
