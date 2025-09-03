const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

const signToken = (user) => {
  return jwt.sign(
    { id: user._id, email: user.email, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  )
}

// @desc Register new user
// @route POST /api/auth/register
exports.register = async (req, res, next) => {
  try {
    const { name = "", email = "", password = "" } = req.body
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Name, email and password are required" })
    }
    if (password.length < 6) {
      return res.status(400).json({ error: "Password must be at least 6 characters" })
    }

    const exists = await User.findOne({ email })
    if (exists) return res.status(409).json({ error: "Email already in use" })

    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(password, salt)

    const user = await User.create({ name, email, password: hashed })
    const token = signToken(user)

    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    })
  } catch (e) {
    next(e)
  }
}

// @desc Login user
// @route POST /api/auth/login
exports.login = async (req, res, next) => {
  try {
    const { email = "", password = "" } = req.body
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" })
    }

    const user = await User.findOne({ email })
    if (!user) return res.status(401).json({ error: "Invalid credentials" })

    const match = await bcrypt.compare(password, user.password)
    if (!match) return res.status(401).json({ error: "Invalid credentials" })

    const token = signToken(user)
    res.json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    })
  } catch (e) {
    next(e)
  }
}
