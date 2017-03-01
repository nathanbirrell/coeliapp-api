'use strict';

var fs = require('fs'),
    uid = require('uid'),
    config = require('config'),
    ocrp = require('../helpers/ocr-p');

exports.file = function (req, res) {
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {

        var prefix = uid(6);

        var imagesDir = config.get("app.images");

        var filePath = imagesDir + prefix + '_' + filename;

        var fstream = fs.createWriteStream(filePath);
        file.pipe(fstream);
        fstream.on('close', function () {

            var ocrpromise = ocrp.run(filePath).then(
                function (result) {
                    res.writeHead(200, { "Content-Type": "text/html" });
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

        });
    });
};
