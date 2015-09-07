// var videoHost = 'ws://'+window.location.host+':3129';
// var clientVideo = new WebSocket( videoHost );
var clientVideo = "test.mp4";
var canvas = document.getElementById('videoCanvas');
var player = new jsmpeg(clientVideo, {canvas: canvas, autoplay: true, loop: false});