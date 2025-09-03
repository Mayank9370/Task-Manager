const Task = require("../models/Task")

// @desc Get all tasks for logged-in user
// @route GET /api/tasks
// @access Private
exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).sort({ createdAt: -1 })
    res.json(tasks)
  } catch (e) {
    next(e)
  }
}

// @desc Create new task
// @route POST /api/tasks
// @access Private
exports.createTask = async (req, res, next) => {
  try {
    const { title = "", description = "" } = req.body
    if (!title) return res.status(400).json({ error: "Title is required" })

    const task = await Task.create({
      title,
      description,
      user: req.user.id,
    })
    res.status(201).json(task)
  } catch (e) {
    next(e)
  }
}

// @desc Update task
// @route PUT /api/tasks/:id
// @access Private
exports.updateTask = async (req, res, next) => {
  try {
    const { title, description, completed } = req.body
    const task = await Task.findOne({ _id: req.params.id, user: req.user.id })
    if (!task) return res.status(404).json({ error: "Task not found" })

    if (typeof title !== "undefined") task.title = title
    if (typeof description !== "undefined") task.description = description
    if (typeof completed !== "undefined") task.completed = !!completed

    await task.save()
    res.json(task)
  } catch (e) {
    next(e)
  }
}

// @desc Delete task
// @route DELETE /api/tasks/:id
// @access Private
exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user.id })
    if (!task) return res.status(404).json({ error: "Task not found" })
    res.json({ ok: true })
  } catch (e) {
    next(e)
  }
}
