'use strict';

var fs = require('fs');
var uid = require('uid');
var ocr = require('../helpers/ocr');

exports.file = function(req, res) {
    req.pipe(req.busboy);
    req.busboy.on('file', function(fieldname, file, filename) {

        var prefix = uid(6);

        var fstream = fs.createWriteStream('./images/' + prefix + '_' + filename); 
        file.pipe(fstream);
        fstream.on('close', function () {
            //TODO perform post upload actions.
            
            ocr.ocr('./images/' + prefix + '_' + filename,res);

        });
    });
};