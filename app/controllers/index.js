const io = require('ti.socketio');
const SERVER_IP = "http://192.168.0.54:8080";
var isConnected = true;
var socket;

function doConnect() {
	// connect to server
	// add listener events (they will be removed when disconnecting)

	socket = io.connect(SERVER_IP);

	socket.on('connect', function() {
		console.log('socket connected');
	});
	socket.on('disconnect', function() {
		console.log('socket disconnected');
	});

	socket.on('message', function(msg) {
		$.lbl.text += "\n" + msg;
	})

	socket.on("data", function(obj) {
		if (obj.message) {
			$.lbl.text += "\n" + obj.message;
		}
		if (obj.userCount) {
			$.lbl_userCount.text = obj.userCount;
		}
		if (obj.lastMessages) {
			_.each(obj.lastMessages, function(msg) {
				$.lbl.text += "\n" + msg;
			})
		}
	})
}

doConnect();

function onSend(e) {
	socket.emit("message", $.tf_message.value);
	$.lbl.text += "\n" + $.tf_message.value;
	$.tf_message.value = "";
}

function onDisconnect(e) {
	if (isConnected) {
		socket.close();
		socket.disconnect();
		isConnected = false;
		$.btn_disconnect.title = "connect";
		$.lbl.text = "";
		$.lbl_userCount.text = 0;
	} else {
		doConnect();
		isConnected = true;
		$.btn_disconnect.title = "disconnect";
	}
}

$.index.open();
