import axios from "axios";
import {
  loginFailed,
  loginResetError,
  loginStart,
  loginSuccess,
  logoutFailed,
  logoutStart,
  logoutSuccess,
  registerFailed,
  registerStart,
  registerSuccess,
} from "./authSlice";
import { testFailed, testStart, testSuccess } from "./testSlice";

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(
      "https://auth-server-fmp.vercel.app/auth/login",
      user,
      {
        withCredentials: true,
      }
    );
    dispatch(loginSuccess(res.data));
    window.localStorage.setItem("token", res?.data.data.token);
    navigate("/user");
    return null; // Trả về null khi không có lỗi
  } catch (error) {
    dispatch(loginFailed(error.response.data.message));
    return error.response.data.message; // Trả về thông báo lỗi khi có lỗi
  }
};

export const resetLoginError = () => {
  return (dispatch) => {
    dispatch(loginResetError());
  };
};

export const registerUser = async (user, dispatch, navigate) => {
  dispatch(registerStart());
  try {
    await axios.post("https://auth-server-fmp.vercel.app/auth/register", user, {
      withCredentials: true,
    });
    dispatch(registerSuccess());
    navigate("/");
    return null;
  } catch (error) {
    dispatch(registerFailed(error.response.data.message));
    return error.response.data.message;
  }
};

export const logOut = async (dispatch, navigate, accessToken, axiosJWT) => {
  dispatch(logoutStart());
  try {
    await axiosJWT.post(
      "https://auth-server-fmp.vercel.app/auth/logout",
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredential: true,
      }
    );
    dispatch(logoutSuccess());
    window.localStorage.removeItem("token");
    navigate("/");
  } catch (error) {
    dispatch(logoutFailed());
  }
};

export const apiTest = async (dispatch, accessToken, axiosJWT) => {
  dispatch(testStart());
  try {
    const res = await axiosJWT.post(
      "https://auth-server-fmp.vercel.app/test",
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        withCredential: true,
      }
    );
    dispatch(testSuccess(res.data));
  } catch (error) {
    dispatch(testFailed());
  }
};
