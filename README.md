# Task Manager App
- A full-stack Task Manager application built with React, Express, and MongoDB. Users can sign up, log in, and manage tasks with CRUD functionality and status tracking.

# deployed link
- frontend : https://task-manager-frontend-vp7q.onrender.com
- backend : https://task-manager-backend-o64r.onrender.com

# Screenshot 
<img width="1150" height="885" alt="Screenshot (17)" src="https://github.com/user-attachments/assets/097c89d2-9a00-4f9e-bd00-89d0487e2277" />

# Features
- User Authentication: Sign-up and login with JWT.
- Task Management: Add, edit, delete, and view tasks.
- Task Status: Toggle tasks between pending and completed.
- Persistent Storage: Tasks stored in MongoDB.
- Deployment: Backend deployed on Heroku/Render/Vercel/AWS Free Tier.

# Tech Stack
- Frontend: React, Axios, React Router, Tailwind CSS (optional)
- Backend: Node.js, Express.js, JWT authentication
- Database: MongoDB (Atlas or local)
- Deployment: Heroku / Render / Vercel

# Project Setup
- clone the repository 
- frontend
```
cd frontend
npm i react-router-dom
VITE_API_BASE = "http://localhost:5000" (in the .env)
```
- backend
```
cd backend
npm install bcryptjs cors dotenv express jsonwebtoken mongoose morgan
make a .env in the root and config these below variable
MONGODB_URI=".........................."
JWT_SECRET=taskmanagersecret
PORT=5000
```
