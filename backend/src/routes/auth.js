const express = require("express")
const { register, login } = require("../controllers/authController")

const router = express.Router()

router.post("/register", register) // to register a new user
router.post("/login", login) // to login an existing user

module.exports = router
