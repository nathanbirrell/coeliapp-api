var Tesseract = require('tesseract.js'),
  fs = require('fs'),
  logger = require("./logger");

function ocr(filename, response){
Tesseract.recognize(filename)
  .progress(function  (p) { 
      //Status messages
  })
  .catch(function(err){
    logger.log("Error when Attempting OCR");
    response.writeHead(500, {"Content-Type": "text/html"});
    response.write("Server Error: " + err);
    response.end();
  })
  .then(function (result) {
    logger.log("Performed OCR");
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(result.text);
    response.end();
  })
  .finally(function (r){
    //Any finishing tasks... file cleanup perhaps?
  })
}

exports.ocr = ocr;