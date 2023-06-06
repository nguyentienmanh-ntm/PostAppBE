const express = require("express");
const router = express.Router();
const PostController = require('../controller/Posts')
const { validateToken } = require("../middlewares/AuthMiddlewares")


router.get("/", validateToken, PostController.getPosts);
router.post("/", validateToken, PostController.createPost);
router.get('/byId/:id', PostController.getById)

// all post cua user
router.get('/byUserId/:id', PostController.getByUserId)
router.delete("/:postId", validateToken, PostController.deletePost)
// edit posts
router.put("/title", validateToken, PostController.editPostTitle)
router.put("/postText", validateToken, PostController.editPostText)


module.exports = router; 