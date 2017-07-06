// Module Zoom Image
module.exports = function(zoomImage) {

  $(zoomImage).parent().css({

    'overflow': 'hidden',
    'display': 'block',
    'position': 'relative',
    'z-index': '1'

  });

  $(zoomImage).next('a').hover(function() {

    $(this).prev(zoomImage).addClass('zoomed');

  }, function() {

    $(this).prev(zoomImage).removeClass('zoomed');

  });

};