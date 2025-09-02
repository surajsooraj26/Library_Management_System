const multer = require("multer");
const path = require("path");

// store files locally before uploading to Cloudinary
const storage = multer.diskStorage({
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // unique file name
  },
});

const upload = multer({ storage });

module.exports = upload;
