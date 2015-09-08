var a = new (require("./arduino.class.js"))();


setTimeout(function(){
	console.log('2 roues :');
	if( !a.setMotorSpeed("all", 50) ){
		console.log("Échoué :/");
	} else {
		console.log("Réussi !");
	}
}, 6000);