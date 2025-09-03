"use client"

import { useEffect, useMemo, useState } from "react"
import { api } from "../api.js"
import { useAuth } from "../state/AuthContext.jsx"
import TaskForm from "../components/TaskForm.jsx"
import TaskItem from "../components/TaskItem.jsx"

export default function Tasks() {
  const { token } = useAuth()
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [editing, setEditing] = useState(null)
  const [submitting, setSubmitting] = useState(false)
  const [filter, setFilter] = useState("all")

  const filtered = useMemo(() => {
    if (filter === "completed") return tasks.filter((t) => t.completed)
    if (filter === "pending") return tasks.filter((t) => !t.completed)
    return tasks
  }, [tasks, filter])

  const load = async () => {
    setError("")
    setLoading(true)
    try {
      const res = await api.listTasks(token)
      setTasks(res)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const addTask = async (payload) => {
    setSubmitting(true)
    setError("")
    try {
      const t = await api.createTask(token, payload)
      setTasks((prev) => [t, ...prev])
    } catch (e) {
      setError(e.message)
    } finally {
      setSubmitting(false)
    }
  }

  const saveTask = async (payload) => {
    if (!editing) return
    setSubmitting(true)
    setError("")
    try {
      const updated = await api.updateTask(token, editing._id, payload)
      setTasks((prev) => prev.map((t) => (t._id === updated._id ? updated : t)))
      setEditing(null)
    } catch (e) {
      setError(e.message)
    } finally {
      setSubmitting(false)
    }
  }

  const toggleTask = async (task, value) => {
    try {
      const updated = await api.updateTask(token, task._id, { completed: value })
      setTasks((prev) => prev.map((t) => (t._id === updated._id ? updated : t)))
    } catch (e) {
      setError(e.message)
    }
  }

  const deleteTask = async (task) => {
    if (!confirm("Delete this task?")) return
    try {
      await api.deleteTask(token, task._id)
      setTasks((prev) => prev.filter((t) => t._id !== task._id))
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <div>
      <div className="row" style={{ justifyContent: "space-between", alignItems: "center" }}>
        <h2 style={{ margin: 0 }}>Your Tasks</h2>
        <select className="select" value={filter} onChange={(e) => setFilter(e.target.value)} style={{ maxWidth: 180 }}>
          <option value="all">All</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <div className="space"></div>
      {error ? (
        <div className="card" style={{ borderColor: "#a43a3a", color: "#ffb4b4" }}>
          {error}
        </div>
      ) : null}
      {loading ? <div className="card">Loading...</div> : null}

      {!loading && (
        <>
          <TaskForm onSubmit={editing ? saveTask : addTask} initial={editing} submitting={submitting} />
          <div className="space"></div>
          <div className="card">
            <div style={{ fontWeight: 700, marginBottom: 8 }}>Task List</div>
            <div className="space"></div>
            <div className="row" style={{ flexDirection: "column", gap: 12 }}>
              {filtered.length === 0 ? (
                <div className="small">No tasks yet.</div>
              ) : (
                filtered.map((t) => (
                  <TaskItem key={t._id} task={t} onToggle={toggleTask} onEdit={setEditing} onDelete={deleteTask} />
                ))
              )}
            </div>
          </div>
        </>
      )}
    </div>
  )
}
