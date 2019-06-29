
var libpath = require('path');
var http = require('http');
var fs = require('fs');
var url = require('url');
var bind_port = 8001;
var path = "/Volumes/Data/EigenScape/Segmented_Audio/audio/";

http.createServer(function (request, response) {
 var uri = url.parse(request.url).pathname;
 var filename = libpath.join(path, uri);

 libpath.exists(filename, function (exists) {
 if (!exists) {
   console.log('404 File Not Found: ' + filename);
   response.writeHead(404, {
     "Content-Type": "text/plain"
   });
   response.write("404 Not Found\n");
   response.end();
   return;
 } else{
   console.log('Starting download: ' + filename);
   var stream = fs.createReadStream(filename, { bufferSize: 64 * 1024 });
   stream.pipe(response);
  }
 });

}).listen(bind_port);
console.log('Download Server listening on Port' + bind_port);
