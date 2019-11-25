const express = require("express");
const listController = require("../controllers/listController");
const listRouter = express.Router();

listRouter.post("/create", listController.addList);
listRouter.post("/delete", listController.removeList);
listRouter.get("/", listController.getLists);

module.exports = listRouter;
