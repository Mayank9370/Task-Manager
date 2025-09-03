const jwt = require("jsonwebtoken")

module.exports = function auth(req, res, next) {
  const header = req.headers.authorization || ""
  const [type, token] = header.split(" ")

  if (type !== "Bearer" || !token) {
    return res.status(401).json({ error: "Unauthorized" })
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET)
    req.user = { id: payload.id, email: payload.email, name: payload.name }
    return next()
  } catch (e) {
    return res.status(401).json({ error: "Invalid or expired token" })
  }
}
