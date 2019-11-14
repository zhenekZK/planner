const express = require("express");
const taskController = require("../controllers/taskController");
const taskRouter = express.Router();
const { authenticate } = require('../middlewares/authenticate');

// taskRouter.post("/create", authenticate, taskController.addList);
taskRouter.get("/", authenticate, taskController.getTasks);

module.exports = taskRouter;