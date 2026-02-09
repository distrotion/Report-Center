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

  let DATA = [];
  let DATAIP = [];
  let PATTERNs = [];
  //-------------------------------------
  if (input['PO'] != undefined) {

    // find1 = await mongodb.find(masterDB_FN, TYPE, { "activeid": "active_id" });
    // find2 = await mongodb.find(masterDB_FN, ITEMs, { "activeid": "active_id" });
    // find3 = await mongodb.find(masterDB_FN, MACHINE, { "activeid": "active_id" });
    // find4 = await mongodb.find(masterDB_FN, RESULTFORMAT, {});
    // find5 = await mongodb.find(masterDB_FN, GRAPHTYPE, {});
    // find6 = await mongodb.find(masterDB_FN, INSTRUMENTS, {});
    // find7 = await mongodb.find(masterDB_FN, CALCULATE, { "activeid": "active_id" });
    // find8 = await mongodb.find(masterDB_FN, SPECIFICATION, { "activeid": "active_id" });
    // find9 = await mongodb.find(masterDB_FN, UNIT, { "activeid": "active_id" });
    // find10 = await mongodb.find(masterDB_FN, DESIMAL, { "activeid": "active_id" });


    // find11 = await mongodb.find(masterDB_IC, TYPE, { "activeid": "active_id" });
    // find12 = await mongodb.find(masterDB_IC, ITEMs, { "activeid": "active_id" });
    // find13 = await mongodb.find(masterDB_IC, MACHINE, { "activeid": "active_id" });
    // find14 = await mongodb.find(masterDB_IC, RESULTFORMAT, {});
    // find15 = await mongodb.find(masterDB_IC, GRAPHTYPE, {});
    // find16 = await mongodb.find(masterDB_IC, INSTRUMENTS, {});
    // find17 = await mongodb.find(masterDB_IC, CALCULATE, { "activeid": "active_id" });
    // find18 = await mongodb.find(masterDB_IC, SPECIFICATION, { "activeid": "active_id" });
    // find19 = await mongodb.find(masterDB_IC, UNIT, { "activeid": "active_id" });
    // find20 = await mongodb.find(masterDB_IC, DESIMAL, { "activeid": "active_id" });

    let getall = await mongodb.findallC(masterDB_FN, TYPE, {  });
        
            find1 = await getall[TYPE];
            find2 = await getall[ITEMs];
            find3 = await getall[MACHINE];
            find4 = await getall[RESULTFORMAT];
            find5 = await getall[GRAPHTYPE];
            find6 = await getall[INSTRUMENTS];
            find7 = await getall[CALCULATE];
            find8 = await getall[SPECIFICATION];
            find9 = await getall[UNIT];
            find10 = await getall[DESIMAL];
        
            let getall_IC = await mongodb.findallC(masterDB_IC, TYPE, {  });
        
            // find12 = await getall_IC[ITEMs];
            // find13 = await  getall_IC[MACHINE];
            // find18 = await  getall_IC[SPECIFICATION];
            find11 = await getall_IC[TYPE];
            find12 = await getall_IC[ITEMs];
            find13 = await getall_IC[MACHINE];
            find14 = await getall_IC[RESULTFORMAT];
            find15 = await getall_IC[GRAPHTYPE];
            find16 = await getall_IC[INSTRUMENTS];
            find17 = await getall_IC[CALCULATE];
            find18 = await getall_IC[SPECIFICATION];
            find19 = await getall_IC[UNIT];
            find20 = await getall_IC[DESIMAL];





    DATA = await mongodb.find("MAIN_DATA", "MAIN", { "PO": `${input['PO']}` });
    DATAIP = await mongodb.find("MAIN_INPROCESS", "MAIN", { "PO": `${input['PO']}` });
    if (DATA.length > 0) {
      PATTERNs = await mongodb.find(PATTERN, PATTERN_01, { "CP": `${DATA[0]['MATCP']}` });
    }
  }



  return res.json({
    "DATA": DATA,"DATAIP": DATAIP, "PATTERN": PATTERNs, "TYPE": find1, "ITEMS": find2, "METHOD": find3, "RESULTFORMAT": find4, "GRAPHTYPE": find5, "INSTRUMENTS": find6, "CALCULATE": find7, "SPECIFICATION": find8, "UNIT": find9, "DESIMAL": find10,
    "TYPE_IC": find11, "ITEMS_IC": find12, "METHOD_IC": find13, "RESULTFORMAT_IC": find14, "GRAPHTYPE_IC": find15, "INSTRUMENTS_IC": find16, "CALCULATE_IC": find17, "SPECIFICATION_IC": find18, "UNIT_IC": find19, "DESIMAL_IC": find20,
  });
});


router.post('/HESPAL_Report_by_ref', async (req, res) => {
  //-------------------------------------
  console.log("--HESPAL_Report_by_ref--");
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

router.post('/HESPAL_CALDATA', async (req, res) => {
  //-------------------------------------
  console.log("--HESPAL_CALDATA--");
  let input = req.body;
  let DATA = [];
  let CALDATA = [];

  //-------------------------------------
  if (input['PO'] != undefined) {



    CALDATA = await mongodb.find("BUFFERCAL", "SURBAL013", { "PO": `${input['PO']}` });


    return res.json({

      "DATAlist": CALDATA,
    });

  }else{
    return res.json({

      "DATAlist": CALDATA,
    });

  }




});

router.get('/FINALMASTER', async (req, res) => {
  return res.json("READY");
});




module.exports = router;
