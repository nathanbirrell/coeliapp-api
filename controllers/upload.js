'use strict';

var fs = require('fs');

exports.file = function(req, res) {
    req.pipe(req.busboy);
    req.busboy.on('file', function(fieldname, file, filename) {
        var fstream = fs.createWriteStream('./images/' + filename); 
        file.pipe(fstream);
        fstream.on('close', function () {
            res.redirect('back');
        });
    });
};