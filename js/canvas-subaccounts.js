var accountCodes = {
    'AC': 'HSPS_NURS',
    'AE': 'HSPS_HLTH',
    'AF': 'HSPS_EMS',
    'BA': 'ALR_ART',
    'BB': 'ALR_MUSC',
    'BC': 'ALR_PHOTO',
    'BG': 'ALR_GRAPH',
    'BJ': 'ALR_JOURN',
    'CA': 'BAT_ACCT',
    'CB': 'BAT_IT',
    'CC': 'BAT_ECON',
    'CD': 'BAT_BUS',
    'CM': 'HSPS_MC',
    'CT': 'HSPS_MTE',
    'DB': 'CSS_ENGL',
    'DC': 'CSS_WLANG',
    'DE': 'CSS_HUM',
    'DJ': 'CSS_ENGL',
    'DK': 'CSS_CMST',
    'EA': 'TS_HDEV',
    'FB': 'HSPS_PEHW',
    'GA': 'MS_BIOL',
    'GB': 'MS_CS',
    'GC': 'MS_CHEM',
    'GD': 'MS_ENGR',
    'GE': 'AAM_ENGT',
    'GH': 'MS_ENVS',
    'GI': 'MS_NUTR',
    'GJ': 'MS_NATS',
    'GK': 'MS_GEOL',
    'GM': 'MS_MATH',
    'GO': 'MS_OCEAT',
    'GP': 'MS_PHYS',
    'GT': 'AAM_MFGT',
    'GU': 'AAM_CT',
    'GV': 'AAM_MFGT',
    'HA': 'CSS_ANTH',
    'HB': 'CSS_GEOG',
    'HC': 'CSS_HIST',
    'HD': 'CSS_PHIL',
    'HE': 'CSS_POLS',
    'HF': 'CSS_PSYC',
    'HH': 'CSS_SOC',
    'HJ': 'CSS_GS',
    'HM': 'CSS_EDUC',
    'HP': 'HSPS_CJ',
    'HU': 'CSS_ECE',
    'IC': 'AAM_AMT',
    'IH': 'AAM_WELD',
    'JA': 'TS_COLL',
    'JB': 'TS_DEVED',
    'LY': 'MISC',
    'ME': 'TS_ESL',
    'MF': 'TS_WFT',
    'NE': 'TS_AEP',
    'OC': 'MISC',
    'PC': 'HSPS_FIRE',
    'RS': 'CCEC',
    'RZ': 'CCEC',
    'SA': 'AAM_APM',
    'TS': 'TS_TS',
    'TZ': 'MISC',
    'VA': 'BAT_COSMT'
};

var csvIn = {
    hp: null,
    provision: null
};

var csvOut = [];

var errors = [];

$(document).ready(function() {
    
    $("#progress").progress({
        percent: 0,
        text: {
            active: '{value} of {total} Steps Completed',
            success: 'All Steps Completed!'
        }
    });
        
    $("#data")[0].reset();
    
    $('#cancel').on('click', function(e) {
        
        csvIn.hp = null;
        csvIn.provision = null;
        
        resetProgress();
        
    });

    $('#hpcsv').on('change', function(e) {

        var file = e.target.files[0];
        var reader = new FileReader();
        
        reader.onload = function(e) {
            Papa.parse(e.target.result, {
                header: true,
                complete: function(results) {
                    console.log(results.data);
                    csvIn.hp = results.data;
                    $("#progress").progress('increment');
                }
            });
        };
        
        reader.readAsText(file, 'UTF-8');
        
    });
    
    $('#provisioncsv').on('change', function(e) {
        
        var file = e.target.files[0];
        var reader = new FileReader();
        
        reader.onload = function(e) {
            Papa.parse(e.target.result, {
                header: true,
                complete: function(results) {
                    console.log(results.data);
                    csvIn.provision = results.data;
                    $("#progress").progress('increment');
                }
            });
        };
        
        reader.readAsText(file, 'UTF-8');
        
    });
    
    $('#data').submit(function(e) {
        e.preventDefault();
        
        $(this).find('input, button').each(function() {
            $(this).attr('disabled', true);
        });
        
        generateCsv();
        
    });
    
    $('#preview').on('click', '#download-cancel', function(e) {
        
        e.preventDefault();
        
        $('form#data')[0].reset();
        $('form#data').find('input, button').each(function() {
            $(this).attr('disabled', false);
        });
        
        $('#preview').css('visibility', 'hidden');
        $('#preview').off('click', '#download-cancel');
        $('#preview-content, #error-content').empty();
        
        csvOut = [];
        errors = [];
        
        resetProgress();
        
    });
    
});

function resetProgress() {
    $("#progress").progress('reset').progress('set active');
}

function addDownloadButton() {
    
    var $th = $("#preview-content tfoot th");
    
    var data = Papa.unparse(csvOut);
    var blob = new Blob([data], {type: 'text/csv'});
    var url = URL.createObjectURL(blob);

    $th.prepend('<a id="download" class="ui right floated green button" href="' + url + '" download="sub-accounts.csv">Download CSV</a>');
    
}

function generateCsv() {
    
    var output = [];

    csvIn.provision.forEach(function(course) {
        var obj = {
            course_id: course.course_id,
            short_name: course.short_name,
            long_name: course.long_name,
            account_id: course.account_id,
            term_id: course.term_id,
            status: 'active',
            start_date: course.start_date,
            end_date: course.end_date,
            course_format: ''
        };
        
        if (course.canvas_course_id !== '') {
            obj.account_id = getAccountId(course.course_id, course.short_name);
            
            if (typeof obj.account_id !== 'undefined') {
                output.push(obj);
            } else {
                errors.push(obj);
            }

        }
    });
    
    csvOut = _.sortBy(output, 'short_name');
        
    $('#preview').css('visibility', 'visible');
    
    $("#progress").progress('increment');
    
    generateErrors();
    
    generatePreview();
    
}

function generateErrors() {
    
    var output = '';
    
    var errors_sorted = _.sortBy(errors, 'short_name');
    
    output += '<div class="ui red inverted segment"><h3 class="ui header">Unprocessed Courses</h3><p><strong>Sub-accounts for the following courses could not be determined. These courses may need to be moved manually to the correct sub-accounts.</strong></p><table class="ui small compact table"><thead><tr><th>Course</th><th>Course Name</th><th>Sub-Account</th></tr></thead><tbody>';
    
    errors_sorted.forEach(function(error) {
        
        output += '<tr><td>' + error.short_name + '</td><td>' + error.long_name + '</td><td>???</td></tr>';
        
    });
    
    output += '</tbody></table></div>';
    
    $("#preview #error-content").append(output);
    
}

function generatePreview() {
    
    var output = '';
    
    output += '<table class="ui small compact table"><thead><tr><th>Course</th><th>Course Name</th><th>Sub-Account</th></tr></thead><tbody>';
    
    csvOut.forEach(function(course) {
        
        output += '<tr><td>' + course.short_name + '</td><td>' + course.long_name + '</td><td>' + course.account_id + '</td></tr>';
        
    });
    
    output += '</tbody><tfoot><tr><th colspan="3"><a id="download-cancel" class="ui right floated gray button">Cancel</a></th></tr></tfoot></table>';
    
    $("#preview #preview-content").append(output);
    
    addDownloadButton();
    
}

function getAccountId(course_id, course_name) {
    
    var au;
    var itemNum = course_id.match(/[A-Z0-9]{4}$/);
    var output;
    
    if (itemNum !== null && itemNum.length > 0) {
        var hpItem = _.where(csvIn.hp, { 'CLASS-ITEM-NUM': itemNum[0] });
        
        if (hpItem.length > 0) {
            au = hpItem[0]['ADMIN-UNIT'];
        } else {
//            errors.push(_.where(csvIn.provision, { course_id: course_id } )[0]);
        }
        
    } else {
//        errors.push(_.where(csvIn.provision, { course_id: course_id } )[0]);
    }
    
    switch (au) {
        
        // Drama and Film
        case 'BD':
            if (/^FILM/.test(course_name)) {
                output = 'ALR_FILM';
            } else {
                output = 'ALR_DRMA';
            }
            break;
            
        case 'CG':
            if (/^BT/.test(course_name)) {
                output = 'BAT_BT';
            } else if (/^BUS/.test(course_name)) {
                output = 'BAT_BUS';
            } else {
                output = 'BAT_CL';
            }
            break;
            
        case 'MU':
            if (/^HSC/.test(course_name)) {
                output = 'TS_HSC';
            } else if (/^CL/.test(course_name)) {
                output = 'BAT_CL';
            } else if (/^WFT/.test(course_name)) {
                output = 'TS_WFT';
            }
            break;
            
        case 'MY':
            if (/^HSC/.test(course_name)) {
                output = 'TS_HSC';
            } else if (/^WFT/.test(course_name)) {
                output = 'TS_WFT';
            }
            break;
            
        default:
            output = accountCodes[au];
        
    }
    
    return output;
    
}
