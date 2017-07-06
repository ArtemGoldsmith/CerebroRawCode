// Module Points Block
module.exports = function pointsBlock() {

  $('.cd-product').addClass('is-product-tour').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
    $('.cd-close-product-tour').addClass('is-visible');
    $('.cd-points-container').addClass('points-enlarged').one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function() {
      $(this).addClass('points-pulsing');
    });
  });

  $('.cd-single-point').children('a').on({
    mouseenter: function() {
      var selectedPoint = $(this).parent('li');
      if ( selectedPoint.hasClass('is-open') ) {
        selectedPoint.removeClass('is-open').css('z-index', 1);
      } else {
        selectedPoint.addClass('is-open').css('z-index', 9999).siblings('.cd-single-point.is-open').removeClass('is-open').css('z-index', 1);
      }
    },
    mouseleave: function(event) {
      event.preventDefault();
      $(this).parents('.cd-single-point').eq(0).removeClass('is-open').css('z-index', 1);
    }
  });

  $('.ie9 .cd-single-point, .ie10 .cd-single-point').children('i').on('click', function() {
    var selectedPoint = $(this).parent('li');
    if ( selectedPoint.hasClass('is-open') ) {
      selectedPoint.removeClass('is-open').css('z-index', 1);
    } else {
      selectedPoint.addClass('is-open').css('z-index', 9999).siblings('.cd-single-point.is-open').removeClass('is-open').css('z-index', 1);
    }
  });

};