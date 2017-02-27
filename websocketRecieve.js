dataIn = WebSocket("server_URL");

socket.onmessage = function(event) {
  var message = event.data;
  console.log(message);
}

dataIn.onopen = function (event) {
  console.log("Connection established.");
}

dataIn.onerror = function (error) {
  console.log("WS Error: " + error);
}

dataIn.onmessage = function (e) {
  console.log("Server: " + e.data);
}

dataIn.onclose = function (event) {
  console.log("Connection closed.");
}
