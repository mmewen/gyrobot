module.exports = (function () {
	"use strict";

	function Arduino() {
		var five = require("johnny-five");
		var board = new five.Board();
		// this.statusLed = null;
		// this.light = null;
		this.motors = {};
		this.motorConfigs = five.Motor.SHIELD_CONFIGS.ADAFRUIT_V1;

		this.accelero = null;
		this.acceleroReference = null; // angle x par défaut

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
			// this.light = new five.Led(9);

			this.motors["left"] = new five.Motor(this.motorConfigs.M3);
			this.motors["leftCoef"] = -1;
			this.motors["right"] = new five.Motor(this.motorConfigs.M4);
			this.motors["rightCoef"] = -1;


			// this.accelero = new five.Accelerometer( {controller: "ADXL345"} );
			// this.accelero.on("change", function(){
			// 	// console.log("x:"+this.x+"y:"+this.y);
			// 	if(this.acceleroReference == null)
			// 		this.acceleroReference = this.x;
			// 	else{
			// 		this.gyroCoef = Math.abs( 1 - Math.abs( (this.x - this.acceleroReference)/1.25 ) );
			// 					// 1.25 semble être le maximum retourné par l'accéléro chez moi
			// 		// console.log("Pos:" + this.gyroCoef);
			// 	}
			// });

		}.bind(this));
	}

	Arduino.prototype.setLightPower = function(power) {
		this.light.brightness(power); // on a PWM pin !!
	};

	Arduino.prototype.setSpeed = function(speed) {
		if(!this.ready) return false;

		var angleLeft, angleRight;
		var leftSpeed = speed*this.gyroCoef*this.powL * this.motors["leftCoef"];
		var rightSpeed = speed*this.gyroCoef*this.powR * this.motors["rightCoef"];

		// console.log("gauche:"+leftSpeed+", droite:"+rightSpeed);
		if (leftSpeed >= 0){
			this.motors.left.start(leftSpeed);
			// console.log("gauche:"+leftSpeed);
		} else {
			leftSpeed *= Math.sign(leftSpeed);
			this.motors.right.reverse(leftSpeed);
			// console.log("gauche:"+leftSpeed);
		}

		if (rightSpeed >= 0){
			this.motors.right.start(rightSpeed);
			// console.log("droite:"+rightSpeed);
		} else {
			rightSpeed *= Math.sign(rightSpeed);
			this.motors.left.reverse(rightSpeed);
			// console.log("droite:"+rightSpeed);
		}
		return true;
	};

	// Arduino.prototype.setMotorSpeed = function(motor, speed) { // uniquement pour le débug
	// 	if(!this.ready) return false;

	// 	if (motor != "left") { // <=> right or all
	// 		this.motors.right.start(speed);
	// 	}

	// 	if (motor != "right") { // <=> left or all
	// 		this.motors.left.start(speed);
	// 	}

	// 	return true;
	// };

	Arduino.prototype.setAngle = function(angle) {
		if(!this.ready) return false;

		this.angle = angle/255.; // in [-1; 1], 1 is left, 0 front and -1 right
		this.powR = Math.min(1, this.angle+1);
		this.powL = Math.min(1, -this.angle+1);
		// console.log("gauche:"+this.powL+", droite:"+this.powR);
		return true;
	};

	return Arduino;
})();
