const upload = require("../middleware/upload");
const express = require("express");
const router = express.Router();

router.post("/upload", upload.single("file"), async (req, res) => {
    console.log(777, res)
    if (req.file === undefined) return res.send("you must select a file.");
    const imgUrl = `http://localhost:3000/file/${req.file.filename}`;
    return res.status(200).json({fileName: imgUrl});
});

module.exports = router;