import { useEffect, useState } from "react";
import "../../App.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut, resetLoginError } from "../../redux/apiRequest";
import { createAxios } from "../../createInstance";
import { logoutSuccess } from "../../redux/authSlice";
import Loading from "../Loading/Loading";

const HomePage = () => {
  const user = useSelector((state) => state.auth.login?.currentUser);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let axiosJWT = createAxios(user, dispatch, logoutSuccess);
  const [test, setTest] = useState("");
  const [isApiCalling, setIsApiCalling] = useState(false); // Thêm state để theo dõi trạng thái của việc gọi API

  useEffect(() => {
    const handleRefresh = async () => {
      try {
        setIsApiCalling(true); // Bắt đầu gọi API, tắt nút "Gọi API Test"
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
      } finally {
        setIsApiCalling(false); // Hoàn thành gọi API, mở lại nút "Gọi API Test"
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

  const handleRefresh = async () => {
    setIsApiCalling(true);
    let res = await axios.post(
      "https://auth-server-fmp.vercel.app/test",
      {},
      {
        headers: {
          Authorization: `Bearer ${user?.data.token}`,
        },
        withCredentials: true,
      }
    );
    const msg = res.data.message;
    setTest(msg);
    setIsApiCalling(false); // Hoàn thành gọi API, mở lại nút "Gọi API Test"
  };

  const handleLogout = () => {
    dispatch(resetLoginError());
    logOut(dispatch, navigate, user?.data.token, axiosJWT);
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
              onClick={handleRefresh}
              disabled={isApiCalling} // Tắt nút khi đang gọi API
            >
              Gọi API Test
            </button>{" "}
            <button className="btn btn-success mt-5 " onClick={handleLogout}>
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
