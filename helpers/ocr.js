var Tesseract = require('tesseract.js'),
  fs = require('fs');

function ocr(filename, response) {
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