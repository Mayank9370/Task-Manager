const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
  {
    name: { type: String, trim: true, required: true, minlength: 2, maxlength: 100 },
    email: { type: String, trim: true, required: true, unique: true, lowercase: true },
    password: { type: String, required: true, minlength: 6 },
  },
  { timestamps: true },
)

module.exports = mongoose.model("User", userSchema)
