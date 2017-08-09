// CAR -- Canvas API Request
// A few reusable functions for getting data from the Canvas API

var car = {};

car.request = function (url, callback) {

    var args;
    var isComplete = false;
    var next = null;
    var options = {
        url: url,
        headers: {
            'Authorization': 'Bearer ' + canvas.token
        }
    };

    $.ajax({
        dataType: 'json',
        headers: options.headers,
        success: function(response, status, jqxhr) {

            if (jqxhr.status === 200) {
                next = car.nextLink(jqxhr.getResponseHeader('link'));

                if (next !== null && !/page_views/.test(options.url)) {
                    car.request(next, callback);
                } else {
                    isComplete = true;
                }

                if (callback && typeof callback === 'function') {
                    args = {
                        body: response,
                        isComplete: isComplete
                    };

                    callback.call(undefined, args);
                }

            } else if (jqxhr.status === 403) {
                alert("API throttling may be occurring.");
            }
        },
        type: 'GET',
        url: options.url
    });

}

car.nextLink = function (links) {

    var expr = /https:\/\/[A-Za-z0-9]*\.[-A-Za-z0-9:%_\+~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-A-Za-z0-9:%_\+.~#?&//=]*)?/gi;
    var current;
    var last;
    var next;
    var regex = new RegExp(expr);
    var url;

    if (typeof links === 'string') {
        links = links.split(/,/g);
    }

    next = _.filter(links, function(link) { return /rel="next"/.test(link); });
    last = _.filter(links, function(link) { return /rel="last"/.test(link); });
    current = _.filter(links, function(link) { return /rel="current"/.test(link); });

    if (next.length > 0) {
        return next[0].match(regex)[0];
    } else {
        return null;
    }

}
