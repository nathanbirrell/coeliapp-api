var Tesseract = require('tesseract.js'),
  fs = require('fs'),
  config = require('config'),
  tessocr = require('ntesseract'),
  Q = require("q");



function run(filename) {
  var useTesseract = config.get('tesseract-ocr.enabled');

  if (useTesseract) {

    return new Q.Promise(function (resolve) {
      resolve(tesseractCA(filename));
    });

  } else {
    return tesseractjs(filename);
  }

}

function tesseractjs(filename) {
  var deferred = Q.defer();
  Tesseract.recognize(filename)
    .progress(function (p) {
      //Status messages
    })
    .catch(function (err) {
      deferred.reject(err);
    })
    .then(function (result) {
      deferred.resolve(result.text);
    });

  return deferred.promise;

}

function tesseractCA(filename) {

  var deferred = Q.defer();

  tessocr.process(filename, function (err, text) {
    if (err) {
      throw err;
    } else {
      return text;
    }
  });
}










exports.run = run;