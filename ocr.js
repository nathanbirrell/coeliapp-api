var Tesseract = require('tesseract.js'),
  fs = require('fs');

function ocr(filename, response){
console.log('Starting OCR',Date.now());
Tesseract.recognize(filename)
  .progress(function  (p) { 
  		var percent = p.progress * 100;
  		if(p.status === 'recognizing text' && (percent % 10) === 0){
  			console.log('progress', percent + '%');
  		}
  })
  .catch(function(err){
    response.writeHead(500, {"Content-Type": "text/html"});
    response.write("Server Error: " + err);
    response.end();
  })
  .then(function (result) {
    response.writeHead(200, {"Content-Type": "text/html"});
    var str = result.text.replace(/(?:\r\n|\r|\n)/g, '<br />');
    response.write(str);
    response.end();
  })
  .finally(function (r){
  	console.log('finished ocr: ', Date.now());
  })
}

exports.ocr = ocr;