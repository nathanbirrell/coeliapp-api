var querystring = require("querystring"),
    fs = require("fs"),
    formidable = require("formidable"),
    ocr = require("./ocr");

function start(response) {
  console.log("Request handler 'start' was called.");

  var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" '+
    'content="text/html; charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data" '+
    'method="post">'+
    '<input type="file" name="upload" multiple="multiple">'+
    '<input type="submit" value="Upload file" />'+
    '</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function upload(response, request) {
  console.log("Request handler 'upload' was called.");
  var form = new formidable.IncomingForm();
  console.log("about to parse");
  form.parse(request, function(error, fields, files) {
    console.log("parsing done");


    var type = files.type;
    var tmpFile = "/tmp/test";
    if(type === "image/png"){
      tmpFile += ".png";
    }else{
      tmpFile += ".jpg";
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
    
    //ocr.ocr(tmpFile,response);
    //response.writeHead(200, {"Content-Type": "text/html"});
    //response.write("done");
    //response.end();

  });
}


function show(response) {
  console.log("Request handler 'show' was called.");
  response.writeHead(200, {"Content-Type": "image/png"});
  fs.createReadStream("/tmp/test.png").pipe(response);
}

exports.start = start;
exports.upload = upload;
exports.show = show;