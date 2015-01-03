var express = require('express');
var app = express();
var http = require('http').Server(app);
var ejs = require('ejs');
var io = require('socket.io');

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
  res.render('time');
});

http.listen(process.env.PORT || 8001);

console.log('Listening to port: 8001');

var server_io = io.listen(http);
console.log('socket connected');

server_io.sockets.on('connection', function(socket){
  setInterval(function(){
    var date = new Date();
    var time = date.toLocaleTimeString();
    socket.emit('time', {'time': time });
  }, 1000);
});
