var path = require('path');
var http = require('http');
var server = http.createServer();
var express = require('express');
var app = express();
var socketio = require('socket.io');

server.on('request', app);

var io = socketio(server);

var persistArray = [];

io.on('connection', function (socket) {
    console.log('A new client has connected!');
    console.log(socket.id);
    io.emit('serverSketch', persistArray);

    socket.on('clientDraw', function (start, end, strokeColor) {
    	// console.log(arguments);
    	persistArray.push({
    		start: start, 
    		end: end, 
    		strokeColor: strokeColor
    	})

    	socket.broadcast.emit('userSketch', start, end, strokeColor);
    });

    socket.on('disconnect', function (msg) {
	    console.log(':(');
	});
});


server.listen(1337, function () {
    console.log('The server is listening on port 1337!');
});

app.use(express.static(path.join(__dirname, 'browser')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname, 'index.html'));
});