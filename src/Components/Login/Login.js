import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidate, setIsValidate] = useState("");
  const [isFetching, setIsFetching] = useState(false);
  const error = useSelector((state) => state.auth.login?.msg);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (isFetching) {
      return;
    }

    setIsFetching(true);
    const newUser = {
      email: email,
      password: password,
    };

    if (!email || !password) {
      setIsValidate("Cần điền đầy đủ thông tin!!");
      setIsFetching(false); // Tắt trạng thái fetch
      return;
    } else {
      const errorMessage = await loginUser(newUser, dispatch, navigate);
      // Xử lý lỗi từ API login
      setIsValidate(errorMessage || error);
      if (!errorMessage) {
        navigate("/user"); // Thay đổi '/new-page' thành đường dẫn mà bạn muốn chuyển hướng đến
      }
      setIsFetching(false); // Tắt trạng thái fetch sau khi hoàn thành
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form onSubmit={handleLogin}>
          <h3>Sign In</h3>

          <div className="mb-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter email"
              onChange={(e) => setEmail(e.target.value)}
              disabled={isFetching} // Tắt input khi đang fetch
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              onChange={(e) => setPassword(e.target.value)}
              disabled={isFetching} // Tắt input khi đang fetch
            />
          </div>

          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-primary"
              id="loginButton"
              disabled={isFetching} // Tắt nút "Login" khi đang fetch
            >
              Login
            </button>
          </div>
          <p className="forgot-password text-right">
            <Link to="/register">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
