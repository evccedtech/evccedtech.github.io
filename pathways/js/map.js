// Spreadsheet variables
var key = "19R2ouE4c1n7QWnj16kwAfATr0_qTMxuuAe3spiFrjUE";
var sheet_url = "https://spreadsheets.google.com/feeds/list/" + key + "/od6/public/values?alt=json&callback=?"

function setHtmlValueSimple(id, value) {

    console.log(id, value, typeof value);
    var compiled = '';

    if (typeof value !== 'object') {
        $(id).text(value);
    } else {
        value.forEach(function(item) {
            compiled += '<div class="item">' + item.replace(/^\s*|\s*$/g, '') + '</div>';
        });
        $(id).append('<div class="ui list">' + compiled + '</div>');
    }

}

function addPhaseIndicators() {

    var $phase = $(".phase");
    var len = $phase.length;
    var labels = '';
    
    for (var i = 0; i < len; i++) {        
        labels += '<span class="ui empty grey circular label"></span>';
    }
    
    $phase.each(function() {
        $(this).find("h2").append('<span class="labels wow fadeIn" data-wow-delay=".5s">' + labels + '</span>');
    });
    
    $phase.each(function(idx) {
        
        var $phaseLabels = $phase.eq(idx).find('h2 .labels .label');
        
        for (var j = 0; j < idx + 1; j++) {
            $phaseLabels.eq(j).removeClass("grey").addClass("red");
        }
    });
    
}

function addHorizontalLabeledList(id, value) {

    console.log(id, value, typeof value);
    var compiled = '';

    if (typeof value === 'object') {

    console.log(value.length)
        if (value.length === 1 && value[0] === '') {
            compiled = '<div class="item"><span class="ui label">...Placeholder...</span></div>';
        } else {
            value.forEach(function(item) {
                compiled += '<div class="item"><span class="ui label">' + item.replace(/^\s*|\s*$/g, '') + '</span></div>';
            });
        }

        $(id).append('<div class="ui horizontal list">' + compiled + '</div>');
    }

}

$(document).ready(function() {
    
    // Initialize Wow.js for scroll-based animations
    new WOW().init();

    addPhaseIndicators();

    // Fetch spreadsheet data
    $.getJSON(sheet_url, function(data) {

        var entry = data.feed.entry[0];

        setHtmlValueSimple('#program_name', entry['gsx$programname']['$t']);
        setHtmlValueSimple('#program_description', entry['gsx$programdescription']['$t']);
        setHtmlValueSimple("#program_duration", entry['gsx$programduration']['$t']);
        setHtmlValueSimple("#program_cost", entry['gsx$programcost']['$t']);
        setHtmlValueSimple("#program_transfer_institutions", entry['gsx$programtransferinstitutions']['$t'].split(/;/g));
        setHtmlValueSimple("#program_careers", entry['gsx$programcareers']['$t'].split(/;/g));

        addHorizontalLabeledList("#phase_1_required", entry['gsx$phase1requiredcourses']['$t'].split(/;/g));
        addHorizontalLabeledList("#phase_1_suggested", entry['gsx$phase1suggestedcourses']['$t'].split(/;/g));
        addHorizontalLabeledList("#phase_1_activities", entry['gsx$phase1activities']['$t'].split(/;/g));
        addHorizontalLabeledList("#phase_2_required", entry['gsx$phase2requiredcourses']['$t'].split(/;/g));
        addHorizontalLabeledList("#phase_2_suggested", entry['gsx$phase2suggestedcourses']['$t'].split(/;/g));
        addHorizontalLabeledList("#phase_2_activities", entry['gsx$phase2activities']['$t'].split(/;/g));

    });
});
