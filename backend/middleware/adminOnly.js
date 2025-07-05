const adminOnly = (req, res, next) => {
  if (req.user?.role !== "admin") {
    return res
      .status(403)
      .json({ error: "Only admin can access this service" });
  }
  next();
};
module.exports = adminOnly;
