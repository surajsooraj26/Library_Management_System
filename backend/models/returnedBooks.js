const mongoose = require("mongoose");

const returnedBookSchema = new mongoose.Schema({
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
  returnDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  dueDate: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("ReturnedBook", returnedBookSchema);
