const upload = require("../middleware/upload");
const express = require("express");
const router = express.Router();

router.post("/upload", upload.single("file"), async (req, res) => {
    // console.log(upload.single("file"),333310101010101)
    // console.log(req.file,4848484848)
    if (req.file === undefined) return res.send("you must select a file.");
    const imgUrl = `http://localhost:3000/file/${req.file.filename}`;
    return res.json({fileName: imgUrl});
});

module.exports = router;