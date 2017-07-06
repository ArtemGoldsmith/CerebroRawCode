// Module News Slider
module.exports = function newsSlider(sliderId) {
  $(sliderId).owlCarousel({

    loop: true,
    navigation: true,
    navigationText: [
      "Previous page",
      "Next page"
    ],
    pagination: true,
    itemsCustom: [
      [0, 1],
      [480, 2],
      [768, 2],
      [991, 4],
      [1280, 4],
      [1281, 6]
    ],
    singleItem: false,
    afterAction: function() {
      if ( ($(window).width() > 991) && ($(window).width() <= 1280 ) ) {

        //remove class active
        this
          .$owlItems
          .removeClass('active');

        //add class active
        this
          .$owlItems
          .eq(this.currentItem + 1)
          .addClass('active');
        this.$owlItems
          .eq(this.currentItem + 2)
          .addClass('active');

      } else if ( $(window).width() < 991 ) {

        //remove class active
        this
          .$owlItems
          .removeClass('active');

        //add class active
        this
          .$owlItems
          .eq(this.currentItem)
          .addClass('active');
        this.$owlItems
          .eq(this.currentItem + 1)
          .addClass('active');

      } else {

        //remove class active
        this
          .$owlItems
          .removeClass('active');
        this
          .$owlItems
          .removeClass('unactive');

        //add class active
        this
          .$owlItems
          .eq(this.currentItem + 2)
          .addClass('active');
        this.$owlItems
          .eq(this.currentItem + 3)
          .addClass('active');
        //add class unactive
        this
          .$owlItems
          .eq(this.currentItem)
          .addClass('unactive');
        this
          .$owlItems
          .eq(this.currentItem + 5)
          .addClass('unactive');
      }
    }

  });
};