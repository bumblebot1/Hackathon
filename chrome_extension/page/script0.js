console.log("hi");
$("#off").click(off)
$("#on").click(on)

function on(){
  $.get("http://192.168.1.145:8000/api/on", function(){console.log("on")});
}

function off(){
  $.get("http://192.168.1.145:8000/api/off", function(){console.log("off")});
}
