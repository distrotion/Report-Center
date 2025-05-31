const express = require("express");
const router = express.Router();
var axios = require('./../../function/axios');
var mongodb = require('../../function/mongodb');
var mssql = require('../../function/mssql');
var request = require('request');
const { jsPDF } = require("jspdf");
const pdf2base64 = require('pdf-to-base64');
var fs = require('fs');

Number.prototype.pad = function (n) {
  if (n === undefined)
    n = 2;

  return (new Array(n).join('0') + this).slice(-n);
}



router.post('/goPDF', async (req, res) => {
  //-------------------------------------
  console.log("--goPDF--");
  let input = req.body;


  // console.log(input[`PIC`])
  let bitmap = ``

  if (input[`PIC`] != undefined, input[`PO`] != undefined) {
    let doc = new jsPDF("p", "mm", "a4", true);
    var width = doc.internal.pageSize.getWidth();
    var height = doc.internal.pageSize.getHeight();

    doc.addImage(`data:image/jpeg;base64,` + input[`PIC`], 'JPEG', 0, 0, width, height)

    doc.save(`${input[`PO`]}.pdf`)

    const d = new Date();
    // let day = d.getDate();
    let month = d.getMonth();
    let year = d.getFullYear();
    //
    console.log(month.pad(2))
    console.log(year.pad(4))


    //211,212 BP12PH
    //251,252 BP12KNG
    //331 ,332 HESISN
    //341 ,342 HESGAS 
    //311 ,312  HESPH

    //321 ,322  HESPAL
    //361 ,362  HESDEL
    //.substring(startIndex, endIndex)

    // var dir = `\\\\172.20.10.150\\sap_s4hana\\S4PRD\\HSORDERSHEET_PP\\${year.pad(4)}${(month+1).pad(2)}\\${input['PO']}`;

    let ORDER = `${input['PO']}`
    if (`${input['PO']}`.length >= 12) {
      ORDER = `${input['PO']}`.substring(2, 12)
    }


    var dir = ``;
    if (ORDER.length > 4) {
       if (ORDER.substring(0, 3) === '211' || ORDER.substring(0, 3) === '212') {
        dir = `\\\\172.20.10.150\\sap_s4hana\\S4PRD\\HSORDERSHEET_PP\\Output\\BP12PH\\${ORDER}`;
      }

      else if (ORDER.substring(0, 3) === '251' || ORDER.substring(0, 3) === '252') {
        dir = `\\\\172.20.10.150\\sap_s4hana\\S4PRD\\HSORDERSHEET_PP\\Output\\BP12KNG\\${ORDER}`;
      }

      else if (ORDER.substring(0, 3) === '331' || ORDER.substring(0, 3) === '332') {
        dir = `\\\\172.20.10.150\\sap_s4hana\\S4PRD\\HSORDERSHEET_PP\\Output\\HESISN\\${ORDER}`;
      }
      else if (ORDER.substring(0, 3) === '341' || ORDER.substring(0, 3) === '342') {
        dir = `\\\\172.20.10.150\\sap_s4hana\\S4PRD\\HSORDERSHEET_PP\\Output\\HESGAS\\${ORDER}`;
      }
      else if (ORDER.substring(0, 3) === '311' || ORDER.substring(0, 3) === '312') {
        dir = `\\\\172.20.10.150\\sap_s4hana\\S4PRD\\HSORDERSHEET_PP\\Output\\HESPH\\${ORDER}`;
      }

      else if (ORDER.substring(0, 3) === '321' || ORDER.substring(0, 3) === '322') {
        dir = `\\\\172.20.10.150\\sap_s4hana\\S4PRD\\HSORDERSHEET_PP\\Output\\HESPAL\\${ORDER}`;
      }

      else if (ORDER.substring(0, 3) === '361' || ORDER.substring(0, 3) === '362') {
        dir = `\\\\172.20.10.150\\sap_s4hana\\S4PRD\\HSORDERSHEET_PP\\Output\\HESDEL\\${ORDER}`;
      }

      else if (ORDER.substring(0, 3) === '251' || ORDER.substring(0, 3) === '252') {
        dir = `\\\\172.20.10.150\\sap_s4hana\\S4PRD\\HSORDERSHEET_PP\\Output\\BP12KNG\\${ORDER}`;
      }

      else {
        dir = `\\\\172.20.10.150\\sap_s4hana\\S4PRD\\HSORDERSHEET_PP\\Input\\${ORDER}`;
      }
    } else {
      dir = `\\\\172.20.10.150\\sap_s4hana\\S4PRD\\HSORDERSHEET_PP\\NOORDER\\${ORDER}`;
    }


    console.log(dir);

    //S4PRD\HSORDERSHEET_PP\Input
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }


    //save file แล้วผม read มาเป็น base64 ส่งกลับ

    await pdf2base64(`${input[`PO`]}.pdf`)
      .then(
        (response) => {
          // console.log(response); 
          fs.rmSync(`${input[`PO`]}.pdf`);
          bitmap = response;

        }
      )
      .catch(
        (error) => {
          fs.rmSync(`${input[`PO`]}.pdf`);
          // console.log(error); //Exepection error....

        }
      )

  }

  return res.json({ "PIC": bitmap });
});

router.post('/genfloder', async (req, res) => {
  //-------------------------------------
  console.log("--genfloder--");
  let input = req.body;


  // console.log(input[`PIC`])
  let bitmap = ``

  if (input[`PIC`] != undefined, input[`PO`] != undefined) {
    // let doc = new jsPDF("p", "mm", "a4", true);
    // var width = doc.internal.pageSize.getWidth();
    // var height = doc.internal.pageSize.getHeight();

    // doc.addImage(`data:image/jpeg;base64,` + input[`PIC`], 'JPEG', 0, 0, width, height)

    // doc.save(`${input[`PO`]}.pdf`)

    // const d = new Date();
    // // let day = d.getDate();
    // let month = d.getMonth();
    // let year = d.getFullYear();
    // //
    // console.log(month.pad(2))
    // console.log(year.pad(4))

    // var dir = `\\\\172.20.10.150\\sap_s4hana\\S4PRD\\HSORDERSHEET_PP\\${year.pad(4)}${(month+1).pad(2)}\\${input['PO']}`;
    // var dir = `\\\\172.20.10.150\\sap_s4hana\\S4PRD\\HSORDERSHEET_PP\\Input\\${input['PO']}`;
    let ORDER = `${input['PO']}`
    if (`${input['PO']}`.length >= 12) {
      ORDER = `${input['PO']}`.substring(2, 12)
    }

    var dir = ``;
    if (ORDER.length > 4) {
       if (ORDER.substring(0, 3) === '211' || ORDER.substring(0, 3) === '212') {
        dir = `\\\\172.20.10.150\\sap_s4hana\\S4PRD\\HSORDERSHEET_PP\\Output\\BP12PH\\${ORDER}`;
      }

      else if (ORDER.substring(0, 3) === '251' || ORDER.substring(0, 3) === '252') {
        dir = `\\\\172.20.10.150\\sap_s4hana\\S4PRD\\HSORDERSHEET_PP\\Output\\BP12KNG\\${ORDER}`;
      }

      else if (ORDER.substring(0, 3) === '331' || ORDER.substring(0, 3) === '332') {
        dir = `\\\\172.20.10.150\\sap_s4hana\\S4PRD\\HSORDERSHEET_PP\\Output\\HESISN\\${ORDER}`;
      }
      else if (ORDER.substring(0, 3) === '341' || ORDER.substring(0, 3) === '342') {
        dir = `\\\\172.20.10.150\\sap_s4hana\\S4PRD\\HSORDERSHEET_PP\\Output\\HESGAS\\${ORDER}`;
      }
      else if (ORDER.substring(0, 3) === '311' || ORDER.substring(0, 3) === '312') {
        dir = `\\\\172.20.10.150\\sap_s4hana\\S4PRD\\HSORDERSHEET_PP\\Output\\HESPH\\${ORDER}`;
      }

      else if (ORDER.substring(0, 3) === '321' || ORDER.substring(0, 3) === '322') {
        dir = `\\\\172.20.10.150\\sap_s4hana\\S4PRD\\HSORDERSHEET_PP\\Output\\HESPAL\\${ORDER}`;
      }

      else if (ORDER.substring(0, 3) === '361' || ORDER.substring(0, 3) === '362') {
        dir = `\\\\172.20.10.150\\sap_s4hana\\S4PRD\\HSORDERSHEET_PP\\Output\\HESDEL\\${ORDER}`;
      }

      else if (ORDER.substring(0, 3) === '251' || ORDER.substring(0, 3) === '252') {
        dir = `\\\\172.20.10.150\\sap_s4hana\\S4PRD\\HSORDERSHEET_PP\\Output\\BP12KNG\\${ORDER}`;
      }

      else {
        dir = `\\\\172.20.10.150\\sap_s4hana\\S4PRD\\HSORDERSHEET_PP\\Input\\${ORDER}`;
      }
    } else {
      dir = `\\\\172.20.10.150\\sap_s4hana\\S4PRD\\HSORDERSHEET_PP\\NOORDER\\${ORDER}`;
    }

    console.log(dir);

    //S4PRD\HSORDERSHEET_PP\Input
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }


    //save file แล้วผม read มาเป็น base64 ส่งกลับ

    // await pdf2base64(`${input[`PO`]}.pdf`)
    //   .then(
    //     (response) => {
    //       // console.log(response); 
    //       fs.rmSync(`${input[`PO`]}.pdf`);
    //       bitmap = response;

    //     }
    //   )
    //   .catch(
    //     (error) => {
    //       fs.rmSync(`${input[`PO`]}.pdf`);
    //       // console.log(error); //Exepection error....

    //     }
    //   )

  }

  return res.json({ "PIC": bitmap });
});

router.post('/goPDF_TESTSAP', async (req, res) => {
  //-------------------------------------
  console.log("--goPDF--");
  let input = req.body;


  // console.log(input[`PIC`])
  let bitmap = ``

  if (input[`PIC`] != undefined, input[`PO`] != undefined) {
    let doc = new jsPDF("p", "mm", "a4", true);
    var width = doc.internal.pageSize.getWidth();
    var height = doc.internal.pageSize.getHeight();

    doc.addImage(`data:image/jpeg;base64,` + input[`PIC`], 'JPEG', 0, 0, width, height)

    doc.save(`${input[`PO`]}.pdf`)

    const d = new Date();
    // let day = d.getDate();
    let month = d.getMonth();
    let year = d.getFullYear();
    console.log(month.pad(2))
    console.log(year.pad(4))

    var dir = `\\\\172.20.10.150\\sap_s4hana\\S4DEV\\HSORDERSHEET_PP\\input\\${input['PO']}`;
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }


    //save file แล้วผม read มาเป็น base64 ส่งกลับ

    await pdf2base64(`${input[`PO`]}.pdf`)
      .then(
        (response) => {
          // console.log(response); 
          fs.rmSync(`${input[`PO`]}.pdf`);
          bitmap = response;

        }
      )
      .catch(
        (error) => {
          fs.rmSync(`${input[`PO`]}.pdf`);
          // console.log(error); //Exepection error....

        }
      )

  }

  return res.json({ "PIC": bitmap });
});

router.post('/RAWDATA/sapget', async (req, res) => {
  //-------------------------------------
  console.log("--RAWDATA/sapget--");
  console.log(req.body);
  let input = req.body;
  //-------------------------------------
  let output = [];
  if (input[`ORDER`] !== undefined) {


    try {
      let resp = await axios.post('http://tp-portal.thaiparker.co.th/API_QcReport/ZBAPI_QC_INTERFACE', {
        "BAPI_NAME": "ZPPIN011_OUT",
        "IMP_TEXT02": input[`ORDER`],
        "TABLE_NAME": "PPORDER"
      });
      // if (resp.status == 200) {
      let returnDATA = resp;
      output = returnDATA["Records"] || []
      //  console.log(output)
      // }
    } catch (err) {
      output = [];
    }

  }


  //-------------------------------------
  return res.json(output);
});


router.post('/moveflodertoset', async (req, res) => {
  //-------------------------------------
  console.log("--moveflodertoset--");
  console.log(req.body);
  let input = req.body;
  //-------------------------------------
  let output = [];
 


  //-------------------------------------
  return res.json(output);
});

module.exports = router;




// exports.CreatePDF = async (dataReport) => {
//   try {
//     //Setup pdf page l = land , unit,size,expression
//     var doc = new jsPDF("l", "mm", "a3", true); // defualt unit mm.
//     var pageHeight = doc.internal.pageSize.height;
//     var pageWidth = doc.internal.pageSize.width;
//     //console.log(pageHeight, pageWidth);
//     var currentY = 0;
//     //set Font ถ้า set แล้วไม่เปลี่นจะเป็นแบบเดิมตลอด pdf
//     doc.setFont("THSarabun");
//     buffDoc = await HeaderSet(dataReport, doc);
//     doc = buffDoc[0];
//     currentY = buffDoc[1] - 4;

//     //คำสั่งขึ้นหน้าใหม่
//     doc.addPage("l", "mm", "a3", true);
//     currentY = 10;
//     //คำสั่ง save pdf ไฟล
//     await doc.save(
//       "C:\\AutomationProject\\SAR\\asset_ts\\Report\\KAC\\" +
//         dataReport[0].ReqNo +
//         ".pdf"
//     );

//     //save file แล้วผม read มาเป็น base64 ส่งกลับ
//     var bitmap = fs.readFileSync(
//       "C:\\AutomationProject\\SAR\\asset_ts\\Report\\KAC\\" +
//         dataReport[0].ReqNo +
//         ".pdf"
//     );

//     return bitmap.toString("base64");
//   } catch (err) {
//     console.log(err);
//     return err;
//   }
// };

// async function HeaderSet(dataReport, doc) {
//   try {
//     var currentY = 5;
//     console.log("HEADER MMTH4");
//     //Add Logo
//     var picHigh = 10;
//     var bitmap = fs.readFileSync("C:\\SAR\\asset\\TPK_LOGO.jpg");
//     doc.addImage(
//       bitmap.toString("base64"),
//       "JPEG",
//       (420 - 20) / 2,
//       currentY,
//       20,
//       picHigh,
//       undefined,
//       "SLOW"
//     );
//     currentY = currentY + picHigh;
//     //Add Customer Name
//     doc.autoTable({
//       startY: currentY + 2,
//       head: [
//         [
//           {
//             content: dataReport[0].CustFull,
//             //colSpan: 5,
//             styles: {
//               textColor: 0,
//               halign: "center",
//               valign: "middle",
//               fillColor: [3, 244, 252],
//               font: "THSarabun",
//               fontStyle: "bold",
//               fontSize: 18,
//               cellPadding: 0.5,
//               lineColor: 0,
//               lineWidth: 0.1,
//               cellWidth: 125,
//             },
//           },
//         ],
//       ],
//       margin: { left: (420 - 125) / 2 },
//       //body: body,
//       theme: "grid",
//     });
//     //text
//     currentY = doc.lastAutoTable.finalY + 4;
//     var fontSize = 10;
//     doc.setFont("THSarabun", "normal");
//     doc.setFontSize(fontSize);
//     var Text =
//       "We would like to report you about the conclusion of pretreatment line checking .The result is as below";
//     var widthText = doc.getTextWidth(Text);

//     doc.text(Text, (420 - widthText) / 2, currentY);

//     currentY = currentY + fontSize / 2.5;

//     doc.text("Sampling Date", 185, currentY);
//     doc.text(
//       dtConv.toDateOnlyMonthName(dataReport[0].SamplingDate),
//       215,
//       currentY
//     );

//     currentY = currentY + fontSize / 2.5;
//     doc.text("Report Making Date", 185, currentY);
//     doc.text(
//       dtConv.toDateOnlyMonthName(dataReport[0].CreateReportDate),
//       215,
//       currentY
//     );
//     currentY = currentY + fontSize / 2.5;
//     return [doc, currentY];
//   } catch (err) {
//     console.log(err);
//     return err;
//   }
// }



