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
- <img width="1083" height="833" alt="Screenshot 2026-04-16 123155" src="https://github.com/user-attachments/assets/9d7ff5c0-2282-4c00-b4c5-7107a77dd565" />
- <img width="1083" height="833" alt="Screenshot 2026-04-16 123155" src="https://github.com/user-attachments/assets/dbce1335-30cb-4768-8385-88f2e5d5282e" />
-<img width="1090" height="809" alt="Screenshot 2026-04-16 123324" src="https://github.com/user-attachments/assets/d9f49dc5-418c-450f-b468-9c58e95e4ec3" />
-<img width="1105" height="726" alt="Screenshot 2026-04-16 123337" src="https://github.com/user-attachments/assets/1d582080-efcc-45ea-8865-1fa537eadf18" />
-<img width="1107" height="874" alt="Screenshot 2026-04-16 123357" src="https://github.com/user-attachments/assets/312babff-afda-4d28-a0a5-44c341b10789" />
-<img width="1089" height="520" alt="Screenshot 2026-04-16 123406" src="https://github.com/user-attachments/assets/5665c423-bd58-4dda-82ea-c2429261eaa2" />
-<img width="1089" height="486" alt="Screenshot 2026-04-16 123451" src="https://github.com/user-attachments/assets/1e0d8351-26c9-433c-8994-dfe82d50cb0a" />







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



