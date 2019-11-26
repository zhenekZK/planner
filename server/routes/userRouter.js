const express = require("express");
const userController = require("../controllers/userController");
const passport = require('passport');
const userRouter = express.Router();

userRouter.post('/register', userController.register);
userRouter.post('/login', userController.login);
userRouter.get('/profile', passport.authenticate('jwt', { session: false }), userController.profile);
userRouter.get('/', passport.authenticate('jwt', { session: false }), userController.getAllUsers);

module.exports = userRouter;
