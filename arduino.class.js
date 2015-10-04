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

		var that = this;

		board.on("ready", function() {
			that.ready = true;
			console.log("Arduino connecté et prêt !");

			// that.statusLed = new five.Led(13);
			that.light = new five.Led(9);

			// that.motors["right"] = new five.Motor(that.motorConfigs.M1);
			// that.motors["left"] = new five.Motor(that.motorConfigs.M2);


			// that.accelero = new five.Accelerometer( {controller: "ADXL345"} );
			// that.accelero.on("change", function(){
			// 	// console.log("x:"+this.x+"y:"+this.y);
			// 	if(that.acceleroReference == null)
			// 		that.acceleroReference = this.x;
			// 	else{
			// 		that.gyroCoef = Math.abs( 1 - Math.abs( (this.x - that.acceleroReference)/1.25 ) );
			// 					// 1.25 semble être le maximum retourné par l'accéléro chez moi
			// 		// console.log("Pos:" + that.gyroCoef);
			// 	}
			// });

		});
	}

	Arduino.prototype.setLightPower = function(power) {
		this.light.brightness(power); // on a PWM pin !!
	};

	Arduino.prototype.setSpeed = function(speed) {
		if(!this.ready) return false;

		var angleLeft, angleRight;

		if (speed >= 0){
			this.motors.right.start(speed*this.gyroCoef*this.powR);
			this.motors.left.start(speed*this.gyroCoef*this.powL);
		} else {
			this.motors.right.reverse(Math.abs(speed)*this.gyroCoef*this.powR);
			this.motors.left.reverse(Math.abs(speed)*this.gyroCoef*this.powL);
		}
		return true;
	};

	Arduino.prototype.setMotorSpeed = function(motor, speed) { // uniquement pour le débug
		if(!this.ready) return false;

		if (motor != "left") { // <=> right or all
			this.motors.right.start(speed);
		}

		if (motor != "right") { // <=> left or all
			this.motors.left.start(speed);
		}

		return true;
	};

	Arduino.prototype.setAngle = function(angle) {
		this.angle = angle/255.; // in [-1; 1], 1 is left, 0 front and -1 right
		this.powR = Math.min(1, this.angle+1);
		this.powL = Math.min(1, -this.angle+1);
		// console.log("gauche:"+this.powL+", droite:"+this.powR);
	};

	return Arduino;
})();
