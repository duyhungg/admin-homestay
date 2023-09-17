import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isValidate, setIsValidate] = useState("");
  const error = useSelector((state) => state.auth.login?.msg);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const newUser = {
      email: email,
      password: password,
    };
    const errorMessage = await loginUser(newUser, dispatch, navigate); // Lưu thông báo lỗi vào biến
    if (!email || !password) {
      setIsValidate("Cần điền đầy đủ thông tin!!");
      return;
    } else {
      setIsValidate(errorMessage || error); // Hiển thị thông báo lỗi nếu có
      await loginUser(newUser, dispatch, navigate);
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
            <button type="submit" className="btn btn-primary">
              login
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
