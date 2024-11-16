import React from "react";
import { useNavigate } from "react-router-dom";

function HomePage({ user }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear user data from localStorage
    localStorage.removeItem("user");

    // Redirect to the login page
    navigate("/login");
  };

  return (
    <div className="container mt-5">
      <div className="card">
        <div className="card-header text-center">
          <h2>
            Welcome, {user?.firstName} {user?.lastName}
          </h2>
        </div>
        <div className="card-body text-center">
          <img src={user?.image} alt="User" className="img-fluid rounded-circle mb-3" style={{ width: "150px", height: "150px" }} />
          <p>
            <strong>Email:</strong> {user?.email}
          </p>
          <p>
            <strong>Phone:</strong> {user?.phone}
          </p>
          <p>
            <strong>Address:</strong> {user?.address?.city}, {user?.address?.state}
          </p>
          {/* Logout Button */}
          <button className="btn btn-danger mt-3" onClick={handleLogout}>
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
