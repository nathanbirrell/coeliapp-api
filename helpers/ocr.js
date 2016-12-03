var Tesseract = require('tesseract.js'),
  fs = require('fs'),
  config = require('config'),
  tessocr = require('ntesseract');


function ocr(filename, response) {
  var useTesseract = config.get('ocr.tesseract');

  if (useTesseract) {
    tesseractC(filename, response);
  } else {
    tesseractjs(filename, response);
  }

}

function tesseractC(filename, response) {
  tessocr.process(filename, function (err, text) {

    fs.unlink(filename, function (err) {
      if (err) {
        console.error('Error when attempting file cleanup: ' + err);
      }
    });

    if (err) {
      response.writeHead(500, { "Content-Type": "text/html" });
      response.write("Server Error: " + err);
      response.end();
    } else {
      response.writeHead(200, { "Content-Type": "text/html" });
      response.write(text);
      response.end();
    }
  });
}

function tesseractjs(filename, response) {
  Tesseract.recognize(filename)
    .progress(function (p) {
      //Status messages
    })
    .catch(function (err) {
      response.writeHead(500, { "Content-Type": "text/html" });
      response.write("Server Error: " + err);
      response.end();
    })
    .then(function (result) {
      response.writeHead(200, { "Content-Type": "text/html" });
      response.write(result.text);
      response.end();
    })
    .finally(function (r) {
      fs.unlink(filename, function (err) {
        if (err) {
          console.error('Error when attempting file cleanup: ' + err);
        }
      });
    })
}

exports.ocr = ocr;