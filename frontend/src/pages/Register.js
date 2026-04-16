import { useState, useEffect, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";

function Register() {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // =========================
  // REDIRECT IF LOGGED IN
  // =========================
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  // =========================
  // HANDLE CHANGE
  // =========================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(""); // ✅ clear error while typing
  };

  // =========================
  // HANDLE SUBMIT
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (
      !form.username.trim() ||
      !form.email.trim() ||
      !form.password.trim()
    ) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);

      await API.post("/auth/register", form);

      // ✅ Success
      setSuccess("Registration successful! Redirecting...");

      setTimeout(() => {
        navigate("/login");
      }, 1200);

    } catch (err) {
      // ✅ FIX: use axios interceptor message
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
      <div className="card shadow p-4" style={{ width: "400px" }}>
        
        <h3 className="text-center mb-3">Register</h3>

        {error && <div className="alert alert-danger py-2">{error}</div>}
        {success && <div className="alert alert-success py-2">{success}</div>}

        <form onSubmit={handleSubmit}>
          
          <div className="mb-3">
            <label>Username</label>
            <input
              name="username"
              className={`form-control ${error ? "is-invalid" : ""}`}
              placeholder="Enter username"
              value={form.username} // ✅ controlled
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className={`form-control ${error ? "is-invalid" : ""}`}
              placeholder="Enter email"
              value={form.email} // ✅ controlled
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className={`form-control ${error ? "is-invalid" : ""}`}
              placeholder="Enter password"
              value={form.password} // ✅ controlled
              onChange={handleChange}
            />
          </div>

          <button
            className="btn btn-success w-100"
            disabled={
              loading ||
              !form.username.trim() ||
              !form.email.trim() ||
              !form.password.trim()
            } // ✅ UX fix
          >
            {loading ? "Registering..." : "Register"}
          </button>

        </form>

        {/* 🔁 Back to Login */}
        <p className="text-center mt-3">
          Already have an account?{" "}
          <Link to="/login">Login</Link>
        </p>

      </div>
    </div>
  );
}

export default Register;