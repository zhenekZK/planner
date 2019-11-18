const express = require("express");
const taskController = require("../controllers/taskController");
const taskRouter = express.Router();
const { authenticate } = require('../middlewares/authenticate');

taskRouter.get("/", authenticate, taskController.getTasks);
taskRouter.post("/add", authenticate, taskController.addTask);
taskRouter.post("/edit", authenticate, taskController.editTask);
taskRouter.post("/delete", authenticate, taskController.removeTask);

module.exports = taskRouter;
