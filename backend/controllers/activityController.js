const issuedBook = require("../models/issuedBooks");
const returnedBook = require("../models/returnedBooks");

const getActivity = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5; // fixed

    // fetch issued activities with user + book populated
    const issued = await issuedBook
      .find()
      .populate("user", "name") // only name
      .populate("bookid", "title") // only title
      .select("user bookid issuedDate createdAt")
      .lean();

    // fetch returned activities with user + book populated
    const returned = await returnedBook
      .find()
      .populate("user", "name")
      .populate("bookid", "title")
      .select("user bookid returnedDate createdAt")
      .lean();

    // normalize (extract only user.name + bookid.title)
    const allActivities = [
      ...issued.map((item) => ({
        type: "issued",
        userName: item.user?.name || "Unknown User",
        bookTitle: item.bookid?.title || "Unknown Book",
        date: item.issuedDate || item.createdAt,
        createdAt: item.createdAt,
      })),
      ...returned.map((item) => ({
        type: "returned",
        userName: item.user?.name || "Unknown User",
        bookTitle: item.bookid?.title || "Unknown Book",
        date: item.returnedDate || item.createdAt,
        createdAt: item.createdAt,
      })),
    ];

    // sort latest first
    allActivities.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // paginate
    const total = allActivities.length;
    const start = (page - 1) * limit;
    const paginated = allActivities.slice(start, start + limit);

    res.status(200).json({
      page,
      limit,
      totalPages: Math.ceil(total / limit),
      totalRecords: total,
      data: paginated,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  getActivity,
};
