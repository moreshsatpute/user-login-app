import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginForm from "./components/LoginForm";
import RegisterForm from "./components/RegisterForm";
import HomePage from "./components/HomePage";


function App() {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  return (
    <Router>
      <Routes>
      
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<LoginForm setUser={setUser} />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/home" element={user ? <HomePage user={user} /> : <Navigate to="/login" />} />
        
      </Routes>
    </Router>
  );
}

export default App;
