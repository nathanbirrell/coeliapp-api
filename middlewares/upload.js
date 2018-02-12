'use strict';

var fs = require('fs');
var uid = require('uid');
var config = require('config');
var ocrp = require('../helpers/ocr-p');
var Scan = require('../helpers/Scan');

exports.file = function (req, res) {
    var prefix = uid(6);
    var imagesDir = config.get("app.images");
    var filePath;

    req.pipe(req.busboy);

    req.busboy.on('file', function (fieldname, file, filename) {
        filePath = imagesDir + prefix + '_' + filename;
        var fstream = fs.createWriteStream(filePath);
        file.pipe(fstream);
        fstream.on('close', handleFileUploaded);
    });

    function handleFileUploaded() {
        var ocrpromise = ocrp.run(filePath).then(
            function (rawText) {
                console.log('success');
                var result = JSON.stringify(new Scan(rawText));
                console.log(result);
                res.writeHead(200, { "Content-Type": "text/json" });
                res.write(result);
                res.end();
            },
            function (err) {
                var identifier = uid(6);
                console.error('error [' + identifier + ']: ' + err);
                res.writeHead(500, { "Content-Type": "text/html" });
                res.write("Server Error Encountered... Code: " + identifier);
                res.end();
            })
        .finally(function (r) {
            fs.unlink(filePath, function (derr) {
                if (derr) {
                    console.error('Error when attempting file cleanup: ' + derr);
                }
            });
        });
    }
};
