const express = require("express");
const router = express.Router();
var mongodb = require('../../function/BP12GASmongodb');
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
let DESIMAL = "DESIMAL";
let TOLERANCE = "TOLERANCE";
let GRAPHTYPE = "GRAPHTYPE";
let CALCULATE = "CALCULATE";
let LOAD = "LOAD";
let CORETYPE = "CORETYPE";
let FREQUENCY = "FREQUENCY";
let PATTERN_01 = "PATTERN_01";



router.get('/FINALMASTER2', async (req, res) => {
  return res.json(`00123456789x`.substring(2, 12));
});

router.get('/FINALMASTER3', async (req, res) => {
  return res.json(`00123456789x`.length);
});

router.post('/BP12G_Report_PDF', async (req, res) => {
  //-------------------------------------
  console.log("--BP12G_Report_PDF--");
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
  let find10= [];

  let DATA = [];
  let PATTERNs = [];
  //-------------------------------------
  if (input['PO'] != undefined) {

    find1 = await mongodb.find(masterDB, TYPE, { "activeid": "active_id" });
    find2 = await mongodb.find(masterDB, ITEMs, { "activeid": "active_id" });
    find3 = await mongodb.find(masterDB, MACHINE, { "activeid": "active_id" });
    find4 = await mongodb.find(masterDB, RESULTFORMAT, {});
    find5 = await mongodb.find(masterDB, GRAPHTYPE, {});
    find6 = await mongodb.find(masterDB, INSTRUMENTS, {});
    find7 = await mongodb.find(masterDB, CALCULATE, { "activeid": "active_id" });
    find8 = await mongodb.find(masterDB, SPECIFICATION, { "activeid": "active_id" });
    find9 = await mongodb.find(masterDB, UNIT, { "activeid": "active_id" });
    find10 = await mongodb.find(masterDB, DESIMAL, { "activeid": "active_id" });


    DATA = await mongodb.find("MAIN_DATA", "MAIN", { "PO": `${input['PO']}` });
    if (DATA.length > 0) {
      PATTERNs = await mongodb.find(PATTERN, PATTERN_01, { "CP": `${DATA[0]['MATCP']}` });
    }
  }



  return res.json({ "DATA": DATA, "PATTERN": PATTERNs, "TYPE": find1, "ITEMS": find2, "METHOD": find3, "RESULTFORMAT": find4, "GRAPHTYPE": find5, "INSTRUMENTS": find6, "CALCULATE": find7 , "SPECIFICATION": find8 , "UNIT": find9, "DESIMAL": find10 });
});

router.get('/FINALMASTER', async (req, res) => {
  return res.json("READY");
});

router.post('/BP12GAS_Report_by_ref', async (req, res) => {
  //-------------------------------------
  console.log("--BP12GAS_Report_by_ref--");
  let input = req.body;
  let DATA = [];
  let DATAmaster = [];

  //-------------------------------------
  if (input['PO'] != undefined) {
    DATAlist = await mongodb.find("MAIN_DATA", "MAIN", { "ReferFrom": `${input['PO']}` });
    DATA = await mongodb.find("MAIN_DATA", "MAIN", { "PO": `${input['PO']}` });

    return res.json({
      "DATA": DATA,
      "DATAlist": DATAlist,
    });
  }
});



module.exports = router;
