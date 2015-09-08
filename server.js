(function(){
	"use strict";
	var log4js = require('log4js');
	var logger = log4js.getLogger('Server');



	// ===== ARDUINO MANAGER =====
	var arduino = new (require('./arduino.class.js'))();


	// ===== STREAM MANAGER =====
	// Create stream

	// Send stream




	// ===== WEBSOCKET SERVER =====
	var server_port = 3128;

	// Get server IP address
	var os = require('os');
	var networkInterfaces = os.networkInterfaces();
	var ip = null;
	try {
		ip = networkInterfaces['eth0'][0].address || networkInterfaces["Wi-Fi"][0].address || "127.0.0.1";
	}
	catch(e) {
		ip = "127.0.0.1";
	}
	ip = ip+':'+server_port;

	// Settings
	var clientConnected = false;
	var settings = {
		light : false,
		lightPow : 50,
		video : false
	};

	// Create the server
	var server = require('socket.io')();

	// When the client is connected
	server.on('connection', function (client) {
		client.on('Hi!', function(data){
			if(!clientConnected){
				logger.info("Client connected and access granted !");
				
				client.emit('connectionValidation','ok!');
				send(client, "settings", settings);

				clientConnected = client.id;
				// todo : LED on
			} else {
				logger.info('Connection refused to connecting socket !');

				client.emit('connectionValidation', 'refused');
			}
		});

		// When the client is disconnected
		client.on('disconnect', function() {
			logger.info("Client "+client.id+" déconnecté !");

			if(client.id == clientConnected){
				clientConnected = false;
			}
		});

		// When the client send an order
		client.on('order', function(data) {
			if(client.id == clientConnected){
				// Handle order
				switch (data.name){
					case "video":
						settings.video = data.params.value;
						// todo : toggle vidéo
					break;
					case "light":
						settings.light = data.params.value;
						// todo : idem lumière
					break;
					case "lightPow":
						settings.lightPow = data.params.value;
						// todo : idem puissance
						// arduino.lightPow(data.params.value);
					break;
					case "angle":
						// logger.debug("Angle : " + data.params.value);
						arduino.setAngle(data.params.value);
					break;
					case "speed":
						// logger.debug("Vitesse : " + data.params.value);
						arduino.setSpeed(data.params.value);
					break;
					default:
						logger.warn("name '"+data.name+"' non reconnu !");
					break;
				}
			} else {
				logger.warn(client.id + " isn't the single client who rules them all (well, the robot actually)");
			}
		});
	});

	server.listen(server_port);
	logger.info("Server started at "+ip);

	function send (socket, name, params) {
		socket.emit('order', {
			name: name,
			params: params
		});
	}
}());