const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  bookid: {
    type: Number,
    required: true,
    unique: true,
  },
  title: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  publisher: {
    type: String,
  },
  language: {
    type: String,
    default: "English",
  },
  status: {
    type: String,
    enum: ["available", "checked out", "reserved"],
    default: "available",
  },
  location: {
    type: String, // e.g., shelf number or section
  },
  coverImage: {
    type: String, // URL or file path
    default: "",
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Book", bookSchema);
