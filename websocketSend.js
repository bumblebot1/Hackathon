var dataOut = new WebSocket("client_URL");

dataOut.onopen = function (event) {
  console.log("Opening connection.");
}

dataOut.onerror = function (error) {
  console.log("WS Error: " + error);
}

dataOut.onclose = function (event) {
  console.log("WebSocket closed.");
}

function getData () {
  var light = 0;
  var temp = 0;
  var text = '{ "data" : [' +
    '{"metric":"light", "value": light},' +
    '{"metric":"temp", "value": temp} ]}';
  return text;
}

function sendData () {
  data = getData;
  dataOut.send(message);
}
