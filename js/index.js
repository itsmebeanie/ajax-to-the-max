'use strict';

var PUBLIC_KEY = 'dc6zaTOxFJmzC';
var BASE_URL = 'http://api.giphy.com/v1/gifs/';
var ENDPOINT = 'search';
var LIMIT = 1;
var RATING = 'pg';

var $searchbutton = $('.search');
var $queryInput = $('.query');
var $resultWrapper = $('.result');
var $loader = $('.loader');
var $inputWrapper = $('.input-wrapper');
var $clear = $('.clear');
var $button = $('.random');
var currentTimeout = undefined;

var query = {
  text: null,
  offset: 0,
  request: function request() {
    return '' + BASE_URL + ENDPOINT + '?q=' + this.text + '&limit=' + LIMIT + '&rating=' + RATING + '&offset=' + this.offset + '&api_key=' + PUBLIC_KEY;
  },
  fetch: function fetch(callback) {
    $.getJSON(this.request()).success(function (data) {
      var results = data.data;

      if (results.length) {
        var url = results[0].images.downsized.url;
        console.log(results);
        callback(url);
      } else {
        callback('');
      }
    }).fail(function (error) {
      console.log(error);
    });
  }
};

function buildImg() {
  var src = arguments.length <= 0 || arguments[0] === undefined ? '//giphy.com/embed/xv3WUrBxWkUPC' : arguments[0];
  var classes = arguments.length <= 1 || arguments[1] === undefined ? 'gif hidden' : arguments[1];

  return '<img src="' + src + '" class="' + classes + '" alt="gif" />';
}

$clear.on('click', function (e) {
  $queryInput.val('');
  $inputWrapper.removeClass('active').addClass('empty');
  $('.gif').addClass('hidden');
  $loader.removeClass('done');
  $button.removeClass('active');
});

$button.on('click', function (e) {
  query.offset = Math.floor(Math.random() * 25);

  query.fetch(function (url) {
    if (url.length) {
      $resultWrapper.html(buildImg(url));

      $button.addClass('active');
    } else {
      $resultWrapper.html('<p class="no-results hidden">No Results found for <strong>' + query.text + '</strong></p>');

      $button.removeClass('active');
    }

    $loader.addClass('done');
    currentTimeout = setTimeout(function () {
      $('.hidden').toggleClass('hidden');
    }, 1000);
  });
});

$searchbutton.on('click', function () {
  query.text = $queryInput.val();
  query.offset = Math.floor(Math.random() * 25);
  $searchbutton.addClass('active');
  if (currentTimeout) {
    clearTimeout(currentTimeout);
    $loader.removeClass('done');
  }
  $('img').removeClass('imgexpand');
  $('img').addClass('imgshrunk');
  currentTimeout = setTimeout(function () {
    currentTimeout = null;
    $('.gif').addClass('hidden');

    if (query.text && query.text.length) {
      $inputWrapper.addClass('active').removeClass('empty');

      query.fetch(function (url) {
        if (url.length) {
          $resultWrapper.html(buildImg(url));

          $button.addClass('active');
        } else {
          $resultWrapper.html('<p class="no-results hidden">No Results found for <strong>' + query.text + '</strong></p>');

          $button.removeClass('active');
        }

        $loader.addClass('done');
        currentTimeout = setTimeout(function () {
          $('.hidden').toggleClass('hidden');
        }, 1000);
      });
    } else {
      $inputWrapper.removeClass('active').addClass('empty');
      $button.removeClass('active');
    }
  }, 1000);
});
