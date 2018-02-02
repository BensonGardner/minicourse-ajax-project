
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');

    // callback function to pass to Wikipedia via JSONP
    var cb = function(response) {
        console.log(response);
        data.titles.forEach(function(article) {
            $wikiElem.append('<li class="article"><a href="' + data.query.pages.title + '">' + data.query.pages.title + '</a></li>');
        });
    };
    
    // clear out old data before new request
    $wikiElem.text('');
    $nytElem.text('');
    
    //define location
    var location = street.value + ',' + city.value;

    $greeting.text('Ahhh.You want to live at ' + location + ', do you?');

    // load streetview    
    var screensize = window.screen.width + "x" + window.screen.height;   
    var streetviewPic = '<img class="bgimg" src="https://maps.googleapis.com/maps/api/streetview?size=' + screensize + '&location=' + location + '&key=AIzaSyBgc50Xz6iyvL7p7T9cFTrzWW0N0MFTpdw">';
    $body.append(streetviewPic);
   
    $.getJSON('http://api.nytimes.com/svc/search/v2/articlesearch.json', {
        'api-key' : 'c1b441f0bb5844edbd466502406ae508',
        'q' : city.value
    }, function(data){
        $nytHeaderElem.text('New York Times Articles about ' + city.value);
        data.response.docs.forEach(function(article) {
             $('.article-list').append('<li class="article"><a href="' + article.web_url + '">' + article.headline.main + '</a><p>"' + article.snippet + '"</p></li>');
        });
    }).fail(function() {
        $nytHeaderElem.text('New York Times Articles Could Not Be Loaded.');
            });
    
    // JQuery's documentation at 
    //   http://api.jquery.com/jquery.ajax/ 
    // explains that the success function is passed 
    // these 3 arguments.
    var wikiLoad = function(wikiData, status, xhrObject) {
        console.log(wikiData);
        console.log(status);
        console.log(xhrObject);
      
        // data is returning the nyt data
        
        for (i = 0; i < wikiData.length; i++) {
            $wikiElem.append('<li class="article"><a href="' + wikiData[3][i] + '">' + wikiData[1][i] + '</a><p>"' + wikiData[2][i] + '"</p></li>');    
            console.log(wikiData + ' is king. So is ' + wikiData[1][i]);    
        }; 
    };

    $.ajax({
        url: 'https://en.wikipedia.org/w/api.php',
        dataType: 'jsonp',
        type: 'GET',
        data: {
            action: 'opensearch',
            search: city.value,
            format : 'json',
            // don't think we need this
            // callback : 'function(response) {console.log(response)';},
           // titles : city.value,
        },
        success : wikiLoad
        //success : 'function(response, status, object) {console.log(response)}'
    }).fail(function() {
        // we don't have a wiki header element right now, but 
        // I'm guessing we will implement error handling with 
        // a similar message
        console.log('problem, sir');
    });
    
    return false;
};

$('#form-container').submit(loadData);
