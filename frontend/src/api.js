const API_BASE = import.meta.env.VITE_API_BASE;

export const api = {
  async request(path, { method = "GET", body, token } = {}) {
    const res = await fetch(`${API_BASE}${path}`, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    })
    const data = await res.json().catch(() => ({}))
    if (!res.ok) {
      throw new Error(data?.error || `Request failed: ${res.status}`)
    }
    return data
  },
  register(payload) {
    return this.request("/api/auth/register", { method: "POST", body: payload })
  },
  login(payload) {
    return this.request("/api/auth/login", { method: "POST", body: payload })
  },
  listTasks(token) {
    return this.request("/api/tasks", { token })
  },
  createTask(token, payload) {
    return this.request("/api/tasks", { method: "POST", token, body: payload })
  },
  updateTask(token, id, payload) {
    return this.request(`/api/tasks/${id}`, { method: "PUT", token, body: payload })
  },
  deleteTask(token, id) {
    return this.request(`/api/tasks/${id}`, { method: "DELETE", token })
  },
}
