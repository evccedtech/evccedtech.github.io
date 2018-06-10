var key = "19R2ouE4c1n7QWnj16kwAfATr0_qTMxuuAe3spiFrjUE";
var sheet_url = "https://spreadsheets.google.com/feeds/list/" + key + "/od6/public/values?alt=json&callback=?"

var program_name;
var program_description;
var pathway_name;
var program_years;
var program_cost;
var program_transfer_institutions;
var program_careers;
var phase_1_required_courses;
var phase_1_suggested_courses;
var phase_1_activities;
var phase_2_required_courses;
var phase_2_suggested_courses;
var phase_2_activities;

var templates = {
    'courselist': _.template('<div class="ui item"><a class="ui label"><%= course %></a></div>'),
    'activitylist': _.template('<div class="ui item"><%= activity %></div>')
};

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
    
    new WOW().init();
    
    generateProgressIndicators();
    
    $.getJSON(sheet_url, function(data) {
        console.log(data);
        //console.log(data.feed.entry[0]['gsx$title']['$t']);
        var entry = data.feed.entry[0];
        
        program_name = entry['gsx$programname']['$t'];
        program_description = entry['gsx$programdescription']['$t'];
        program_years = entry['gsx$programyears']['$t'];
        program_cost = entry['gsx$programcost']['$t'];
        program_transfer_institutions = entry['gsx$programtransferinstitutions']['$t'];
        program_careers = entry['gsx$programcareers']['$t'];
        pathway_name = entry['gsx$pathwayname']['$t'];
        phase_1_required_courses = entry['gsx$phase1requiredcourses']['$t'];
        phase_1_suggested_courses = entry['gsx$phase1suggestedcourses']['$t'];
        phase_1_activities = entry['gsx$phase1activities']['$t'];
        phase_2_required_courses = entry['gsx$phase2requiredcourses']['$t'];
        phase_2_suggested_courses = entry['gsx$phase2suggestedcourses']['$t'];
        phase_2_activities = entry['gsx$phase2activities']['$t'];
        
        $("#program_name").text(program_name);
        $("#program_description").text(program_description);
        $("#program_years").text(program_years);
        $("#program_cost").text(program_cost);
        $("#program_transfer_institutions").text(program_transfer_institutions);
        $("#program_careers").text(program_careers);
        
        var phase_1_required_courses_parts = phase_1_required_courses.split(/;/g);
        var phase_1_suggested_courses_parts = phase_1_suggested_courses.split(/;/g);
        var phase_1_activities_parts = phase_1_activities.split(/;/g);
        var phase_2_required_courses_parts = phase_2_required_courses.split(/;/g);
        var phase_2_suggested_courses_parts = phase_2_suggested_courses.split(/;/g);
        var phase_2_activities_parts = phase_2_activities.split(/;/g);
        
        phase_1_required_courses_parts.forEach(function(part) {
            if (part.length > 0) {
                $("#phase_1_required_courses").append(
                    templates.courselist({
                        course: part
                    })
                );
            }
        });
        
        phase_1_suggested_courses_parts.forEach(function(part) {
            if (part.length > 0) {
                $("#phase_1_suggested_courses").append(
                    templates.courselist({
                        course: part
                    })
                );
            }
        });
        
        phase_1_activities_parts.forEach(function(part) {
            if (part.length > 0) {
                $("#phase_1_activities").append(
                    templates.activitylist({
                        activity: part
                    })
                );
            }
        });
        
        phase_2_required_courses_parts.forEach(function(part) {
            if (part.length > 0) {
                $("#phase_2_required_courses").append(
                    templates.courselist({
                        course: part
                    })
                );
            }
        });
        
        phase_2_suggested_courses_parts.forEach(function(part) {
            if (part.length > 0) {
                $("#phase_2_suggested_courses").append(
                    templates.courselist({
                        course: part
                    })
                );
            }
        });
        
        phase_2_activities_parts.forEach(function(part) {
            if (part.length > 0) {
                $("#phase_2_activities").append(
                    templates.activitylist({
                        activity: part
                    })
                );
            }
        });
        
    });
    
});
