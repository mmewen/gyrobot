var a = new (require("./arduino.class.js"))();


setTimeout(function(){
	console.log('angle :');
	if( !a.setAngle(0) ){
		console.log("Échoué :/");
	} else {
		console.log("Réussi !");
	}
}, 5000);


setTimeout(function(){
	console.log('2 roues :');
	if( !a.setSpeed(150) ){
		console.log("Échoué :/");
	} else {
		console.log("Réussi !");
	}
}, 6000);

setTimeout(function(){
	console.log('stop :');
	if( !a.setSpeed(0) ){
		console.log("Échoué :/");
	} else {
		console.log("Réussi !");
	}
}, 8000);