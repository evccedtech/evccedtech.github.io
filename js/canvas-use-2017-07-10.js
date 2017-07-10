var data = [
    {"date": "2013-10-01", "percent": .6780},
    {"date": "2014-01-01", "percent": .6897},
    {"date": "2014-04-01", "percent": .6906},
    {"date": "2014-07-01", "percent": .6587},
    {"date": "2014-10-01", "percent": .7201},
    {"date": "2015-01-01", "percent": .6897},
    {"date": "2015-04-01", "percent": .7095},
    {"date": "2015-07-01", "percent": .7007},
    {"date": "2015-10-01", "percent": .7554},
    {"date": "2016-01-01", "percent": .7565},
    {"date": "2016-04-01", "percent": .7583},
    {"date": "2016-07-01", "percent": .7795},
    {"date": "2016-10-01", "percent": .7854},
    {"date": "2017-01-01", "percent": .8031},
    {"date": "2017-04-01", "percent": .8306}
];

var formatter = d3.format('.2p');

MG.data_graphic({
    title: "EvCC Canvas Use, Fall 2014 - Spring 2017",
    data: MG.convert.date(data, 'date'),
    animate_on_load: true,
    area: false,
    full_width: true,
    height: 300,
    right: 40,
    left: 110,
    bottom: 50,
    min_y: .5,
    max_y: 1,
    target: '#canvas_use',
    show_secondary_x_label: false,
    xax_count: 15,
    xax_format: function(d) {
        return getdate(d);
    },
    yax_format: d3.format('.2p'),
    y_extended_ticks: true,
    x_accessor: "date",
    y_accessor: "percent",
    y_label: "Courses Published",
    mouseover: function(d, i) {
        d3.select('#canvas_use svg .mg-active-datapoint')
            .text(getRollover(d));
    }
});

function getdate(date) {

    var month = date.getUTCMonth();
    var year = date.getFullYear();
    var output = '';

    switch(month) {
        case 0:
            output += "W";
            break;

        case 3:
            output += "S";
            break;

        case 6:
            output += "Su";
            break;

        case 9:
            output += "F";
            break;
    }

    output += year.toString().substring(2,4);

    return output;

}

function getRollover(datum) {

    var month = datum.date.getUTCMonth();
    var year = datum.date.getFullYear();
    var output = '';

    switch(month) {
        case 0:
            output += "Winter ";
            break;

        case 3:
            output += "Spring ";
            break;

        case 6:
            output += "Summer ";
            break;

        case 9:
            output += "Fall ";
            break;
    }

    output += year.toString() + '  ' + formatter(datum.percent);

    return output;

}