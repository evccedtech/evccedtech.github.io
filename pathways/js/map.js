var key = "19R2ouE4c1n7QWnj16kwAfATr0_qTMxuuAe3spiFrjUE";
var sheet_url = "https://spreadsheets.google.com/feeds/list/" + key + "/od6/public/values?alt=json&callback="

function generateProgressIndicators() {

    var $phase = $(".phase");
    var len = $phase.length;
    var labels = '';
    
    for (var i = 0; i < len; i++) {        
        labels += '<span class="ui empty grey circular label"></span>';
    }
    
    $phase.each(function() {
        $(this).find("h2").append('<span class="labels">' + labels + '</span>');
    });
    
    $phase.each(function(idx) {
        
        var $phaseLabels = $phase.eq(idx).find('h2 .labels .label');
        
        for (var j = 0; j < idx + 1; j++) {
            $phaseLabels.eq(j).removeClass("grey").addClass("red");
        }
    });
    
}

$(document).ready(function() {
    
    generateProgressIndicators();
    
    $.getJSON(sheet_url, function(data) {
        //first row "title" column
        console.log(data);
        //console.log(data.feed.entry[0]['gsx$title']['$t']);
    });
    
});
