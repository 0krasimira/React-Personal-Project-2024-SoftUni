const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Define the directory path for uploads
const uploadsDir = path.join(__dirname, '../uploads/profile_photos');

// Ensure the directory exists
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Set up Multer storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadsDir);
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Preserve the file extension
    }
});

const upload = multer({ storage: storage });

module.exports = upload;
