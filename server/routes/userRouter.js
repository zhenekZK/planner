const express = require("express");
const userController = require("../controllers/userController");
const { authenticate } = require("../middlewares/authenticate");
const userRouter = express.Router();

userRouter.post('/create', userController.signup);
userRouter.post('/login', userController.signin);
userRouter.get('/profile', authenticate, userController.profile);

module.exports = userRouter;
