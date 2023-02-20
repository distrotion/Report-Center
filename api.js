const express = require("express");
const router = express.Router();

router.use(require("./flow/001/INS_REPORT"))
router.use(require("./flow/testflow/testflow"))

module.exports = router;

