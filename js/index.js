'use strict';

var PUBLIC_KEY = 'dc6zaTOxFJmzC';
var BASE_URL = 'http://api.giphy.com/v1/gifs/';
var ENDPOINT = 'search';
var PARAMETERS = {
  'limit' : 1,
  'ratin' : 'pg',
  'offset' : 1,
  'api_key' : PUBLIC_KEY
}

var $searchbutton = $('.search');
var $queryInput = $('.query');
var $resultWrapper = $('.result');
var $inputWrapper = $('.input-wrapper');
var $clear = $('.clear');
var $button = $('.random');
var currentTimeout = undefined;

var query = {
  text: null,
  request: function request() {
    var parameters = ''
    for (var key in PARAMETERS) {
      parameters += '&' + key + '=' + PARAMETERS[key];
    }
    return '' + BASE_URL + ENDPOINT + '?q=' + this.text + parameters;
  },
};

var ajaxCall = function fetch(query, callback) {
  $.getJSON(query.request()).success(function (data) {
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

function buildImg() {
  var src = arguments.length <= 0 || arguments[0] === undefined ? '//giphy.com/embed/xv3WUrBxWkUPC' : arguments[0];
  var classes = arguments.length <= 1 || arguments[1] === undefined ? 'gif hidden' : arguments[1];
  return '<img src="' + src + '" class="' + classes + '" alt="gif" />';
}


$clear.on('click', function (e) {
  $queryInput.val('');
  $inputWrapper.removeClass('active').addClass('empty');
  $('.gif').addClass('hidden');
  $button.removeClass('active');
});

$button.on('click', function (e) {
  PARAMETERS['offset'] = Math.floor(Math.random() * 25);
  ajaxCall(query, function(url) {
    showGif(url);
  });
});

var searchForGif = function (url) {
  query.text = $queryInput.val();
  PARAMETERS['offset'] = Math.floor(Math.random() * 25);
  $searchbutton.addClass('active');
  if (query.text) {
    ajaxCall(query, function(url) {
      showGif(url);
    });
  }
};

var showGif = function(url) {
  if (url.length) {
    $resultWrapper.html(buildImg(url));
    $('.hidden').toggleClass('hidden');
    $button.addClass('active');
    $('img').removeClass('imgexpand');
    $('img').addClass('imgshrunk');
  } else {
    $resultWrapper.html('<p class="no-results hidden">Sorry! No Results found for <strong>' + query.text + '</strong></p>');
    $('.hidden').toggleClass('hidden');
    $button.removeClass('active');
  }
}

$searchbutton.on('click', searchForGif());
window.onkeypress = function (e) {
  if (e.keyCode == 13) {
    searchForGif();
  }
}

var whatKeyAmI = function (e) {
  console.log(e.keyCode);
}
