// Module Minified Header
module.exports = function() {

  $(window).scroll(function() {
    if ( $(this).scrollTop() > 30 ) {

      $('header').addClass('minified');

    } else if ( $(this).scrollTop() < 30 ) {

      $('header').removeClass('minified');

    }
  });
};