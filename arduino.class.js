Arduino = (function () {
	"use strict";

	function Arduino() {
		this.five = require("johnny-five");
		this.board = new five.Board();
		this.statusLed = null;
		this.light = null;
		this.ready = false;

		board.on("ready", function() {
			this.ready = true;

			this.statusLed = new this.five.Led(13);
			this.light = new this.five.Led(12);

			// Status : starting
			this.statusLed.strobe(500);
		});
	}

	Arduino.prototype.setLightPower = function(power) {
		this.light.brightness(power); // on a PWM pin !!
	};

	return Arduino;
})();
