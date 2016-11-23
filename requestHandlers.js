var querystring = require("querystring"),
    fs = require("fs"),
    path = require('path'),
    formidable = require("formidable"),
    ocr = require("./ocr"),
    logger = require("./logger");

/*
* Function to provide general webserver functionality.
* Source: http://ericsowell.com/blog/2011/5/6/serving-static-files-from-node-js
*/
function serveHtml(request, response){
  var filePath = '.' + request.url;
  if (filePath == './')
    filePath = './index.html';
    
  var extname = path.extname(filePath);
  var contentType = 'text/html';
  switch (extname) {
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
  }

  fs.exists(filePath, function(exists) {
  
    if (exists) {
      fs.readFile(filePath, function(error, content) {
        if (error) {
          logger.logAccess(request,500);
          response.writeHead(500);
          response.end();
        }
        else {
          logger.logAccess(request,200);
          response.writeHead(200, { 'Content-Type': contentType });
          response.end(content, 'utf-8');
        }
      });
    }
    else {
      logger.logAccess(request,404);
      response.writeHead(404);
      response.end();
    }
  });
}

function performOcr(response, request) {
  var form = new formidable.IncomingForm();
  form.parse(request, function(error, fields, files) {

    var type = files.type;
    var tmpFile = "/tmp/test";
    if(type === "image/png"){
      tmpFile += ".png";
    }else if(type === "image/jpeg"){
      tmpFile += ".jpg";
    }else{
      logger.log("Error when Attempting OCR (Unsupported Image Type)");
      response.writeHead(500, {"Content-Type": "text/html"});
      response.write("Server Error: Unsupported Image Type");
      response.end();
      return;
    }


    /* Possible error on Windows systems:
       tried to rename to an already existing file */
    fs.rename(files.upload.path, tmpFile, function(err) {
      if (err) {
        fs.unlink(tmpFile,function(err){
          if(err){
            throw err;
          }else{
            fs.rename(files.upload.path, tmpFile, function(err){
              if(err){
                throw err;
              }else{
                ocr.ocr(tmpFile,response);
              }
            });
          }
        });
        
      }else{
        ocr.ocr(tmpFile,response);
      }
    });
  });
}

exports.performOcr = performOcr;
exports.serveHtml = serveHtml;