"use client"

import { Link, useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../state/AuthContext.jsx"

export default function Navbar() {
  const { token, user, logout } = useAuth()
  const loc = useLocation()
  const navigate = useNavigate()
  const onLogout = () => {
    logout()
    navigate("/login")
  }

  return (
    <div className="header">
      <div>
        <strong>Task Manager</strong>
      </div>
      <div className="row" style={{ alignItems: "center" }}>
        {!token ? (
          <>
            <Link to="/login" className="btn secondary" aria-current={loc.pathname === "/login"}>
              Login
            </Link>
            <Link to="/register" className="btn" aria-current={loc.pathname === "/register"}>
              Sign up
            </Link>
          </>
        ) : (
          <>
            <div className="small">Signed in as {user?.name}</div>
            <button className="btn secondary" onClick={() => navigate("/tasks")}>
              Tasks
            </button>
            <button className="btn danger" onClick={onLogout}>
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  )
}
