import { Routes, Route } from "react-router-dom";
import Homepage from "./views/homepage/Homepage";
import Login from "./views/login/Login";
import Register from "./views/register/Register";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </div>
  );
}

export default App;
