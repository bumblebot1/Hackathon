var express = require('express');
var app = express()

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

serialPort.on("open", function () {
    console.log('open serial communication');
    serialPort.on('data', function(data) { 
        receivedData += data.toString();
        
        if (receivedData .indexOf('}') >= 0 && receivedData .indexOf('{') >= 0) {
            var sendData = receivedData .substring(receivedData .indexOf('{') + 1, receivedData .indexOf('}'));
            receivedData = '';
            console.log("{" + sendData + "}");
            
            last_recv = "{" + sendData + "}";

            // Broadcast to everyone else. 
            wss.clients.forEach(function each(client) {
                if (client.readyState === WebSocket.OPEN) {
                    client.send("{" + sendData + "}");
                }
            });
        }
    });
});

app.get('/', function (req, res){
    console.log("sam sucks");
});

app.get('/api', function (req, res) {
    res.send(last_recv);
});

app.listen(8000, function(){
    console.log("Listening");
});
