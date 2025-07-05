const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// Register a new user
const registerUser = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: "Please fill all fields" });
  }
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please fill all fields" });
  }
  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({
        name: name,
        email: email,
        password: hashedPassword,
        role: role === "admin" ? "admin" : "member", // Default to members if not admin
      });
      await newUser.save();
      return res.status(201).json({ message: "User registered successfully" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Server error" });
  }
};

const userLogin = async (req, res) => {
  if (!req.body) {
    return res.status(400).json({ message: "Please fill all fields" });
  }
  const { email, password } = req.body;

  // Validate user
  const user = await User.findOne({ email });
  const isMatch = user && (await bcrypt.compare(password, user.password));
  if (!isMatch) return res.status(401).json({ error: "Invalid credentials" });

  const token = jwt.sign(
    { id: user.email, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );

  // Send HTTP-only cookie
  res.cookie("token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // send only over HTTPS in production
    sameSite: "Strict", // or 'Lax'
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });

  res.json({ message: "Logged in successfully" });
};
//get users

const getUser = async (req, res) => {
  const { email, name } = req.query;
  const filter = {};
  if (email) filter.email = email;
  if (name) filter.name = name;
  try {
    const user = await User.find(filter);

    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to find user" });
  }
};

module.exports = { registerUser, userLogin, getUser };
