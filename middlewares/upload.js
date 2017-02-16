'use strict';

var fs = require('fs'),
    uid = require('uid'),
    config = require('config'),
    ocr = require('../helpers/ocr');

exports.file = function (req, res) {
    req.pipe(req.busboy);
    req.busboy.on('file', function (fieldname, file, filename) {

        var prefix = uid(6);

        var imagesDir = config.get("app.images");

        var fstream = fs.createWriteStream(imagesDir + prefix + '_' + filename);
        file.pipe(fstream);
        fstream.on('close', function () {
            //TODO perform post upload actions.

            ocr.ocr(imagesDir + prefix + '_' + filename, res);

        });
    });
};