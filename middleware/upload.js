const multer = require("multer");
const {GridFsStorage} = require('multer-gridfs-storage');
const keys = require('../config/keys')

const storage = new GridFsStorage({
    url: keys.mongoHR_Tool3,
    options: { useNewUrlParser: true, useUnifiedTopology: true },
    file: (req, file) => {
        
        const match = ["image/png", "image/jpg", "image/jpeg", "application/docx", "application/doc", "application/pdf"];

        if (match.indexOf(file.mimetype) === -1) {
            const filename = `${Date.now()}-any-name-${file.originalname}`;
            return filename;
        }

        return {
            bucketName: "photos",
            filename: `${Date.now()}-any-name-${file.originalname}`,
        };
    },
});

module.exports = multer({ storage });