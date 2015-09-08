# Gyrobot

A smartphone controlled robot project. I wanted to create my own two-wheels robot and to be able to control it wirelessly using my smartphone.

## Technologies used
I use some open source projects in the robot:

#### Hardware
* **Raspberry Pi** - running the Apache + node.js servers and wired to the camera, the Arduino and a status led. A dongle creates a Wifi access to which my phone will connect.
* **Arduino Uno & its motor shield** - running Firmata, it controls the two motors
* **Laser cut board and wheels** - in a Fablab (of course)

#### Software
* **js, jQuery and socket.io-client** - client side communication and reactions
* **node.js** - for the backend: communication with webclients (throught websockets), with the Arduino and with the GPIO ports
* **[johnny-five](https://github.com/rwaldron/johnny-five/)** - a JS framework that uses the Firmata protocol to control the Arduino

## Installation

```sh
$ git clone [git-repo-url] dillinger
```

## Todo
### In the past
* the "webapp" and communication with a node.js socket server
### Now
* Control the motors, light the LED
* Well, actually make it :)
* Broadcast the camera stream on the "webapp"
* Make a headlight to see in the dark
### Later
* Create a 3 mics sound analyser that can locate my phone (which just plays a mp3 with >16 kHz beeps)

## Cool tutorials
(that helped me do this project :) )
