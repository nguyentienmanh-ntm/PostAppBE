const express = require("express");
const router = express.Router();
// const { Posts } = require("../models");
const UserController = require('../controller/Users')
const { validateToken } = require("../middlewares/AuthMiddlewares")

router.post("/", UserController.createUser);
router.post("/login", UserController.loginInfo);
router.get("/auth", validateToken, UserController.authUser);
router.get("/basicinfo/:id", UserController.basicInfo);



module.exports = router;