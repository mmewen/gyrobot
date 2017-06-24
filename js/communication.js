var socket = new SocketWebclient();

// Socket input
socket.order(function (name, params){
	switch (name){
		case "settings":
			$("#videoSwitch").prop("checked", params.video);
			$("#phareSwitch").prop("checked", params.light);
			$("#phareRange").val(params.lightPow);
		break;
		case "error":
			// alert("Erreur : " + params.error);
		break;
	}
})

// Socket output
function transmit(name, params){
	// Just to prepare a prospective baudrate
	socket.send(name, params);
}

var dragVitesse = function( event, pointer, moveVector ){
	var topPos = (parseInt($(this).data("startTop")) - parseInt($(this).position().top));
	transmit("speed", {
		value: 510*topPos / ($("#bAVitesse").height() - $("#bVitesse").height())
	});
	$("#echoSpeed").text( 510*topPos/($("#bAVitesse").height() - $("#bVitesse").height()) );
}

var dragAngle = function( event, pointer, moveVector ){
	var leftPos = (parseInt($(this).data("startLeft")) - parseInt($(this).position().left));
	transmit("angle", {
		value: 510*leftPos / ($("#bAAngle").width() - $("#bAngle").width())
	});
	$("#echoAngle").text( 510*leftPos/($("#bAAngle").width() - $("#bAngle").width()) );
}

$("#videoSwitch").on("change", function(){
	transmit("video", { value: $("#videoSwitch").prop("checked") });
	if ($("#videoSwitch").prop("checked")){
		$("#videoCanvas").slideDown();
		// if (!!player) player.play();
	} else {
		// if (!!player) player.stop();
		$("#videoCanvas").slideUp();
	}
});

$("#phareSwitch").on("change", function(){
	transmit("light", { value: $("#phareSwitch").prop("checked") });
});

$("#phareRange").on("change", function(){
	transmit("lightPow", { value: $("#phareRange").val() });
});

$("#halt").on("click", function(){
        transmit("halt", { });
});



// Forms and actions
var create = function( event, pointer, moveVector ){
	$(this).data("startLeft", parseInt($(this).css("left")));
	$(this).data("startTop", parseInt($(this).css("top")));
}
var stop = function( event, pointer, moveVector ){
	$("#echo").html( "&nbsp;" );
	$(this).animate({
		left: $(this).data("startLeft"),
		top: $(this).data("startTop")
	}, 500);
	transmit("speed", { value: 0 });
	transmit("angle", { value: 0 });
	$("#echoSpeed").text( 0 );
	$("#echoAngle").text( 0 );
}

var $vitesseDragabilly = $('#bVitesse').draggabilly( { containment: true } );
var $angleDragabilly = $('#bAngle').draggabilly( { containment: true } );

$vitesseDragabilly.on('dragStart', create );
$vitesseDragabilly.on('dragMove', dragVitesse );
$vitesseDragabilly.on('dragEnd', stop )
$angleDragabilly.on('dragStart', create );
$angleDragabilly.on('dragMove', dragAngle );
$angleDragabilly.on('dragEnd', stop );

$('#toogleParams').on("click", function(){
	if ($('#toogleParams').hasClass('blue')){
		$("#paramsView").slideToggle();
	}
});
