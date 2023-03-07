import React from "react";
import "./style.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Chat from "./pages/Chat";
import Register from "./pages/Register";
import Login from "./pages/Login";
import SetAvatar from "./pages/setAvatar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Chat />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/setAvatar" element={<SetAvatar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
