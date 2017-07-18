var data = [
    [
        {"range": "< 5", "count": 6716}, 
        {"range": "5-9", "count": 389},
        {"range": "10-14", "count": 855},
        {"range": "15-19", "count": 559},
        {"range": "20-24", "count": 2170},
        {"range": "25-29", "count": 1749},
        {"range": "30-34", "count": 4279},
        {"range": "35-39", "count": 2280},
        {"range": "40-44", "count": 8466},
        {"range": "45-49", "count": 4690},
        {"range": "50-54", "count": 17210},
        {"range": "55-59", "count": 8734},
        {"range": "60-64", "count": 31595},
        {"range": "65-69", "count": 21159},
        {"range": "70-74", "count": 45489},
        {"range": "75-79", "count": 36700},
        {"range": "80-84", "count": 88075},
        {"range": "85-89", "count": 54957},
        {"range": "90-94", "count": 111086},
        {"range": "> 94", "count": 359158}
    ],
    [
        {"range": "< 5", "count": 2547}, 
        {"range": "5-9", "count": 255},
        {"range": "10-14", "count": 378},
        {"range": "15-19", "count": 294},
        {"range": "20-24", "count": 719},
        {"range": "25-29", "count": 707},
        {"range": "30-34", "count": 1497},
        {"range": "35-39", "count": 1350},
        {"range": "40-44", "count": 3380},
        {"range": "45-49", "count": 3050},
        {"range": "50-54", "count": 7227},
        {"range": "55-59", "count": 6080},
        {"range": "60-64", "count": 14580},
        {"range": "65-69", "count": 13019},
        {"range": "70-74", "count": 24344},
        {"range": "75-79", "count": 22510},
        {"range": "80-84", "count": 46409},
        {"range": "85-89", "count": 35563},
        {"range": "90-94", "count": 59334},
        {"range": "> 94", "count": 149085}
    ]
];

var format = d3.format(',');

data.forEach(function(datum) {
    datum.forEach(function(d, i) {
        d.seq = i;
    })
});

MG.data_graphic({
    title: 'Canvas Quiz Scores - All',
    data: data[0],
    animate_on_load: true,
    area: false,
    full_width: true,
    height: 300,
    left: 100,
    right: 40,
    bottom: 50,
    target: '#canvas-quiz-scores-all',
    y_extended_ticks: true,
    x_accessor: 'seq',
    y_accessor: 'count',
    xax_count: 20,
    xax_format: function(d) {
        return data[0][d].range;
    },
    x_label: '% of Possible Points',
    mouseover: function(d) {
        d3.select('#canvas-quiz-scores-all svg .mg-active-datapoint')
            .text(d.range + '%  -  ' + format(d.count) + ' quiz submissions');
    },
    linked: true,
});

MG.data_graphic({
    title: 'Canvas Quiz Scores - Quizzes Worth 20+ Points',
    data: data[1],
    animate_on_load: true,
    area: false,
    full_width: true,
    height: 300,
    left: 100,
    right: 40,
    bottom: 50,
    target: '#canvas-quiz-scores-20',
    y_extended_ticks: true,
    x_accessor: 'seq',
    y_accessor: 'count',
    xax_count: 20,
    xax_format: function(d) {
        return data[1][d].range;
    },
    x_label: '% of Possible Points',
    mouseover: function(d) {
        d3.select('#canvas-quiz-scores-20 svg .mg-active-datapoint')
            .text(d.range + '%  -  ' + format(d.count) + ' quiz submissions');
    },
    linked: true
});