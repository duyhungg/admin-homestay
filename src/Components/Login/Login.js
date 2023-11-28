import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
const Login = () => {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    // Kiểm tra các điều kiện trước khi gửi yêu cầu đăng nhập
    if (!username || !password) {
      console.error("Username and password are required.");
      return;
    }

    // Gọi hàm API đăng nhập bằng Axios
    try {
      const response = await axios.post(
        "https://gin-homestay.onrender.com/api/login",
        {
          username,
          password,
        }
      );
      // Xử lý kết quả từ hàm API
      if (response.data.user.username === "admin") {
        // Điều hướng đến trang chính sau khi đăng nhập thành công
        localStorage.setItem("token", response.data.access_token);
        navigate("/user");
      } else {
        // Xử lý lỗi đăng nhập không thành công (hiển thị thông báo lỗi, ví dụ)
        console.error(response.data.error);
      }
    } catch (error) {
      console.error("Lỗi khi gọi API đăng nhập", error);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form onSubmit={handleLogin}>
          <h3>Sign In</h3>

          <div className="mb-3">
            <label>Username</label>
            <input
              type="username"
              className="form-control"
              placeholder="Enter username"
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary" id="loginButton">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
