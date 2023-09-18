import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../redux/apiRequest";

const Register = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isValidate, setIsValidate] = useState("");
  const [isRegistering, setIsRegistering] = useState(false); // Thêm state để theo dõi việc đăng kí
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Khi isRegistering thay đổi, bạn có thể tắt/bật nút "Sign Up" tại đây
    if (isRegistering) {
      // Đang đăng kí, tắt nút "Sign Up"
      document.getElementById("signUpButton").setAttribute("disabled", "true");
    } else {
      // Không đang đăng kí, bật lại nút "Sign Up"
      document.getElementById("signUpButton").removeAttribute("disabled");
    }
  }, [isRegistering]);

  const handleRegister = (e) => {
    e.preventDefault();
    const newUser = {
      email: email,
      fullName: userName,
      password: password,
    };
    if (confirmPassword !== password) {
      setIsValidate("Mật khẩu nhập lại không đúng!!!");
      return;
    } else if (!email || !userName || !password || !confirmPassword) {
      setIsValidate("Cần nhập đầy đủ thông tin!!!");
      return;
    } else {
      setIsValidate("");
      setIsRegistering(true); // Đánh dấu đang đăng kí
      registerUser(newUser, dispatch, navigate).then(() => {
        setIsRegistering(false); // Đánh dấu đã hoàn thành đăng kí
      });
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
            />
          </div>

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
          <div className="mb-3">
            <label>Confirm Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>

          <div className="d-grid">
            <button type="submit" className="btn btn-primary" id="signUpButton">
              Sign Up
            </button>
          </div>
          <p className="forgot-password text-right">
            Already registered <a href="/">Sign In?</a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
