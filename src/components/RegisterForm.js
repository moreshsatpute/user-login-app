// src/components/RegisterForm.js
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function RegisterForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    const newUser = {
      username,
      password,
      email,
      mobile,
    };

    try {
      // Send POST request to create a new user on the API
      console.log("Sending data to API:", newUser); 
      const response = await axios.post("https://dummyjson.com/users/add", newUser);
      console.log("API response:", response);

      if (response.status === 201) {
        // Update was successful; store user data in local storage
        localStorage.setItem("user", JSON.stringify(newUser));
        setSuccess("Registration successful!");
        
        // Redirect to login page or home page after successful registration
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (err) {
      console.error("Error creating user:", err);
      setError("Failed to register. Please try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4" style={{ width: "300px" }}>
        <h4 className="card-title text-center">Register</h4>
        {success && <p className="text-success text-center">{success}</p>}
        {error && <p className="text-danger text-center">{error}</p>}
        
        <div className="form-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-group mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="form-group mb-3">
          <input
            type="email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Mobile"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
        </div>
        
        <button className="btn btn-primary btn-block" onClick={handleRegister}>
          Register
        </button>
      </div>
    </div>
  );
}

export default RegisterForm;
