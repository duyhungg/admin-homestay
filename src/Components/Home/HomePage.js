import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { createAxios } from "../../createInstance";
import { testSuccess } from "../../redux/testSlice";
import { apiTest, logOut, resetLoginError } from "../../redux/apiRequest";
import jwt_decode from "jwt-decode";
import { logoutSuccess, updateToken } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading/Loading";

const HomePage = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const [test, setTest] = useState("");
  const dispatch = useDispatch();
  let axiosJWT = createAxios(user, dispatch, logoutSuccess);
  const navigate = useNavigate();
  const [isFetching, setIsFetching] = useState(false);
  const [isApiRequesting, setIsApiRequesting] = useState(false);
  useEffect(() => {
    const handleRefresh = async () => {
      try {
        const res = await axios.post(
          "https://auth-server-fmp.vercel.app/auth/refresh-token",
          {},
          {
            headers: {
              Authorization: `Bearer ${user?.data.token}`,
            },
            withCredentials: true,
          }
        );
        setTest("");
        console.log(res);
      } catch (error) {
        console.error(error);
      }
    };

    const handleKeyDown = (event) => {
      if (event.keyCode === 116) {
        event.preventDefault();
        handleRefresh();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  // const handleTest = () => {
  //   apiTest(dispatch, user?.data.token, axiosJWT);
  //   msg = message?.message;
  //   setTest(msg);
  // }

  function isTokenExpired(token) {
    if (!token) {
      return true;
    }

    const decodeToken = jwt_decode(token);
    if (!decodeToken) {
      return true;
    }

    const currentTime = new Date().getTime() / 1000;
    if (currentTime >= decodeToken.exp) {
      return true;
    } else {
      return false;
    }
  }

  const handleApiRequest = async () => {
    if (isApiRequesting) {
      return;
    }

    setIsApiRequesting(true);

    let token = user?.data.token;
    console.log("check", token);
    // Kiểm tra thời gian hết hạn của token
    const isToken = isTokenExpired(token); // Đây là một hàm bạn cần tự định nghĩa

    if (isToken) {
      try {
        // Token hết hạn, gọi API refresh token
        const refreshRes = await axios.post(
          "https://auth-server-fmp.vercel.app/auth/refresh-token",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            withCredentials: true,
          }
        );

        console.log("refresh", refreshRes);

        // Lấy token mới thành công
        token = refreshRes.data.data.token;
        dispatch(updateToken(token));

        // Lưu newToken vào local storage hoặc nơi lưu trữ khác
      } catch (refreshError) {
        if (refreshError.response) {
          const refreshStatus = refreshError.response.status;

          if (refreshStatus === 401) {
            // Mã trạng thái 401 khi cố gắng refresh token nghĩa là refre
            logOut(dispatch, navigate, user?.data.token, axiosJWT);
            return; // Kết thúc xử lý nếu refresh token hết hạn
          }
        }
      }
    }

    // Sau khi kiểm tra token và refresh token (nếu cần), thực hiện gọi API test
    try {
      let res = await axios.post(
        "https://auth-server-fmp.vercel.app/test",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        }
      );

      console.log("test", res.data);
      setTest(res.data.message);

      // Xử lý phản hồi từ API test ở đây
    } catch (error) {
      if (error.response) {
        const status = error.response.status;

        if (status === 401) {
          // Mã trạng thái 401 sau khi gọi API test nghĩa là token hết hạn
          // Bạn có thể thực hiện đăng xuất người dùng ở đây
          logOut(dispatch, navigate, user?.data.token, axiosJWT);
          console.log("Token hết hạn. Đăng xuất người dùng.");
        }
      }
    } finally {
      // Tắt cờ isApiRequesting sau khi yêu cầu hoàn thành (thành công hoặc thất bại)
      setIsApiRequesting(false);
    }
  };
  const handleLogout = () => {
    if (isFetching) {
      return;
    }
    setIsFetching(true);
    try {
      dispatch(resetLoginError());
      logOut(dispatch, navigate, user?.data.token, axiosJWT);
    } catch (error) {
      console.log(error);
    } finally {
      setIsFetching(false);
    }
  };

  return (
    <main className="container">
      {user ? (
        <>
          <div className="home-role">Your role: {user?.data.role}</div>
          <p className="navbar-user">
            Hello, <span> {user?.data.email} </span>{" "}
          </p>
          <div className="gap-20 mb-3">
            <button
              className="btn btn-success mt-5"
              id="refresh"
              onClick={handleApiRequest}
              disabled={isApiRequesting}
            >
              Gọi API Test
            </button>{" "}
            <button
              className="btn btn-success mt-5 "
              onClick={handleLogout}
              disabled={isFetching}
            >
              Logout
            </button>
          </div>
          <div className="home-title">
            <h1>{test}</h1>
          </div>
        </>
      ) : (
        <Loading></Loading>
      )}
    </main>
  );
};

export default HomePage;
