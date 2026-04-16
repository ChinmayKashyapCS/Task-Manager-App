# 🚀 Task Manager – Full Stack Assignment

A scalable full-stack web application with authentication, role-based access, and task management built as part of a backend developer internship assignment.

---
### Chinmay Kashyap CS
### https://github.com/ChinmayKashyapCS/Task-Manager-App


## 📌 Features

### 🔐 Authentication & Authorization
- User Registration & Login
- JWT-based Authentication
- Role-based access (User / Admin)
- Secure password hashing

### 📋 Task Management (CRUD)
- Create tasks
- View tasks (user-specific / admin-all)
- Update task status (pending/completed)
- Delete tasks

### 🧠 Backend Highlights
- RESTful API design
- Modular architecture (Blueprints)
- Input validation & sanitization
- Centralized error handling
- JWT security implementation

### 💻 Frontend Highlights
- React.js (modern hooks-based UI)
- Protected routes
- Axios with interceptors
- Responsive Bootstrap UI
- Clean UX with loading & error states

---

## 🛠️ Tech Stack

### Backend
- Python (Flask)
- Flask-JWT-Extended
- SQLAlchemy (ORM)
- SQLite / PostgreSQL

### Frontend
- React.js
- React Router
- Axios
- Bootstrap

---

## 📂 Project Structure

backend/
│── app.py
│── config.py
│── models.py
│── routes/
│ ├── auth.py
│ ├── task.py
│── utils/
│ ├── jwt.py
│ ├── validators.py

frontend/
│── src/
│ ├── api/
│ ├── pages/
│ ├── components/
│ ├── context/
│ ├── routes/
│── App.js
│── main.jsx


---

## ⚙️ Setup Instructions

### 🔹 Backend Setup

```bash
cd backend
pip install -r requirements.txt
python app.py

Server runs on:

http://127.0.0.1:5000
🔹 Frontend Setup
cd frontend
npm install
npm run dev

App runs on:

http://localhost:5173
🔑 API Endpoints
Auth
POST /api/v1/auth/register
POST /api/v1/auth/login
GET /api/v1/auth/me
Tasks
GET /api/v1/tasks
POST /api/v1/tasks
PUT /api/v1/tasks/:id
DELETE /api/v1/tasks/:id
🔐 Security Practices
JWT authentication with expiration
Password hashing using Werkzeug
Input validation on all endpoints
Protected routes in frontend & backend
Auto logout on token expiry
📊 Scalability Considerations
Modular architecture for easy feature expansion
Can be extended into microservices (auth, tasks separately)
Redis caching can be added for performance
Load balancing via Nginx in production
Docker-ready structure
🌟 Future Improvements
Admin dashboard (role-based UI)
Task filtering & search
Notifications (toast system)
Pagination for large datasets
Deployment (AWS / Render / Vercel)



