var express = require('express');
var app = express()
var sys = require('sys')
var exec = require('child_process').exec;

var WebSocket = require("ws");
var wss = new WebSocket.Server({port: 8080});

var SerialPort = require("serialport");
var serialPort = new SerialPort('/dev/ttyACM0', {
    baudrate: 9600,
    dataBits: 8, 
    parity: 'none', 
    stopBits: 1, 
    flowControl: false 
});

var receivedData = "";
var last_recv = "";
var light_switch = false;

serialPort.on("open", function () {
    console.log('open serial communication');
    serialPort.on('data', function(data) { 
        receivedData += data.toString();
        
        if (receivedData .indexOf('}') >= 0 && receivedData .indexOf('{') >= 0) {
            var sendData = receivedData .substring(receivedData .indexOf('{') + 1, receivedData .indexOf('}'));
            receivedData = '';
            
            last_recv = "{" + sendData + ", \"light_switch\": " + light_switch.toString() +"}";
	    console.log(last_recv);
            // Broadcast to everyone else. 
            wss.clients.forEach(function each(client) {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(last_recv);
                }
            });
        }
    });
});

setTimeout(off, 10);

function off(){
    exec("sudo ./off");
    light_switch = false;
    //setTimeout(on, 1000);
};      

function on(){
    exec("sudo ./on");
    light_switch = true;
    setTimeout(off, 1000);
};

app.get('/', function (req, res){
    console.log("sam sucks");
});

app.get('/api/on', function (req, res) {
    exec("sudo ./on");
    light_switch = true;
    res.end();
});

app.get('/api/off', function (req, res) {
    exec("sudo ./off");
    light_switch = true;
    res.end();
});

app.get('/api', function (req, res) {
    res.send(last_recv);
});

app.listen(8000, function(){
    console.log("Listening");
});
