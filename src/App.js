import "./App.css";
import HomePage from "./Components/Home/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login";
import Validate from "./Components/Validate";
import Confirm from "./Components/Confirm";
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/user" element={<HomePage />} />
          <Route path="/admin/confirm" element={<HomePage />} />
          <Route path="/admin/validate" element={<HomePage />} />
          <Route path="/" element={<Login />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
