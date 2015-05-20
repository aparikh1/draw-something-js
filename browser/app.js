// Never seen window.location before?
// This object describes the URL of the page we're on!
var socket = io(window.location.origin);
// var turingSocket = io('/turing-hall');

whiteboard.on('draw', function (start, end, strokeColor) {
	// console.log('start', start);
	// console.log('end', end);
	// console.log('strokeColor', strokeColor);

	socket.emit('clientDraw', start, end, strokeColor)
})

socket.on('connect', function () {
    console.log('I have made a persistent two-way connection to the server!');
});

socket.on('userSketch', function (start, end, strokeColor) {
	whiteboard.draw(start, end, strokeColor);
});

socket.on('serverSketch', function (arr) {
	arr.forEach(function (obj) {
		console.log(obj);
		whiteboard.draw(obj.start, obj.end, obj.strokeColor);	
	})
});

// turingSocket.on('userSketch', function (start, end, strokeColor) {
// 	whiteboard.draw(start, end, strokeColor);
// });