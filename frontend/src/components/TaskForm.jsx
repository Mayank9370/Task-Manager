"use client"

import { useEffect, useState } from "react"

export default function TaskForm({ onSubmit, initial, submitting }) {
  const [title, setTitle] = useState(initial?.title || "")
  const [description, setDescription] = useState(initial?.description || "")

  useEffect(() => {
    setTitle(initial?.title || "")
    setDescription(initial?.description || "")
  }, [initial])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!title.trim()) return
    onSubmit({ title: title.trim(), description: description.trim() })
  }

  return (
    <form onSubmit={handleSubmit} className="card" aria-label="Task form">
      <div style={{ fontWeight: 700, marginBottom: 8 }}>{initial ? "Edit Task" : "New Task"}</div>
      <div className="space"></div>
      <input
        className="input"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        aria-label="Task title"
        required
        minLength={1}
      />
      <div className="space"></div>
      <textarea
        className="textarea"
        placeholder="Description (optional)"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={3}
        aria-label="Task description"
      />
      <div className="space"></div>
      <div className="row" style={{ justifyContent: "flex-end" }}>
        <button className="btn" disabled={submitting}>
          {submitting ? "Saving..." : initial ? "Save Changes" : "Add Task"}
        </button>
      </div>
    </form>
  )
}
