const upload = require("../middleware/upload");
const express = require("express");
const router = express.Router();
const passport = require('passport');
const authMiddleware = require('../middleware/auth');

router.post("/upload", authMiddleware, upload.single("file"), async (req, res) => {
    if (req.file === undefined) return res.send("you must select a file.");
    const imgUrl = `${process.env.API_URL}/api/file/${req.file.filename}`;
    return res.status(200).json({fileName: imgUrl});
});

router.post("/photo", authMiddleware, upload.single("file"), async (req, res) => {
    if (req.file === undefined) return res.send("you must select a file.");
    const imgUrl = `${process.env.API_URL}/api/file/${req.file.filename}`;
    return res.status(200).json({fileName: imgUrl});
});

module.exports = router;