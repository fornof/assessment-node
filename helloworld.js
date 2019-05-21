var http = require('http');
//create a server object:
    var message = 'Hello World! See this with HTTPS/TLS at https://geometricfigure.com/charter , call Robert if you get a 504 bad gateway, there have been power outages affecting site reliability lately.'
    console.log(message)
    http.createServer(function (req, res) {
    res.write(message); 
    res.end(); 
  }).listen(4444); 
  // 