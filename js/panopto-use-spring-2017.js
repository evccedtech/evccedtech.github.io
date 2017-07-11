d3.csv("data/s17_panopto.csv", function(data) {

    var graph_data = [];

    for (var i = 0, len = data.length; i < data.length; i++) {
        var obj = {
            sessions: +data[i].sessions,
            hours_recorded: +data[i].hours_recorded.replace(/,/g, ''),
            hours_viewed: +data[i].hours_viewed.replace(/,/g, ''),
            views: +data[i].views.replace(/,/g, ''),
            seq: i
        };

        graph_data.push(obj);
    }

    MG.data_graphic({
        title: 'Panopto Videos - Hours Viewed per Course, Spring 2017',
        data: graph_data,
        animate_on_load: true,
        full_width: true,
        interpolate: d3.curveLinear,
        area: false,
        height: 400,
        right: 40,
        left: 110,
        bottom: 50,
        target: '#panopto_use',
        x_accessor: 'seq',
        x_label: 'Course',
        y_accessor: 'hours_viewed',
        y_extended_ticks: false,
        y_label: 'Hours Viewed',
        mouseover: function(d, i) {
            d3.select('#panopto_use svg .mg-active-datapoint')
                .text('Course ' + d.seq + ' - ' + d.hours_viewed + ' hours viewed (' + d.sessions + ' videos)');
        }
    });

});