import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:5000/api/v1",
  timeout: 10000, // ✅ prevents hanging requests
  headers: {
    "Content-Type": "application/json",
  },
});


// =========================
// REQUEST INTERCEPTOR
// =========================
API.interceptors.request.use(
  (req) => {
    const token = localStorage.getItem("token");

    if (token) {
      req.headers.Authorization = `Bearer ${token}`;
    }

    return req;
  },
  (error) => Promise.reject(error)
);


// =========================
// RESPONSE INTERCEPTOR
// =========================
API.interceptors.response.use(
  (response) => response,

  (error) => {
    const status = error.response?.status;

    // 🔐 Handle invalid / expired token
    if (status === 401 || status === 422) {
      localStorage.removeItem("token");

      // Prevent infinite redirect loop
      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    // ✅ Normalize error message
    const message =
      error.response?.data?.error ||
      error.response?.data?.msg ||
      error.message ||
      "Something went wrong";

    return Promise.reject({
      message,
      status,
    });
  }
);

export default API;