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
    default: Date.now,
  },
  dueDate: {
    type: Date,
    default: function () {
      const date = new Date();
      date.setDate(date.getDate() + 15); // Default due date is 14 days from the issue date
      return date;
    },
    required: true,
  },
});

module.exports = mongoose.model("IssuedBook", issuedBookSchema);
