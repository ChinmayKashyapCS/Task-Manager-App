import { useEffect, useState } from "react";
import API from "../api/axios";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [error, setError] = useState("");

  // =========================
  // FETCH TASKS
  // =========================
  const fetchTasks = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await API.get("/tasks");
      setTasks(res.data?.tasks || []);

    } catch (err) {
      console.log("TASK ERROR:", err);

      const msg =
        err?.message ||
        err?.response?.data?.error ||
        "Failed to load tasks";

      setError(msg);

      // 🔐 Auto logout if token invalid
      if (err?.status === 401 || err?.status === 422) {
        localStorage.removeItem("token");
        window.location.href = "/login";
      }

    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // =========================
  // ADD TASK
  // =========================
  const handleAddTask = async () => {
    if (!title.trim()) {
      setError("Task title is required");
      return;
    }

    try {
      setActionLoading(true);
      setError("");

      await API.post("/tasks", { title });

      setTitle("");
      fetchTasks();

    } catch (err) {
      const msg =
        err?.message ||
        err?.response?.data?.error ||
        "Failed to add task";

      setError(msg);

    } finally {
      setActionLoading(false);
    }
  };

  // =========================
  // TOGGLE TASK
  // =========================
  const handleToggle = async (task) => {
    try {
      setActionLoading(true);
      setError("");

      await API.put(`/tasks/${task.id}`, {
        status: task.status === "pending" ? "completed" : "pending"
      });

      fetchTasks();

    } catch (err) {
      const msg =
        err?.message ||
        err?.response?.data?.error ||
        "Failed to update task";

      setError(msg);

    } finally {
      setActionLoading(false);
    }
  };

  // =========================
  // DELETE TASK
  // =========================
  const handleDelete = async (id) => {
    try {
      setActionLoading(true);
      setError("");

      await API.delete(`/tasks/${id}`);

      fetchTasks();

    } catch (err) {
      const msg =
        err?.message ||
        err?.response?.data?.error ||
        "Failed to delete task";

      setError(msg);

    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="container mt-4">

      <h3 className="mb-3">Dashboard</h3>

      {/* ❗ Error */}
      {error && (
        <div className="alert alert-danger">{error}</div>
      )}

      {/* ➕ Add Task */}
      <div className="card p-3 mb-4 shadow-sm">
        <h5>Add New Task</h5>

        <div className="input-group">
          <input
            className={`form-control ${error ? "is-invalid" : ""}`}
            placeholder="Enter task title..."
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setError("");
            }}
          />

          <button
            className="btn btn-primary"
            onClick={handleAddTask}
            disabled={actionLoading || !title.trim()} // ✅ FIX
          >
            {actionLoading ? "Adding..." : "Add"}
          </button>
        </div>
      </div>

      {/* 🔄 Loading */}
      {loading && <p>Loading tasks...</p>}

      {/* 📭 Empty State */}
      {!loading && tasks.length === 0 && !error && (
        <div className="text-center text-muted">
          No tasks yet. Add your first task 🚀
        </div>
      )}

      {/* 📋 Task List */}
      <div className="row">
        {tasks.map((task) => (
          <div className="col-md-4 mb-3" key={task.id}>
            <div className="card shadow-sm h-100">
              <div className="card-body">

                <h5 className="card-title">{task.title}</h5>

                <span
                  className={`badge ${
                    task.status === "completed"
                      ? "bg-success"
                      : "bg-warning text-dark"
                  }`}
                >
                  {task.status}
                </span>

                <div className="mt-3 d-flex justify-content-between">

                  <button
                    className="btn btn-sm btn-outline-primary"
                    onClick={() => handleToggle(task)}
                    disabled={actionLoading}
                  >
                    Toggle
                  </button>

                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(task.id)}
                    disabled={actionLoading}
                  >
                    Delete
                  </button>

                </div>

              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Dashboard;