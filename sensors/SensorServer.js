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

serialPort.on("open", function () {
    console.log('open serial communication');
    serialPort.on('data', function(data) { 
        receivedData += data.toString();
        
        if (receivedData .indexOf('}') >= 0 && receivedData .indexOf('{') >= 0) {
            var sendData = receivedData .substring(receivedData .indexOf('{') + 1, receivedData .indexOf('}'));
            receivedData = '';
            console.log("{" + sendData + "}");
            
            // Broadcast to everyone else. 
            wss.clients.forEach(function each(client) {
                if (client.readyState === WebSocket.OPEN) {
                    client.send("{" + sendData + "}");
                }
            });
        }
   });
});
