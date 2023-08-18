import {BrowserRouter,  Routes, Route} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/register";
import Chat from "./pages/Chat";
import "./index.css";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        <Route path="/" element={<Chat />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
