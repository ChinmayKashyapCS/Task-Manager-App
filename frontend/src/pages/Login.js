import { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const { login, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // =========================
  // REDIRECT IF ALREADY LOGGED IN
  // =========================
  useEffect(() => {
    if (user) {
      navigate("/dashboard");
    }
  }, [user, navigate]);

  // =========================
  // HANDLE INPUT CHANGE
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

    if (!form.email.trim() || !form.password.trim()) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);

      const res = await API.post("/auth/login", form);

      // ✅ Save user + token
      login(res.data);

      // ✅ Redirect
      navigate("/dashboard");

    } catch (err) {
      // ✅ FIX: use axios interceptor message
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
      <div className="card shadow p-4" style={{ width: "400px" }}>
        
        <h3 className="text-center mb-3">Login</h3>

        {error && <div className="alert alert-danger py-2">{error}</div>}

        <form onSubmit={handleSubmit}>
          
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className={`form-control ${error ? "is-invalid" : ""}`}
              placeholder="Enter email"
              value={form.email} // ✅ controlled input
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
              value={form.password} // ✅ controlled input
              onChange={handleChange}
            />
          </div>

          <button
            className="btn btn-primary w-100"
            disabled={loading || !form.email.trim() || !form.password.trim()} // ✅ UX fix
          >
            {loading ? "Logging in..." : "Login"}
          </button>

        </form>

        {/* 🔁 Register Redirect */}
        <p className="text-center mt-3">
          Don't have an account?{" "}
          <Link to="/register">Register</Link>
        </p>

      </div>
    </div>
  );
}

export default Login;