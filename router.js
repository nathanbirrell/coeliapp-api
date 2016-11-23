var requestHandlers = require("./requestHandlers");

function route(handle, pathname, response, request) {
  if (typeof handle[pathname] === 'function') {
    handle[pathname](response, request);
  } else {
    requestHandlers.serveHtml(request,response);
  }
}

exports.route = route;