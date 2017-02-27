var dataOut = new WebSocket("client_URL");

dataOut.onopen = function (event) {
  dataOut.send("Opening connection.");
  console.log("Opening connection.");
}

dataOut.onerror = function (error) {
  console.log("WS Error: " + error);
}

dataOut.onclose = function (event) {
  console.log("WebSocket closed.");
}

function getData () {
  return "here is some data.";
}

function sendData () {
  data = getData;
  socket.send(message);
}
