
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
        console.log(data);
        $nytHeaderElem.text('New York Times Articles about ' + city.value);
        data.response.docs.forEach(function(article) {
            console.log(article.headline.main);
            console.log(article.snippet);
            $('.article-list').append('<li class="article"><a href="' + article.web_url + '">' + article.headline.main + '</a><p>"' + article.snippet + '"</p></li>');
        });
    }).fail(function() {
        $nytHeaderElem.text('New York Times Articles Could Not Be Loaded.');
            });
    
    // JQuery's documentation at 
    //   http://api.jquery.com/jquery.ajax/ 
    // explains that the success function is passed 
    // these 3 arguments.
    var wikiLoad = function(data, status, xhrObject) {
        console.log(data);
        console.log(status);
        console.log(xhrObject);
        // I'm going to try to search in some way other than by title, then plug in the list of titles and URLs.
    }
    
    /* alternate approach to using the API - but this URL method doesn't allow the origin: '*' workaround
        var wikiUrl = 'https://en.wikipedia.org/w/api.php?action=query&titles=' + city.value + '&format=json';
    */

    $.ajax({
        url: 'https://en.wikipedia.org/w/api.php',
        // I experimented with setting the datatype to 'script' and 'text'
        // but to no avail
        dataType : 'jsonp',
        type: 'GET',
        data : {
            action : 'query',
            format : 'json',
            // Something I found on stackoverflow 
            // said to set the origin parameter 
            // to an asterisk. 
            // This eliminates the console error, and 
            // DevTools reveals a response has arrived,
            // but we aren't supposed to need it with jsonp.
            // origin : '*',
            // Shouldn't need this since we're using the success parameter
            // callback : 'function(response) {console.log(response)';},
            titles : city.value,
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
