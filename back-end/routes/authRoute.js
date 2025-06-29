const express = require("express");
const router = express.Router();
const refreshController = require("../Controller/refreshController");
router.use("/refresh", refreshController.refreshController);

module.exports = router;
