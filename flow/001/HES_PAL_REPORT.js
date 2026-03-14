const express = require("express");
const router = express.Router();
var mongodb = require('../../function/HESPALmongodb');
var mssql = require('../../function/mssql');
var request = require('request');

let masterDB_FN = "master_FN";
let masterDB_IC = "master_IC";
let PATTERN = "PATTERN";
//
let GRAPH_TABLE = "GRAPH_TABLE";
let TYPE = "TYPE";
let UNIT = "UNIT";
let ITEMs = "ITEMs";
let MACHINE = "MACHINE";
let METHOD = "METHOD";
let INSTRUMENTS = "INSTRUMENTS";
let RESULTFORMAT = "RESULTFORMAT";
let SPECIFICATION = "SPECIFICATION";
let DESIMAL = "DESIMAL";
let TOLERANCE = "TOLERANCE";
let GRAPHTYPE = "GRAPHTYPE";
let CALCULATE = "CALCULATE";
let LOAD = "LOAD";
let CORETYPE = "CORETYPE";
let FREQUENCY = "FREQUENCY";
let PATTERN_01 = "PATTERN_01";


router.get('/FINALMASTER', async (req, res) => {
  return res.json("READY");
});

router.post('/HESPAL_Report_PDF', async (req, res) => {
  //-------------------------------------
  console.log("--HESPAL_Report_PDF--");
  let input = req.body;
  let find1 = [];
  let find2 = [];
  let find3 = [];
  let find4 = [];
  let find5 = [];
  let find6 = [];
  let find7 = [];
  let find8 = [];
  let find9 = [];
  let find10 = [];

  let find11 = [];
  let find12 = [];
  let find13 = [];
  let find14 = [];
  let find15 = [];
  let find16 = [];
  let find17 = [];
  let find18 = [];
  let find19 = [];
  let find20 = [];

  let DATA = [];
  let DATAIP = [];
  let PATTERNs = [];
  //-------------------------------------
  try {
    if (input['PO'] != undefined) {

      let getall, getall_IC;
      [getall, getall_IC, DATA, DATAIP] = await Promise.all([
        mongodb.findallC(masterDB_FN),
        mongodb.findallC(masterDB_IC),
        mongodb.find("MAIN_DATA", "MAIN", { "PO": `${input['PO']}` }),
        mongodb.find("MAIN_INPROCESS", "MAIN", { "PO": `${input['PO']}` })
      ]);

      find1 = getall[TYPE];
      find2 = getall[ITEMs];
      find3 = getall[MACHINE];
      find4 = getall[RESULTFORMAT];
      find5 = getall[GRAPHTYPE];
      find6 = getall[INSTRUMENTS];
      find7 = getall[CALCULATE];
      find8 = getall[SPECIFICATION];
      find9 = getall[UNIT];
      find10 = getall[DESIMAL];

      find11 = getall_IC[TYPE];
      find12 = getall_IC[ITEMs];
      find13 = getall_IC[MACHINE];
      find14 = getall_IC[RESULTFORMAT];
      find15 = getall_IC[GRAPHTYPE];
      find16 = getall_IC[INSTRUMENTS];
      find17 = getall_IC[CALCULATE];
      find18 = getall_IC[SPECIFICATION];
      find19 = getall_IC[UNIT];
      find20 = getall_IC[DESIMAL];

      if (DATA.length > 0) {
        PATTERNs = await mongodb.find(PATTERN, PATTERN_01, { "CP": `${DATA[0]['MATCP']}` });
      }
    }
  } catch (error) {
    console.error("HESPAL_Report_PDF error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }

  return res.json({
    "DATA": DATA, "DATAIP": DATAIP, "PATTERN": PATTERNs, "TYPE": find1, "ITEMS": find2, "METHOD": find3, "RESULTFORMAT": find4, "GRAPHTYPE": find5, "INSTRUMENTS": find6, "CALCULATE": find7, "SPECIFICATION": find8, "UNIT": find9, "DESIMAL": find10,
    "TYPE_IC": find11, "ITEMS_IC": find12, "METHOD_IC": find13, "RESULTFORMAT_IC": find14, "GRAPHTYPE_IC": find15, "INSTRUMENTS_IC": find16, "CALCULATE_IC": find17, "SPECIFICATION_IC": find18, "UNIT_IC": find19, "DESIMAL_IC": find20,
  });
});


router.post('/HESPAL_Report_by_ref', async (req, res) => {
  //-------------------------------------
  console.log("--HESPAL_Report_by_ref--");
  let input = req.body;
  let DATA = [];
  let DATAlist = [];

  //-------------------------------------
  try {
    if (input['PO'] != undefined) {
      [DATAlist, DATA] = await Promise.all([
        mongodb.find("MAIN_DATA", "MAIN", { "ReferFrom": `${input['PO']}` }),
        mongodb.find("MAIN_DATA", "MAIN", { "PO": `${input['PO']}` })
      ]);
    }
  } catch (error) {
    console.error("HESPAL_Report_by_ref error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }

  return res.json({
    "DATA": DATA,
    "DATAlist": DATAlist,
  });
});

router.post('/HESPAL_CALDATA', async (req, res) => {
  //-------------------------------------
  console.log("--HESPAL_CALDATA--");
  let input = req.body;
  let CALDATA = [];

  //-------------------------------------
  try {
    if (input['PO'] != undefined) {
      CALDATA = await mongodb.find("BUFFERCAL", "SURBAL013", { "PO": `${input['PO']}` });
    }
  } catch (error) {
    console.error("HESPAL_CALDATA error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }

  return res.json({ "DATAlist": CALDATA });
});




module.exports = router;
