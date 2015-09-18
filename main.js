var express = require('express');
var app = express();
var http = require('http').Server(app);
var port = (process.env.PORT || 7878);//this is needed for heroku


app.use(express.static(__dirname + "/"));

http.listen(port, function(){
    console.log('listening on: ' + port);
});