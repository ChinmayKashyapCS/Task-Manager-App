import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  // =========================
  // SHOW LOADING (PREVENT FLICKER)
  // =========================
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
        <p>Loading...</p>
      </div>
    );
  }

  // =========================
  // NOT AUTHENTICATED → REDIRECT
  // =========================
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // =========================
  // AUTHORIZED
  // =========================
  return children;
}

export default ProtectedRoute;