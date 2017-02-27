dataIn = WebSocket("server_URL");

dataIn.onopen = function (event) {
  console.log("Connection established.");
}

dataIn.onerror = function (error) {
  console.log("WS Error: " + error);
}

dataIn.onmessage = function (event) {
  console.log("Message recieved.");
  var data = JSON.parse(event.data);
}

dataIn.onclose = function (event) {
  console.log("Connection closed.");
}
