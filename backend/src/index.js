const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const morgan = require("morgan")
const dotenv = require("dotenv")

dotenv.config()

const app = express()

// Middlewares
app.use(express.json())
app.use(morgan("dev"))
const origins = process.env.CLIENT_ORIGINS.split(",");

app.use(
  cors({
    origin: origins,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);


// Routes
const authRoutes = require("./routes/auth")
const taskRoutes = require("./routes/tasks")

app.get("/", (req, res) => {
  res.json({ ok: true, message: "Task Manager API" })
})

app.use("/api/auth", authRoutes)
app.use("/api/tasks", taskRoutes)

// Error handler
app.use((err, req, res, next) => {
  console.error("[API ERROR]", err)
  res.status(err.status || 500).json({ error: err.message || "Server error" })
})

// Start server after DB connect
const PORT = process.env.PORT || 5000
const start = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is missing in .env")
    }
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("MongoDB connected")

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`)
    })
  } catch (e) {
    console.error("Failed to start server:", e.message)
    process.exit(1)
  }
}

start()
