const express = require("express");
const router = express.Router();
const CommentController = require('../controller/Comments')
const { validateToken } = require("../middlewares/AuthMiddlewares")

router.get("/:postId", CommentController.getIdComment);
router.post("/", validateToken, CommentController.createIdComment);
router.delete("/:commentId", validateToken, CommentController.deleteComment)



module.exports = router;
