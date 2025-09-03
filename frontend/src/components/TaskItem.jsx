"use client"

export default function TaskItem({ task, onToggle, onEdit, onDelete }) {
  return (
    <div className={`task ${task.completed ? "completed" : ""}`}>
      <input
        id={`task-${task._id}`}
        type="checkbox"
        checked={!!task.completed}
        onChange={(e) => onToggle(task, e.target.checked)}
        aria-label={`Mark ${task.title} as ${task.completed ? "pending" : "completed"}`}
      />
      <div style={{ flex: 1 }}>
        <label htmlFor={`task-${task._id}`} style={{ fontWeight: 600, display: "block" }}>
          {task.title}
        </label>
        {task.description ? (
          <div className="small" style={{ marginTop: 4 }}>
            {task.description}
          </div>
        ) : null}
        <div className="small" style={{ marginTop: 6 }}>
          Status: {task.completed ? "Completed" : "Pending"}
        </div>
      </div>
      <div className="row" style={{ alignItems: "center" }}>
        <button className="btn secondary" onClick={() => onEdit(task)}>
          Edit
        </button>
        <button className="btn danger" onClick={() => onDelete(task)}>
          Delete
        </button>
      </div>
    </div>
  )
}
