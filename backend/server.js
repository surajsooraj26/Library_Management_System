const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const registerAdmin = require("./config/admin");
const cors = require("cors");
const cookieParser = require("cookie-parser");

dotenv.config();
// Connect to MongoDB
connectDB();
// Register admin user if not exists
registerAdmin();

const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL, // frontend URL
    credentials: true, // allow cookies
  })
);
app.use(express.json()); // for parsing application/json
app.use(cookieParser()); // for parsing cookies

// Routes
app.use("/user", require("./routes/userRoutes"));
// add more routes as needed
app.use("/books", require("./routes/bookRoutes"));

app.use("/activities", require("./routes/activityRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
