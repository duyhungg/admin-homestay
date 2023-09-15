import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../redux/apiRequest";
const Register = () => {
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("");
    const [email, setEmail] = useState("");
    const [isValidate, setIsValidate] = useState("");
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const handleRegister = (e) => {
        e.preventDefault()
        const newUser = {
            email: email,
            fullName: userName,
            password: password
        }
        if (confirmPassword !== password) {
           setIsValidate("Mật khẩu nhập lại không đúng!!!")
           return;
        } else
        if (!email || !userName || !password || !confirmPassword) {
          setIsValidate("Cần nhập đầy đủ thông tin!!!");
          return;
        } else {
          registerUser(newUser, dispatch, navigate);
          setIsValidate("")
        }
    }
    return (
      <section className="register-container">
        <div className="register-title"> Register </div>
        <form onSubmit={handleRegister}>
          <div>
            <span className="text-danger mb-2">{isValidate}</span>
          </div>
          <label>EMAIL</label>
          <input
            type="email"
            className="mb-2"
            placeholder="Enter your email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label>FullName</label>
          <input
            type="text"
            className="mb-2"
            placeholder="Enter your fullName"
            onChange={(e) => setUserName(e.target.value)}
          />
          <label>PASSWORD</label>
          <input
            type="password"
            className="mb-2"
            placeholder="Enter your password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label>CONFIRM PASSWORD</label>
          <input
            type="password"
            className="mb-2"
            placeholder="Confirm password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit" className="btn btn-primary mt-3">
            {" "}
            Create account{" "}
          </button>
        </form>
      </section>
    );
}
 
export default Register;