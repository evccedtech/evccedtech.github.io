var h = window.innerHeight;
var w = window.innerWidth;

var data = [
    ["demonstrate", "describe", 147],
    ["demonstrate", "identify", 182],
    ["demonstrate", "use", 198],
    ["demonstrate", "explain", 100],
    ["demonstrate", "apply", 151],
    ["demonstrate", "discuss", 106],
    ["demonstrate", "analyze", 96],
    ["demonstrate", "create", 95],
    ["demonstrate", "perform", 62],
    ["describe", "demonstrate", 147],
    ["describe", "identify", 189], 
    ["describe", "use", 132],
    ["describe", "explain", 145],
    ["describe", "apply", 124],
    ["describe", "discuss", 104],
    ["describe", "analyze", 92],
    ["describe", "create", 59],
    ["describe", "perform", 43],
    ["identify", "demonstrate", 182],
    ["identify", "describe", 189],
    ["identify", "use", 170],
    ["identify", "explain", 147],
    ["identify", "apply", 135],
    ["identify", "discuss", 122],
    ["identify", "analyze", 99],
    ["identify", "create", 66],
    ["identify", "perform", 56],
    ["use", "demonstrate", 198],
    ["use", "describe", 132],
    ["use", "identify", 170],
    ["use", "explain", 106],
    ["use", "apply", 150],
    ["use", "discuss", 76],
    ["use", "analyze", 85],
    ["use", "create", 88],
    ["use", "perform", 64],
    ["explain", "demonstrate", 100],
    ["explain", "describe", 145],
    ["explain", "identify", 147],
    ["explain", "use", 106],
    ["explain", "apply", 87],
    ["explain", "discuss", 81],
    ["explain", "analyze", 65],
    ["explain", "create", 28],
    ["explain", "perform", 37],
    ["apply", "demonstrate", 151],
    ["apply", "describe", 124],
    ["apply", "identify", 135],
    ["apply", "use", 150],
    ["apply", "explain", 87],
    ["apply", "discuss", 78],
    ["apply", "analyze", 81],
    ["apply", "create", 70],
    ["apply", "perform", 38],
    ["discuss", "demonstrate", 106],
    ["discuss", "describe", 104],
    ["discuss", "identify", 122],
    ["discuss", "use", 76],
    ["discuss", "explain", 81],
    ["discuss", "apply", 78],
    ["discuss", "analyze", 56],
    ["discuss", "create", 32],
    ["discuss", "perform", 29],
    ["analyze", "demonstrate", 96],
    ["analyze", "describe", 92],
    ["analyze", "identify", 99],
    ["analyze", "use", 85],
    ["analyze", "explain", 65],
    ["analyze", "apply", 81],
    ["analyze", "discuss", 56],
    ["analyze", "create", 34],
    ["analyze", "perform", 19],
    ["create", "demonstrate", 95],
    ["create", "describe", 59],
    ["create", "identify", 66],
    ["create", "use", 88],
    ["create", "explain", 28],
    ["create", "apply", 70],
    ["create", "discuss", 32],
    ["create", "analyze", 34],
    ["create", "perform", 16],
    ["perform", "demonstrate", 62],
    ["perform", "describe", 43],
    ["perform", "identify", 56],
    ["perform", "use", 64],
    ["perform", "explain", 37],
    ["perform", "apply", 38],
    ["perform", "discuss", 29],
    ["perform", "analyze", 19],
    ["perform", "create", 16]
];

var sortOrder = ["apply", "analyze", "create", "demonstrate", "describe", "discuss", "explain", "identify", "perform", "use"];

function sort(a, b) { return d3.ascending(sortOrder.indexOf(a), sortOrder.indexOf(b)); }

var colors = d3.scaleOrdinal(d3.schemeCategory20c);

var chord = viz.ch().data(data)
    .padding(.01)
    .sort(sort)
        .innerRadius(Math.min(h / 2, w / 2) - 110)
        .outerRadius(Math.min(h / 2, w / 2) - 100)
        .duration(1000)
        .chordOpacity(0.7)
        .labelPadding(.03)
    .fill(function(d) { return colors(d); });

var svg = d3.select("#viz")
    .append("svg")
    .attr("height", "100%")
    .attr("width", "100%");

svg.append("g").attr("transform", "translate(" + w / 2 + "," + h / 2 + ")").call(chord);