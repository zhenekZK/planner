const express = require("express");
const userController = require("../controllers/userController");
const {checkToken} = require("../middlewares/checkToken");
const userRouter = express.Router();

userRouter.post('/create', userController.signup);
userRouter.post('/login', userController.signin);
userRouter.get('/profile', checkToken, userController.profile);

module.exports = userRouter;
