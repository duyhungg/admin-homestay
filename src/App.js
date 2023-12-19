import "./App.css";
import HomePage from "./Components/Home/HomePage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login";
import Room from "./Components/Room";
import CreateRoom from "./Components/CreateRoom";
import UpdateRoom from "./Components/UpdateRoom";
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/user" element={<HomePage />} />
          <Route path="/room" element={<Room />} />
          <Route path="/update/:id" element={<UpdateRoom />} />
          <Route path="/" element={<Login />} />
          <Route path="/createroom" element={<CreateRoom />} />
        </Routes>
        <div id="fb-root"></div>
        <div id="fb-customer-chat" class="fb-customerchat"></div>
      </div>
    </Router>
  );
}

export default App;
