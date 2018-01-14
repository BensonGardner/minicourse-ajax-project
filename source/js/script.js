
function loadData() {

    var $body = $('body');
    var $wikiElem = $('#wikipedia-links');
    var $nytHeaderElem = $('#nytimes-header');
    var $nytElem = $('#nytimes-articles');
    var $greeting = $('#greeting');
    
    // clear out old data before new request
    $wikiElem.text("");
    $nytElem.text("");

    // load streetview
    var screensize = window.screen.width + "x" + window.screen.height;
    console.log(screensize);    
    var location = street.value + "," + city.value;
    var streetviewPic = "<img class='bgimg' src='https://maps.googleapis.com/maps/api/streetview?size=" + screensize + "&location=" + location + "&key=AIzaSyBgc50Xz6iyvL7p7T9cFTrzWW0N0MFTpdw'>";
    $body.append(streetviewPic);
    console.log(streetviewPic);
    return false;
}

$('#form-container').submit(loadData);
