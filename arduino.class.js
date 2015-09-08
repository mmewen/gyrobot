module.exports = (function () {
	"use strict";

	function Arduino() {
		var five = require("johnny-five");
		var board = new five.Board();
		// this.statusLed = null;
		// this.light = null;
		this.motors = {};
		this.motorConfigs = five.Motor.SHIELD_CONFIGS.ADAFRUIT_V2;
		this.ready = false;
		this.angle = 0; // 1 left, 0 front, -1 right
		this.powL = 0;
		this.powR = 0;
		this.speed = 0;
		this.gyroCoef = 1;

		board.on("ready", function() {
			this.ready = true;
			console.log("Arduino connecté et prêt !");

			// this.statusLed = new five.Led(13);
			// this.light = new five.Led(12);
			// this.motor[0] = new five.Motor({ // Motor 1
			// 	pins: { pwm: 11 }
			// 	data: 8,
			// 	clock: 4,
			// 	latch: 12,
			// 	bits: {
			// 		a: 2,
			// 		b: 3
			// 	}
			// });

			// this.motor[1] = new five.Motor({ // Motor 2
			// 	pins: { pwm: 3 }
			// 	data: 8,
			// 	clock: 4,
			// 	latch: 12,
			// 	bits: {
			// 		a: 1,
			// 		b: 4
			// 	}
			// });

			this.motors["right"] = new five.Motor(this.motorConfigs.M1);
			this.motors["left"] = new five.Motor(this.motorConfigs.M2);

			// console.log("Moteurs :");
			// console.log(this.motors);
		}.bind(this));
	}

	// Arduino.prototype.setLightPower = function(power) {
	// 	this.light.brightness(power); // on a PWM pin !!
	// };

	Arduino.prototype.setSpeed = function(speed) {
		if(!this.ready) return false;

		var angleLeft, angleRight;

		if (speed >= 0){
			this.motors["right"].start(speed*this.gyroCoef*this.powR);
			this.motors["left"].start(speed*this.gyroCoef*this.powL);
		} else {
			this.motors["right"].reverse(Math.abs(speed)*this.gyroCoef*this.powR);
			this.motors["left"].reverse(Math.abs(speed)*this.gyroCoef*this.powL);
		}
		return true;
	};

	Arduino.prototype.setMotorSpeed = function(motor, speed) { // uniquement pour le débug
		if(!this.ready) return false;

		if (motor != "left") { // <=> right or all
			this.motors["right"].start(speed);
		};

		if (motor != "right") { // <=> right or all
			this.motors["left"].start(speed);
		};

		return true;
	};

	Arduino.prototype.setAngle = function(angle) {
		this.angle = angle/255.; // in [-1; 1], 1 is left, 0 front and -1 right
		this.powR = Math.min(1, this.angle+1);
		this.powL = Math.min(1, -this.angle+1);
		console.log("gauche:"+this.powL+", droite:"+this.powR);
	};

	return Arduino;
})();
