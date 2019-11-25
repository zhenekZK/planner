const express = require("express");
const taskController = require("../controllers/taskController");
const taskRouter = express.Router();

taskRouter.get("/", taskController.getTasks);
taskRouter.post("/create", taskController.addTask);
taskRouter.post("/edit", taskController.editTask);
taskRouter.post("/delete", taskController.removeTask);

module.exports = taskRouter;
