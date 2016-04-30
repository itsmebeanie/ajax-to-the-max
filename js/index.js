'use strict';

/*
API documentation for GIPHY can be found
https://github.com/Giphy/GiphyAPI

Example Request URL
http://api.giphy.com/v1/gifs/search?q=funny+cat&api_key=dc6zaTOxFJmzC
*/

// Most APIs require some API key in order to access the endpoint
var PUBLIC_KEY = 'dc6zaTOxFJmzC';

//you have a base_url path to access the Giphy API
var BASE_URL = 'http://api.giphy.com/v1/gifs/';

//Public APIs can have multiple endpoints for different uses,
//here we are specifically using the Search API from GIPHY
var ENDPOINT = 'search';

//Given that endpoint, there are parameters that
//you provide in order for the 'desired' data to be returned
var PARAMETERS = {
  'limit' : 1,
  'rating' : 'pg',
  'offset' : 1,
  'api_key' : PUBLIC_KEY
}

// this object variable is a bit more complex than the traditional VARIABLE_NAME = VALUE
// here, "query" has "properties" of text and request
var query = {
  // the text property can be accessed as query.text and can be assigned a value as query.text = VALUE
  text: null,
  // the request property is a function specific to the query variable
  buildRequestURL: function buildRequestURL() {
    var parameters = '';
    // build the parameter string by iterating through each key value pair
    for (var key in PARAMETERS) {
      parameters += '&' + key + '=' + PARAMETERS[key];
    }
    // here, "this" refers to the query variable itself. you can access other properties of it
    // within another property, as the request function calls on the text property of query
    return '' + BASE_URL + ENDPOINT + '?q=' + this.text + parameters;
  },
};

/**
 * ajaxCall - makes an ajax call to the Giphy API
 * @param {object} query
 * @param {function} callback
 * @return {string} url
 */
 var ajaxCall = function fetch(query, callback) {
  $.getJSON(query.buildRequestURL()).success(function (data) {
    var results = data.data;
    if (results.length) {
      var url = results[0].images.downsized.url;
      callback(url);
    } else {
      callback('');
    }
  }).fail(function (error) {
    console.log(error);
    return '';
  });
}

/**
 * buildImg() - if giphy finds a matching gif, build the html to insert onto the page
 * @return {html} img
 */
 function buildImg() {
  var src = arguments.length <= 0 || arguments[0] === undefined ? '//giphy.com/embed/xv3WUrBxWkUPC' : arguments[0];
  var classes = arguments.length <= 1 || arguments[1] === undefined ? 'gif hidden' : arguments[1];
  return '<img src="' + src + '" class="' + classes + '" alt="gif" />';
}

/**
 * searchForGif - if giphy finds a matching gif, build the html to insert onto the page
 * @param {object} query
 * @return {html} img
 */
function searchForGif(url) {
  // grab the text using a jQuery selector, and assign the value to the query.text property
  query.text = $('.query').val();

  // for the offset, grab a random number between 1 and 25
  PARAMETERS['offset'] = Math.floor(Math.random() * 25);
  $('.search').addClass('active');

  // if an actual query has been entered, make the ajax call to GIPHY API!
  if (query.text) {
    ajaxCall(query, function(url) {
      showGif(url);
    });
  }
};

/**
 * showGif - if giphy finds a matching gif, build the html to insert onto the page
 * @param {string} url
 */
function showGif(url) {
  //check if you got a url result back!
  if (url.length) {
    $('.result').html(buildImg(url));

    //some css magic to show off your gif
    $('.hidden').toggleClass('hidden');
    $('.random').addClass('active');
    $('img').removeClass('imgexpand');
    $('img').addClass('imgshrunk');
  } else {
    // no results :( - gotta break the bad news
    $('.result').html('<p class="no-results hidden">Sorry! No Results found for <strong>' + query.text + '</strong></p>');
    $('.hidden').toggleClass('hidden');
    $('.random').removeClass('active');
  }
}

/**
 * whatKeyAmI - simple helper function to demonstrate an event listener to
 * determine the keycodes for each key pressed (in event 'e')
 * @param {string} url
 */
function whatKeyAmI(e) {
  console.log(e.keyCode);
}

// event listener functions
$('.clear').on('click', function (e) {
  $('.query').val('');
  $('.input-wrapper').removeClass('active').addClass('empty');
  $('.gif').addClass('hidden');
  $('.random').removeClass('active');
});

$('.random').on('click', function (e) {
  PARAMETERS['offset'] = Math.floor(Math.random() * 25);
  ajaxCall(query, function(url) {
    showGif(url);
  });
});

$('.search').on('click', searchForGif());
window.onkeypress = function (e) {
  if (e.keyCode == 13) {
    searchForGif();
  }
}
