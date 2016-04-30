'use strict';

var PUBLIC_KEY = 'dc6zaTOxFJmzC';
var BASE_URL = 'http://api.giphy.com/v1/gifs/';
var ENDPOINT = 'search';
var PARAMETERS = {
  'LIMIT' : 1,
  'RATING' : 'pg'
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
  offset: 0,
  request: function request() {
    var parameters = ''
    for (var key in PARAMETERS) {
      parameters += '&' + key + '=' + PARAMETERS[key];
    }
    return '' + BASE_URL + ENDPOINT + '?q=' + this.text + parameters + '&offset=' + this.offset + '&api_key=' + PUBLIC_KEY;
  },
};

var ajaxCall = function fetch(query, callback) {
  console.log(query, callback);
  console.log('hello');
  $.getJSON(query.request()).success(function (data) {
    var results = data.data;
    if (results.length) {
      var url = results[0].images.downsized.url;
      console.log(url);
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
  query.offset = Math.floor(Math.random() * 25);

  ajaxCall(query, function(url) {
    if (url.length) {
      $resultWrapper.html(buildImg(url));

      $button.addClass('active');
    } else {
      $resultWrapper.html('<p class="no-results hidden">No Results found for <strong>' + query.text + '</strong></p>');

      $button.removeClass('active');
    }
    currentTimeout = setTimeout(function () {
      $('.hidden').toggleClass('hidden');
    }, 1000);
  });
});

var searchForGif = function (url) {
  query.text = $queryInput.val();
  query.offset = Math.floor(Math.random() * 25);
  $searchbutton.addClass('active');
  if (currentTimeout) {
    clearTimeout(currentTimeout);
  }
  ajaxCall(query, function(url) {
    console.log('u', url);
    if (url.length) {
      $resultWrapper.html(buildImg(url));
      $button.addClass('active');
    } else {
      $resultWrapper.html('<p class="no-results hidden">No Results found for <strong>' + query.text + '</strong></p>');

      $button.removeClass('active');
    }
    currentTimeout = setTimeout(function () {
      $('.hidden').toggleClass('hidden');
    }, 1000);
  });

  $('img').removeClass('imgexpand');
  $('img').addClass('imgshrunk');
  currentTimeout = setTimeout(function () {
    currentTimeout = null;
    $('.gif').addClass('hidden');

    if (query.text && query.text.length) {
      $inputWrapper.addClass('active').removeClass('empty');
      ajaxCall(query, function(url) {
        if (url.length) {
          $resultWrapper.html(buildImg(url));

          $button.addClass('active');
        } else {
          $resultWrapper.html('<p class="no-results hidden">No Results found for <strong>' + query.text + '</strong></p>');

          $button.removeClass('active');
        }
        currentTimeout = setTimeout(function () {
          $('.hidden').toggleClass('hidden');
        }, 1000);
      });
    } else {
      $inputWrapper.removeClass('active').addClass('empty');
      $button.removeClass('active');
    }
  }, 1000);
};
window.onkeypress = function (e) {
  if (e.keyCode == 13) {
    searchForGif();
  }
}

var whatKeyAmI = function (e) {
  console.log(e.keyCode);
}

$searchbutton.on('click', searchForGif());
