var h = window.innerHeight;
var w = window.innerWidth;

var tip = d3.tip().attr("class", "d3-tip").html(function(d) { console.log(d); return d.id; });

var color = {
    "college": "#c60c0c",
    "pathway": "#006ca8",
    "program-group": "#009fdb",
    "program": "#747678",
    "link": "#c9cac8"
};

var svg = d3.select("#viz")
    .append("svg")
    .attr("height", "100%")
    .attr("width", "100%");

var menu = d3.select("#viz-menu");

var force = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d) { return d.id; }))
    .force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter((w / 2) * .75, h / 2))
    .force("collide", d3.forceCollide().radius(function(d) {
        if (d.group === "college") {
                return 60; 
            } else if (d.group === "pathway") {
                return 60;
            } else if (d.group === "program-group") {
                return 40;
            } else {
                return 12;
            }
    }).iterations(2));

d3.json("../data/pathways_network.json", function (error, graph) {

    if (error) console.log(error);

    svg.call(tip);

    var links = svg.append("g")
        .attr("class", "links");

    var link = links.selectAll("line")
        .data(graph.links)
        .enter()
        .append("line")
        .attr("stroke-width", function(d) { if (d.source === "EvCC") {return 5;} else { return 1;} })
        .attr("stroke", color.link);

    var nodes = svg.append("g")
        .attr("class", "nodes");

    var node = nodes.selectAll(".node")
        .data(graph.nodes)
        .enter()
        .append("g")
        .attr("class", function(d) { return "node " + d.group + " " + d.id; });

    node.call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged));

    node.on("mouseover", function(d) {
        if (d.group === "program") {
            tip.show(d);
        }
    }).on("mouseout", function(d) {
        tip.hide();
    })

    var circle = node.append("circle")
        .attr("r", function(d) { 
            if (d.group === "college") {
                return 40; 
            } else if (d.group === "pathway") {
                return 20;
            } else if (d.group === "program-group") {
                return 15;
            } else {
                return 10;
            }
        })
        .attr("fill", function(d) { return color[d.group]; })
        .attr("stroke", "#fff");

    var labels = svg.append("g")
        .attr("class", "labels");

    var label = labels.selectAll("text")
        .data(graph.nodes)
        .enter()
        .append("text")
        .attr("class", function(d) { return "label " + d.group; })
        .attr("dx", function(d) { 
            if (d.group === "college") {
                return -18; 
            } else if (d.group === "pathway") {
                return 24;
            } else if (d.group === "program-group") {
                return 19;
            } else {
                return 14;
            }
        })
        .attr("dy", ".35em")
        .text(function(d) { return d.id; });

    circle.on("mouseover", function(e) {
        d3.select(this).attr("stroke", "#333");
    }).on("mouseleave", function(e) {
        d3.select(this).attr("stroke", "#fff");
    })

    force.nodes(graph.nodes)
        .on("tick", ticked);

    force.force("link")
      .links(graph.links);

    function ticked() {
        link.attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

        node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
        label.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
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