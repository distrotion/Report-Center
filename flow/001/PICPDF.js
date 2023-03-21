const express = require("express");
const router = express.Router();
var mongodb = require('../../function/mongodb');
var mssql = require('../../function/mssql');
var request = require('request');
const { jsPDF } = require("jspdf");
const pdf2base64 = require('pdf-to-base64');
var fs = require('fs');





router.post('/goPDF', async (req, res) => {
  //-------------------------------------
  console.log("--goPDF--");
  let input = req.body;
 

  // console.log(input[`PIC`])
  let bitmap = ``

  if (input[`PIC`] != undefined,input[`PO`] != undefined) {
    let doc = new jsPDF("p", "mm", "a4",true);
    var width = doc.internal.pageSize.getWidth();
    var height = doc.internal.pageSize.getHeight();

    doc.addImage(`data:image/jpeg;base64,` + input[`PIC`], 'JPEG', 0, 0, width, height)

    doc.save(`${input[`PO`]}.pdf`)
  

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

