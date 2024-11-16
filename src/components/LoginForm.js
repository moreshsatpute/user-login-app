// src/components/LoginForm.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function LoginForm({ setUser }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    // First, check if the user is in local storage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.username === username && storedUser.password === password) {
      setUser(storedUser);
      navigate("/home");
      return;
    }

    // If not found in local storage, check the API
    try {
      const response = await axios.get("https://dummyjson.com/users");
      const users = response.data.users;
      const foundUser = users.find(
        (user) => user.username === username && user.password === password
      );

      if (foundUser) {
        setUser(foundUser);
        navigate("/home");
      } else {
        setError("Invalid username or password");
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center  vh-100"  style={{ backgroundColor: "#7fb3d5" }}>
      <div className="card p-4" style={{ width: "300px" }}>
        <h4 className="card-title text-center">Login</h4>
        <div className="form-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group mb-4">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className="btn btn-primary btn-block mb-2" onClick={handleLogin}>
          Log In
        </button>
        {error && <p className="text-danger text-center mt-2">{error}</p>}
        <p className="text-center mt-3">
          Don’t have an account? <Link to="/register">Register here</Link>
        </p>
      </div>
    </div>
  );
}

export default LoginForm;
