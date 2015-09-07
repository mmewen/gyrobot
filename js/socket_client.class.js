SocketWebclient = (function () {
	"use strict";

	function SocketWebclient() {
		this.server_host = window.location.host+':3128';
		this.socket = null;
		this.callbacks = {};

		if(io === undefined) {
			this.errorSocketIoNotFound();
		} else {
			this.socket = io(this.server_host);
			
			this.socket.on('connect', function(){
				// alert("Connecté !");
				$('#toogleParams').addClass('blue');
				$('#toogleParams').removeClass('red');
				console.log('Socket connected');

				this.socket.emit('Hi!', {}); // asking for the single connection

				this.socket.on('connectionValidation', function(answer){
					if (answer == 'ok!'){
						console.log('Single connection granteed !');
					} else {
						console.log('Single connection refused');
						$('#toogleParams').addClass('red');
						$('#toogleParams').removeClass('blue');
						alert('Connexion refusée !');
					}
				})

				if(!!this.callbacks.connect)
					this.callbacks.connect();
				// this.socket.emit('order', {to:'webclient',text:'Hello!'});
			}.bind(this));

			// When the client is disconnected from the server
			this.socket.on('disconnect', function(){
				this.errorServerTimeout();
				console.log('Socket disconnected');
				for(var i in this.callbacks.orders) {
					this.callbacks.orders[i]("socket_client.class.js", "reseau", {network: null});
				}
				$('#toogleParams').addClass('red');
				$('#toogleParams').removeClass('blue');
			}.bind(this));

			this.socket.on('log', function(data){
				console.log('[Server log] '+data);
			});

			this.socket.on('order', function(data){
				console.log('[Order] :');
				console.log(data);

				if(!!this.callbacks.orders) {
					if (!!data.name){
						// console.log("Order " + data.name + " from " + data.from + "with params :");
						// console.log(data.params);
						for(var i in this.callbacks.orders) {
							this.callbacks.orders[i](data.name, data.params || {});
						}
					}
					else
						console.log("Order has no name ! : " + data);
				}
			}.bind(this));

			setTimeout(function() {
				if(this.socket.disconnected)
					this.errorServerNotFound();
			}.bind(this), 500);
		}
	}

	SocketWebclient.prototype.connect = function (callback) {
		this.callbacks.connect = callback;
	};

	SocketWebclient.prototype.order = function (callback) {
		if(!this.callbacks.orders)
			this.callbacks.orders = [];
		this.callbacks.orders.push(callback);
	};

	SocketWebclient.prototype.send = function (name, params) {
		this.socket.emit('order', {
			name: name,
			params: params
		});
	};

	// Error functions
	SocketWebclient.prototype.error = function (msg, reload) {
		alert('Erreur SocketWebclient : '+msg+'');
		$('#toogleParams').addClass('red');
		$('#toogleParams').removeClass('blue');
	};
	SocketWebclient.prototype.errorServerNotFound = function () {
		alert('Server not found at '+this.server_host+'. Please make sure the server is running.');
		$('#toogleParams').addClass('red');
		$('#toogleParams').removeClass('blue');
	};
	SocketWebclient.prototype.errorServerTimeout = function () {
		alert('Server timed out. Please make sure the server is still running.');
		$('#toogleParams').addClass('red');
		$('#toogleParams').removeClass('blue');
	};
	SocketWebclient.prototype.errorSocketIoNotFound = function () {
		alert('Socket.io.js not found. Please make sure you are in webclient/ folder.');
		$('#toogleParams').addClass('red');
		$('#toogleParams').removeClass('blue');
	};

	return SocketWebclient;
})();
