var csvIn;
var courses = [];
var csvOut = [];
var instance = window.localStorage.getItem('instance');
var token = window.localStorage.getItem('token');

function canvasApiRequest(url, callback) {

    var args;
    var headers = {'Authorization': 'Bearer ' + token};

    $.ajax({
        async: false,
        dataType: 'text',
        error: function() {
            // Error handling here
        },
        headers: headers,
        success: function(response, textStatus, jqxhr) {
            console.log(response);
//            if (callback && typeof callback === 'function') {
//                args = {
//                    response: response
//                };

//                callback.call(undefined, args);
//            }
        },
        url: url
    });

}

function checkInstance(instance) {

    if (instance) {
        $('#instance').val(instance);
    }

}

function checkToken(token) {

    if (token) {
        $('#token').val(token);
    } else {
        $('#token').attr('placeholder', 'Enter your Canvas API Token');
    }

}

function getCourseDetails(course) {

    var date = new Date();
    var url = 'https://' + instance + '/api/v1/courses/' + course.canvas_course_id + '?include[]=syllabus_body&include[]=total_students';

    canvasApiRequest(url, function(args) {
        console.log(args);
    });

}

function processCsv() {

    csvIn.forEach(function(item, i) {
        if (item.canvas_course_id) {
            var timeout = setTimeout(function() {
                getCourseDetails(item);
            }, i * 100);
        }

    });

}

function resetForm() {

    $('#data')[0].reset();
    csvIn = null;

}

$(document).ready(function() {

    // Reset form on load
    $('#data')[0].reset();

    // Check instance on page load
    checkInstance(instance);

    // Check token on page load
    checkToken(token);

    // Token field
    if (token) {
        $('#token').val(token);
    } else {
        $('#token').attr('placeholder', 'Paste your Canvas API Token here');
    }

    // Canvas provisioning report
    $('#csv').on('change', function(e) {

        var file = e.target.files[0];
        var reader = new FileReader();

        reader.onload = function(e) {
            Papa.parse(e.target.result, {
                header: true,
                complete: function(results) {
                    courses.push(results.data);
                    csvIn = results.data;
                }
            });
        };

        reader.readAsText(file, 'UTF-8');

    });

    // Form submission
    $('#data').submit(function(e) {
        e.preventDefault();

        // Check instance and alert if not provided
        if ($(this).find('#instance').val().length === 0) {
            alert('You must enter a Canvas instance to proceed.');
            return false;
        }

        // Check token and alert if not provided
        if ($(this).find('#token').val().length === 0) {
            alert('You must enter a Canvas API token to proceed.');
            return false;
        }

        // Instance provided but not stored locally
        if (!instance) {
            window.localStorage.setItem('instance', $(this).find('#instance').val());
        }

        // Token provided but not stored locally
        if (!token) {
            window.localStorage.setItem('token', $(this).find('#token').val());
        }

        processCsv();

    });

    // Form cancellation
    $('#data').on('click', '#cancel', function(e) {
        e.preventDefault();

        resetForm();
    });

});