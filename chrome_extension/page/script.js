var ws = new WebSocket("ws://192.168.1.145:8080");

var data = [];

for(var i = 0; i < 20; i++){
  data.push({light:0,temp:0});
}

//window.addEventListener("load", load_dat_graph);

function load_dat_graph() {

  console.log("load_dat_graphed")

  var svg = d3.select("svg"),
      margin = {top: 20, right: 20, bottom: 30, left: 50},
      width = +svg.attr("width") - margin.left - margin.right,
      height = +svg.attr("height") - margin.top - margin.bottom,
      g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var x = d3.scaleLinear()
      .rangeRound([0, width]);

  var y = d3.scaleLinear()
      .rangeRound([height, 0]);

  var lineLight = d3.line()
    .x(function(d,i) { return x(i); })
    .y(function(d) { return y(d.light); });

  var lineTemp = d3.line()
    .x(function(d,i) { return x(i); })
    .y(function(d) { return y(d.temp); });

  g.append("path").classed("light",true);
  g.append("path").classed("temp",true);

  // svg
  // .append('g')
  // .classed("xaxis",true)
  // .attr("transform", "translate("+margin.left+","+margin.top+")");

  svg
  .append('g')
  .classed("yaxis",true)
  .attr("transform", "translate("+margin.left+","+margin.top+")");

  ws.onmessage = function (event) {
    var new_data = JSON.parse(event.data);
    data.push(new_data);
    data = data.slice(1,21);

    x.domain(d3.extent(data, function(d,i) {return i; }));

    var ycombined = [];
    data.forEach(function(d){
      ycombined.push(d.light);
      ycombined.push(d.temp);
    });

    y.domain(d3.extent(ycombined, function(d) {return d; }));

    // var xAxis = d3.axisBottom(x)
    //     .ticks(20);

    var yAxis = d3.axisLeft(y)
        .ticks(5);  //

    // svg
    //   .select(".xaxis")
    //   .call(xAxis);

    svg
      .select(".yaxis")
      .call(yAxis);



    // g.append("g")
    //     .attr("transform", "translate(0," + height + ")")
    //     .call(d3.axisBottom(x))

    g.select(".light")
      .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", lineLight);

    g.select(".temp")
      .datum(data)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-linejoin", "round")
        .attr("stroke-linecap", "round")
        .attr("stroke-width", 1.5)
        .attr("d", lineTemp);
  }


};
