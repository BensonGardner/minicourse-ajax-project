
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');
    
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

    return false;
}

$('#form-container').submit(loadData);
