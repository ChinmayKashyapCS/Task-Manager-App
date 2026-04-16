import { useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { user, logout, loading } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    localStorage.removeItem("token"); // ✅ extra safety
    navigate("/login");
  };

  // ✅ Highlight active route
  const isActive = (path) => location.pathname === path;

  // ✅ Prevent flicker while checking auth
  if (loading) return null;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      
      {/* Logo */}
      <Link className="navbar-brand fw-bold" to="/">
        Task Manager
      </Link>

      {/* Mobile Toggle */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarContent"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className="collapse navbar-collapse justify-content-end" id="navbarContent">
        <ul className="navbar-nav align-items-center">

          {/* 🔓 Not Logged In */}
          {!user && (
            <>
              <li className="nav-item">
                <Link
                  className={`nav-link ${isActive("/login") ? "active" : ""}`}
                  to="/login"
                >
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link
                  className={`nav-link ${isActive("/register") ? "active" : ""}`}
                  to="/register"
                >
                  Register
                </Link>
              </li>
            </>
          )}

          {/* 🔐 Logged In */}
          {user && (
            <>
              <li className="nav-item">
                <Link
                  className={`nav-link ${isActive("/dashboard") ? "active" : ""}`}
                  to="/dashboard"
                >
                  Dashboard
                </Link>
              </li>

              {/* Username */}
              <li className="nav-item ms-2">
                <span className="nav-link text-info fw-semibold">
                  {user.username}
                </span>
              </li>

              {/* Logout */}
              <li className="nav-item ms-2">
                <button
                  className="btn btn-sm btn-danger"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </li>
            </>
          )}

        </ul>
      </div>
    </nav>
  );
}

export default Navbar;