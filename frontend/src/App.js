import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./routes/ProtectedRoute";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import { useContext } from "react";


// =========================
// SMART REDIRECT
// =========================
function HomeRedirect() {
  const { user, loading } = useContext(AuthContext);

  if (loading) return null; // ✅ prevent flicker

  return user ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />;
}


// =========================
// ROUTES
// =========================
function AppRoutes() {
  const { user, loading } = useContext(AuthContext);

  // ✅ Wait until auth check completes
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />

      <Routes>
        {/* Default */}
        <Route path="/" element={<HomeRedirect />} />

        {/* Auth Routes */}
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/dashboard" replace />}
        />

        <Route
          path="/register"
          element={!user ? <Register /> : <Navigate to="/dashboard" replace />}
        />

        {/* Protected */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route
          path="*"
          element={
            <div className="text-center mt-5">
              <h3>404 Not Found</h3>
              <p>Page does not exist</p>
            </div>
          }
        />
      </Routes>
    </>
  );
}


// =========================
// APP ROOT
// =========================
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;