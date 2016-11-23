function logAccess(request, responseCode){
	var date = new Date();

  	var dateStr = (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear();
  	var timeStr = date.getHours() + ":" + date.getMinutes() + ":"  + date.getSeconds() + "." + date.getMilliseconds();

  	console.log(dateStr + " " + timeStr + " " + request.url + " [" + responseCode + "]");

}

function log(message){
	var date = new Date();

	var dateStr = (date.getMonth()+1) + "/" + date.getDate() + "/" + date.getFullYear();
  	var timeStr = date.getHours() + ":" + date.getMinutes() + ":"  + date.getSeconds() + "." + date.getMilliseconds();

  	console.log(dateStr + " " + timeStr + " " + message);
}

exports.log = log;
exports.logAccess = logAccess;