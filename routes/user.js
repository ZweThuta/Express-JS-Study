const express = require("express");
const path = require("path");

const router = express.Router();
const postController = require("../controllers/posts")

router.get("/", postController.getPosts );
router.get("/post/:postId", postController.getPost)
// router.get("/post", (req, res) => {
//   res.sendFile(path.join(__dirname, "..", "views", "postpage.html"));
// });

module.exports = router;
