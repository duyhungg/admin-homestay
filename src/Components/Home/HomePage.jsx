import { useEffect, useState } from "react";
import "../../App.css";
import { useSelector } from "react-redux";
import axios from "axios";

const HomePage = () => {
  const user = useSelector((state) => state.auth.login?.currentUser)
  const [test, setTest] = useState("")
  

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
            withCredentials: true
          }
        );
        setTest("")
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

  const handleRefresh = async() => {
    let res = await axios.post(
      "https://auth-server-fmp.vercel.app/test",
      {},
      {
        headers: {
          Authorization: `Bearer ${user?.data.token}`,
        },
        withCredentials: true
      }
    );
    const msg = res.data.message;
    setTest(msg);
  }

  return (
    <main className="home-container">
      {user ? (
        <>
          <div className="home-role">Your role: {user?.data.role}</div>
          <div>
            <button className="btn btn-success mt-5" onClick={handleRefresh}>
              Gọi API Test
            </button>
          </div>
          <div className="home-title">
            <h1>{test}</h1>
          </div>
        </>
      ) : (
        <>
          <div className="text-danger error-login">
            <h1>Welcome to FMP</h1>
            <p>Đăng nhập để hiển thị</p>
          </div>
        </>
      )}
    </main>
  );
};

export default HomePage;
