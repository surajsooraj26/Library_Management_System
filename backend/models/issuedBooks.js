const mongoose = require("mongoose");

const issuedBookSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  bookid: {
    type: Number,
    required: true,
  },
  issuedDate: {
    type: Date,
    required: true,
  },
  dueDate: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("IssuedBook", issuedBookSchema);
