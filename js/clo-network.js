
var h = window.innerHeight;
var w = window.innerWidth;

var divisionList = {
    "AAM": "Aerospace and Advanced Manufacturing",
    "ALR": "Arts and Learning Resources",
    "BAT": "Business and Applied Technology",
    "CSS": "Communication and Social Sciences",
    "HSPS": "Health Sciences and Public Safety",
    "MS": "Math and Sciences",
    "TS": "Transitional Studies"
};

var tip = d3.tip().attr("class", "d3-tip").html(function(d) { return d.id; });

var svg = d3.select("#viz")
    .append("svg")
    .attr("height", "100%")
    .attr("width", "100%");

var menu = d3.select("#viz-menu");

var color = d3.scaleOrdinal(d3.schemeCategory10);

var force = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d) { return d.id; }))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter((w / 2) * .75, h / 2));

d3.json("../data/clo_intro.json", function(error, graph) {
  
  if (error) throw error;

  svg.call(tip);

  var groupedByDivision = d3.nest()
    .key(function(d) { return d.group; })
    .entries(graph.nodes);

  menu.append("h2")
    .text("EvCC Core Learning Outcomes by Division");

  menu.append("p")
    .text('The following network graph shows courses, color-coded by division, that introduce EvCC\'s Core Learning Outcomes.');

  menu.append("p")
    .text('Select a division below to highlight only its courses. Click and drag any CLO to rearrange the graph.');

  var menuItems = menu.append("div")
    .selectAll(".division")
    .data(_.reject(_.pluck(groupedByDivision, 'key'), function(item) { return item === 'CLO'; }).sort())
    .enter()
    .append("div")
    .attr("class", "division");

  menuItems.on("click", function(e) {
    d3.selectAll(".node").classed("node inactive", true).classed("active", false);
    d3.selectAll(".division").classed("active", false);

    d3.selectAll(".node." + e).classed("node active", true);
    d3.select(this).classed("active", true);
  });

  menuItems.append("div")
    .attr("class", "color-label")
    .attr("style", function(d) { return "background: " + color(d); })

  menuItems.append("div")
    .attr("class", "division-label")
    .text(function(d) {return divisionList[d];});

  var link = svg.append("g")
      .attr("class", "links")
    .selectAll("line")
    .data(graph.links)
    .enter().append("line")
      .attr("stroke-width", function(d) { return Math.sqrt(d.value); });

  var nodes = svg.append("g")
    .attr("class", "nodes");

  var node = nodes.selectAll(".node")
    .data(graph.nodes)
    .enter()
    .append("g")
    .attr("class", function(d) { return "node " + d.group; });

  node.call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));

  node.on("mouseover", function(d) { 
    var nodeSelection = d3.select(this);

    if (!/CLO/.test(nodeSelection.attr("class"))) {
      nodeSelection.classed("active", true);

      console.log(graph.links);
      console.log(d);
      console.log(_.where(graph.links, {source: d.id}));

      tip.show(d); 
    }
    
  });
  node.on("mouseout", function(d) {
    var nodeSelection = d3.select(this);

    nodeSelection.classed("active", false);
    tip.hide();
  });

  var circle = node.append("circle")
      .attr("r", function(d) { return d.group === "CLO" ? 6 : 4; })
      .attr("fill", function(d) { return color(d.group); });

  var labels = node.append("text")
    .attr("class", function(d) { return d.group === "CLO" ? "node-label-clo" : "node-label"; })
    .attr("x", 10)
    .attr("dy", ".35em")
    .text(function(d) { return d.id; });

  force.nodes(graph.nodes)
      .on("tick", ticked);

  force.force("link")
      .links(graph.links);

  function ticked() {
    link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });

    node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
  }

});

function dragstarted(d) {
  if (!d3.event.active) force.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}

function dragended(d) {
 // if (!d3.event.active) force.alphaTarget(0);
 // d.fx = null;
 // d.fy = null;
}
