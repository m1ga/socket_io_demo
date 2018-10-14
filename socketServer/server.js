var http = require('http');
var fs = require('fs');

// Loading the index file . html displayed to the client
var server = http.createServer(function(req, res) {
	fs.readFile('./index.html', 'utf-8', function(error, content) {
		res.writeHead(200, {
			"Content-Type": "text/html"
		});
		res.end(content);
	});
});

// Loading socket.io
var io = require('socket.io').listen(server);
var lastMessages = [];

// When a client connects, we note it in the console
io.sockets.on('connection', function(socket) {

	console.log('A client is connected!', io.engine.clientsCount);

	// message to the connection
	socket.emit("data", {
		"message": "Connected",
		"userCount": io.engine.clientsCount,
		"lastMessages": lastMessages
	});

	// message to everyone else
	socket.broadcast.emit('data', {
		"message": "Another client connected",
		"userCount": io.engine.clientsCount
	});

	socket.on('message', function(msg) {
		console.log('Got a message: ' + msg);
		socket.broadcast.emit('message', msg);
		if (lastMessages.length>5){
			lastMessages.shift();
		}
		lastMessages.push(msg);
	});

	socket.on('disconnecting', function(res) {
		console.log("A client is gone", io.engine.clientsCount);
		socket.broadcast.emit("data", {
			"message":"Client is gone...",
			"userCount": (io.engine.clientsCount - 1)
		});
	});
});



server.listen(8080);
