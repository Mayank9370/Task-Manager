"use client"

import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { api } from "../api.js"
import { useAuth } from "../state/AuthContext.jsx"

export default function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const { setToken, setUser } = useAuth()
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const res = await api.register({ name, email, password })
      setToken(res.token)
      setUser(res.user)
      navigate("/tasks")
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="card" style={{ maxWidth: 420, margin: "40px auto" }}>
      <h2 style={{ marginTop: 0 }}>Create account</h2>
      <form onSubmit={onSubmit}>
        <div className="space"></div>
        <label>Name</label>
        <input className="input" value={name} onChange={(e) => setName(e.target.value)} required minLength={2} />
        <div className="space"></div>
        <label>Email</label>
        <input className="input" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <div className="space"></div>
        <label>Password</label>
        <input
          className="input"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          minLength={6}
        />
        {error ? <div className="space"></div> : null}
        {error ? (
          <div className="small" style={{ color: "#e05656" }}>
            {error}
          </div>
        ) : null}
        <div className="space"></div>
        <button className="btn" disabled={loading}>
          {loading ? "Creating..." : "Sign up"}
        </button>
      </form>
      <div className="space"></div>
      <div className="small">
        Already have an account? <Link to="/login">Login</Link>
      </div>
    </div>
  )
}
