const express = require("express");
const router = express.Router();

//BP12_G_REPORT

router.use(require("./flow/001/INS_REPORT"))
router.use(require("./flow/001/GW_REPORT"))
router.use(require("./flow/001/HES_G_REPORT"))
router.use(require("./flow/001/BP12_G_REPORT"))
router.use(require("./flow/001/BP12_G_REPORTTEST"))
router.use(require("./flow/001/BP12_PH_REPORT"))
router.use(require("./flow/001/HES_PH_REPORT"))
router.use(require("./flow/001/PICPDF"))

router.use(require("./flow/testflow/testflow"))

module.exports = router;

