var key = "2PACX-1vTO4-HXwSYyXQGGy5rQrytE0sxuf2u8pjGHa8117SO0vkopu0tjs3elNaBVQ6CINVq-ard2-oq25pHe";
var sheet_url = "https://spreadsheets.google.com/feeds/list/" + key + "/od6/public/values?alt=json-in-script&callback=x"

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
    
    gsheets.getWorksheet(key).then(function(data) {
      console.log(data);
  });
    
});


var firstSheet = () => {
  var spreadsheetID = key;
  var url = "https://spreadsheets.google.com/feeds/list/" + spreadsheetID +"/1/public/values?alt=json";
  return new Promise((resolve,reject)=>{
    $.getJSON(url, (data)=>{
        let result = data.feed.entry
        resolve(result)
   });
  })
}

firstSheet().then(data => {
  console.log(data)
})
