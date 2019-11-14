const express = require("express");
const listController = require("../controllers/listController");
const listRouter = express.Router();
const { checkToken } = require('../middlewares/checkToken');

listRouter.post("/create", checkToken, listController.addList);
listRouter.get("/", checkToken, listController.getLists);

module.exports = listRouter;
