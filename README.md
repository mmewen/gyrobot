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

## Quick start

```sh
# Clone
git clone git@github.com:mmewen/gyrobot.git

# Install node on PC
curl -sL https://deb.nodesource.com/setup_6.x | sudo -E bash -
sudo apt-get install -y nodejs build-essential
sudo apt-get install nodejs-legacy
# OR
# Install on ARMv6 proc (Raspberry Pi)
# (use cat /proc/cpuinfo to know your ARM version)
sudo wget https://nodejs.org/dist/v6.11.0/node-v6.11.0-linux-armv6l.tar.xz
tar xf node-v6.11.0-linux-armv6l.tar.xz
sudo cp -r node-v6.11.0-linux-armv6l /usr/local/
echo "PATH=\"/usr/local/node-v6.11.0-linux-armv6l/bin/:\$PATH\"" >> ~/.profile
sudo ln -s /usr/local/node-v6.11.0-linux-armv6l/bin/node /usr/local/bin/nodejs # because nodejs-legacy would point to the Debian repo version of node, which lacks some stuff (https://github.com/nodejs/nan/issues/414)
# Think about hash -r if necessary)

# Install the dependencies
sudo apt-get install hostapd udhcpd apache

# Update versions, if necessary
# sudo npm install -g npm node-gyp
# sudo n 8.0.0 # tested with it, you can try 'sudo n latest' for fun

# Make a link to the repo
sudo ln -s ~/gyrobot /var/www/html/
sudo cp ~/gyrobot/conf/.htaccess /var/www/html/

# Copy conf files
sudo cp ./conf/hostapd.conf /etc/hostapd/
sudo cp ./conf/interfaces /etc/network/
sudo cp ./conf/rc.local     /etc/
sudo cp ./conf/udhcpd.conf /etc/
sudo cp ./conf/wpa_supplicant.conf /etc/wpa_supplicant/

# Active htaccess
sudo nano /etc/apache2/apache2.conf
# Change lines like this :
# AllowOverride None
# into this :
# AllowOverride All
sudo service apache2 restart

# Install npm dependencies
cd gyrobot
npm install

sudo reboot
```

## Todo
### In the past
* the "webapp" and communication with a node.js socket server
### Now
* Make an install script
* Control the motors, light the LED
* Well, actually make it :)
* Broadcast the camera stream on the "webapp"
* Make a headlight to see in the dark
### Later
* Create a 3 mics sound analyser that can locate my phone (which just plays a mp3 with >16 kHz beeps)

## Cool tutorials
(that helped me do this project :) )
* [RPI-Wireless-Hotspot on eLinux](http://elinux.org/RPI-Wireless-Hotspot)
