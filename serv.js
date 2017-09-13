var http = require("./node_modules/http-server/lib/http-server.js");

var server = http.createServer(function(req,res){
    res.writehead(200);
    
    res.end("yop");
})
server.listen(8080);