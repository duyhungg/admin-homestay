import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../redux/apiRequest";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isValidate, setIsValidate] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const error = useSelector((state) => state.auth.registerUser?.msg);
  const [isFetching, setIsFetching] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    if (isFetching) {
      return;
    }

    setIsFetching(true);
    const newUser = {
      email: email,
      fullName: userName,
      password: password,
    };

    if (confirmPassword !== password) {
      setIsValidate("Mật khẩu nhập lại không đúng!!!");
      setIsFetching(false);
      return;
    } else if (!email || !userName || !password || !confirmPassword) {
      setIsValidate("Cần nhập đầy đủ thông tin!!!");
      setIsFetching(false);
      return;
    } else {
      const errorMessage = await registerUser(newUser, dispatch, navigate);
      setIsFetching(false);
      setIsValidate(errorMessage || error);
      if (!errorMessage) {
        // Đăng ký thành công, thực hiện chuyển hướng đến trang mới
        navigate("/"); // Thay đổi '/new-page' thành đường dẫn mà bạn muốn chuyển hướng đến
      }
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form onSubmit={handleRegister}>
          <h3>Sign Up</h3>
          <div className="mb-3">
            <label>Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Full Name"
              onChange={(e) => setUserName(e.target.value)}
              disabled={isFetching} // Tắt input khi đang fetch
            />
          </div>

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
          <div className="mb-3">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
              disabled={isFetching} // Tắt input khi đang fetch
            />
          </div>

          <div className="d-grid">
            <button
              type="submit"
              className="btn btn-primary"
              id="signUpButton"
              disabled={isFetching} // Tắt nút "Sign Up" khi đang fetch
            >
              Sign Up
            </button>
          </div>
          <p className="forgot-password text-right">
            Already registered <Link to="/">Sign In?</Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
