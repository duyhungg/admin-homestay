import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidate, setIsValidate] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false); // Thêm state để theo dõi việc đăng nhập
  const error = useSelector((state) => state.auth.login?.msg);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Khi isLoggingIn thay đổi, bạn có thể tắt/bật nút "login" tại đây
    if (isLoggingIn) {
      // Đang đăng nhập, tắt nút "login"
      document.getElementById("loginButton").setAttribute("disabled", "true");
    } else {
      // Không đăng nhập, bật lại nút "login"
      document.getElementById("loginButton").removeAttribute("disabled");
    }
  }, [isLoggingIn]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const newUser = {
      email: email,
      password: password,
    };
    const errorMessage = await loginUser(newUser, dispatch, navigate);
    if (!email || !password) {
      setIsValidate("Cần điền đầy đủ thông tin!!");
      return;
    } else {
      setIsValidate(errorMessage || error);
      setIsLoggingIn(true); // Đánh dấu đang đăng nhập
      await loginUser(newUser, dispatch, navigate);
      setIsLoggingIn(false); // Đánh dấu đã hoàn thành đăng nhập
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
          <p className="forgot-password text-right">
            <Link to="/register">Sign Up</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
