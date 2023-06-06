const express = require("express");
const router = express.Router();

const LikeController = require('../controller/Likes')
const { validateToken } = require("../middlewares/AuthMiddlewares")

router.post("/", validateToken, LikeController.addLike)

module.exports = router; 