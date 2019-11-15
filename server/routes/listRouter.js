const express = require("express");
const listController = require("../controllers/listController");
const listRouter = express.Router();
const { authenticate } = require('../middlewares/authenticate');

listRouter.post("/create", authenticate, listController.addList);
listRouter.post("/delete", authenticate, listController.removeList);
listRouter.get("/", authenticate, listController.getLists);

module.exports = listRouter;
