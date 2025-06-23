const express = require("express");
const router = express.Router();
router.use("/refresh", refreshController);

module.exports = router;
