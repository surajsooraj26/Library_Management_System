const User = require("../models/user");
const bcrypt = require("bcryptjs");

const registerAdmin = async () => {
  try {
    const userCount = await User.countDocuments();
    if (userCount == 0) {
      const admin = {
        name: "Admin",
        email: "admin@gmail.com",
        password: "admin",
      };
      const hashedPassword = await bcrypt.hash(admin.password, 10);
      const newAdmin = new User({
        name: admin.name,
        email: admin.email,
        password: hashedPassword,
        role: "admin",
      });
      await newAdmin.save();
      console.log("Admin registered successfully");
    }
  } catch (error) {
    console.error("Error registering admin:", error);
  }
};

module.exports = registerAdmin;
