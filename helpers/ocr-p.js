var fs = require('fs');
var config = require('config');
var tesseract = require('ntesseract');
var Q = require("q");

function run(filename) {
  return new Q.Promise(function (resolve, reject) {
    tesseract.process(filename, function (err, text) {
      if (err) {
        reject(err);
      } else {
        resolve(text);
      }
    });
  });
}

exports.run = run;