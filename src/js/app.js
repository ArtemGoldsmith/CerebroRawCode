console.log('app.js has loaded!');

;(function($) {
  "use strict";

  // document ready functions
  $(document).ready(function() {

    minifiedHeader();
    zoomImage('.zoom-image');
    bannerSlider('#banner-slider');
    newsSlider('#news-slider');
    directionalHover('.partners .block');
    setRandomClass();
    compatibility();
    customizer();
    pagesList();

    $('#theme-custom-colors,' +
      ' #text-custom-colors,' +
      ' #buttons-custom-colors').val('');

    if ( $('#customizer').length !== 0 ) {
      colorPicker('colorBlockTheme', 'colorStripeTheme');
      colorPicker('colorBlockText', 'colorStripeText');
      colorPicker('colorBlockButtons', 'colorStripeButtons');
    }

    progressBar();

    pointsBlock();

  }); // end of document ready

  // window load functions
  $(window).on('load', function() {

    isotopeGallery();

  }); // end of window load

  // modules

  var minifiedHeader = require('./minifiedHeader');

  var zoomImage = require('./zoomImage');

  var newsSlider = require('./newsSlider');

  var bannerSlider = require('./bannerSlider');

  var directionalHover = require('./directionalHover');

  var progressBar = require('./progressBar');

  var isotopeGallery = require('./isotopeGallery');

  var setRandomClass = require('./setRandomClass');

  var colorPicker = require('./colorPicker');

  var pointsBlock = require('./pointsBlock');

  var compatibility = require('./compatibility');

  var customizer = require('./customizer');

  var pagesList = require('./pagesList');

  // common functions
  $(".home-page1 .section3 .switchable").bind("DOMSubtreeModified", function() {
    newsSlider('#news-slider');
  });

  // click functions
  function nextButtonFilter() {
    $('.filter li').removeClass('active');
    $(this).addClass('active');
  }

  function nextButtonPage() {
    $('.pagination li').removeClass('active');
    $(this).addClass('active');
  }

  function toggleOpenClass() {
    $(this).parent().toggleClass('open');
  }

  function scrollToGallery() {
    $('html, body').animate({
      scrollTop: $("#blog-gallery").offset().top - 80
    }, 1500);
  }

  // click calls
  $('.filter li').click(function() {
    nextButtonFilter();
    scrollToGallery();
  });
  $('.filter li .random').click(setRandomClass);
  $('.pagination li').click(nextButtonPage);
  $('#menu-button').click(toggleOpenClass);

})(jQuery);