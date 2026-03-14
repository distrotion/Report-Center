const express = require("express");
const router = express.Router();
var mongodb = require('../../function/mongodb');
var mssql = require('../../function/mssql');
var request = require('request');

let masterDB = "master_FN";
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

router.post('/INS_Report_PDF', async (req, res) => {
  //-------------------------------------
  console.log("--INS_Report_PDF--");
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

  let DATA = [];
  let PATTERNs = [];
  //-------------------------------------
  try {
    if (input['PO'] != undefined) {

      let getall;
      [getall, DATA] = await Promise.all([
        mongodb.findallC(masterDB),
        mongodb.find("MAIN_DATA", "MAIN", { "PO": `${input['PO']}` })
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

      if (DATA.length > 0) {
        PATTERNs = await mongodb.find(PATTERN, PATTERN_01, { "CP": `${DATA[0]['MATCP']}` });
      }
    }
  } catch (error) {
    console.error("INS_Report_PDF error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }

  return res.json({ "DATA": DATA, "PATTERN": PATTERNs, "TYPE": find1, "ITEMS": find2, "METHOD": find3, "RESULTFORMAT": find4, "GRAPHTYPE": find5, "INSTRUMENTS": find6, "CALCULATE": find7, "SPECIFICATION": find8, "UNIT": find9 });
});

router.post('/INS_REMASK', async (req, res) => {
  //-------------------------------------
  console.log("--INS_REMASK--");
  let input = req.body;
  let output = 'NOK';

  try {
    if (input['PO'] != undefined && input['REMARK'] != undefined) {
      await mongodb.update("MAIN_DATA", "MAIN", { "PO": input['PO'] }, { $set: { "REMARK": input['REMARK'] } });
      output = 'OK';
    }
  } catch (error) {
    console.error("INS_REMASK error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }

  return res.json({ "STATUS": output });
});

router.post('/INS_Report_by_ref', async (req, res) => {
  //-------------------------------------
  console.log("--INS_Report_by_ref--");
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
    console.error("INS_Report_by_ref error:", error);
    return res.status(500).json({ error: "Internal server error" });
  }

  return res.json({
    "DATA": DATA,
    "DATAlist": DATAlist,
  });
});



module.exports = router;
