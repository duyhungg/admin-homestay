import {  useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../redux/apiRequest";
import { useDispatch, useSelector } from "react-redux";
const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");
    const [isValidate, setIsValidate] = useState("");
    const error = useSelector((state)=> state.auth.login?.msg)
    const dispatch = useDispatch()
    const navigate = useNavigate()
     
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
      <section className="login-container">
        <div className="login-title"> Log in</div>
        <form onSubmit={handleLogin}>
          <div>
            <span className="text-danger">{isValidate}</span>
          </div>
          <label>EMAIL</label>
          <input
            type="email"
            className="mb-2"
            placeholder="Enter your Email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>PASSWORD</label>
          <input
            type="password"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="btn btn-primary mt-3">
            {" "}
            Log in{" "}
          </button>
        </form>
        <Link className="login-register-link" to="/register">
          Register{" "}
        </Link>
      </section>
    );
}
 
export default Login;