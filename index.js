var server = require("./server");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var handle = {};
handle["/ocr"] = requestHandlers.performOcr;

server.start(router.route, handle);