// Module Banner Slider
module.exports = function bannerSlider(sliderId) {

  function arrowThumb() {
    var prev = sliderId + ' .owl-prev';
    var next = sliderId + ' .owl-next';
    var active = $(sliderId + ' .owl-item.active');
    var activePrev = $(sliderId + ' .owl-item.active').prev('.owl-item').children('.item').children('img');
    var activeNext = $(sliderId + ' .owl-item.active').next('.owl-item').children('.item').children('img');
    var activeFirst = $(sliderId + ' .owl-item:first-child').children('.item').children('img');
    var activeLast = $(sliderId + ' .owl-item:last-child').children('.item').children('img');

    $(sliderId + '.owl-next img, ' + sliderId + ' .owl-prev img').remove();
    if ( active.is(':first-child') ) {

      activeNext.clone().appendTo(next).addClass('thumb');
      activeLast.clone().appendTo(prev).addClass('thumb');

    } else if ( active.is(':last-child') ) {

      activeFirst.clone().appendTo(next).addClass('thumb');
      activePrev.clone().appendTo(prev).addClass('thumb');

    } else {

      activeNext.clone().appendTo(next).addClass('thumb');
      activePrev.clone().appendTo(prev).addClass('thumb');

    }
  }

  $(sliderId).owlCarousel({
    navigation: true,
    navigationText: [
      "<i class=\"fa fa-chevron-left\" aria-hidden=\"true\"></i>",
      "<i class=\"fa fa-chevron-right\" aria-hidden=\"true\"></i>"
    ],
    slideSpeed: 300,
    paginationSpeed: 400,
    singleItem: true,
    pagination: true,
    rewindSpeed: 500,
    thumbs: true,
    thumbsPrerendered: true,
    afterInit: arrowThumb,
    afterAction: function() {
      //remove class active
      this
        .$owlItems
        .removeClass('active');

      //add class active
      this
        .$owlItems //owl internal $ object containing items
        .eq(this.currentItem)
        .addClass('active');
      arrowThumb();

    }
  });

};