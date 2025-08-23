const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  dob: { type: Date },
  address: { type: String },
  phone: { type: String },
  profilePicture: { type: String, default: "" },
  blood: { type: String },
  password: { type: String, required: true },
  role: { type: String, enum: ["member", "admin"], default: "member" },
});

module.exports = mongoose.model("User", userSchema);
