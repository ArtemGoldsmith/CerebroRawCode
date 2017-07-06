// Module Isotope Gallery
module.exports = function isotopeGallery() {

  // init Isotope
  var $grid = $('#blog-gallery').isotope({
    layoutMode: 'masonry',
    itemSelector: '.blog-info'
  });

  // filter functions
  var filterFns = {};

  // bind filter button click
  $('.bottom-navigation .filter').on('click', 'a', function() {

    var filterValue = $(this).attr('data-filter');
    // use filterFn if matches value
    filterValue = filterFns[filterValue] || filterValue;
    $grid.isotope({ filter: filterValue });

  });

  // change is-checked class on buttons
  $('.bottom-navigation .filter').each(function(i, buttonGroup) {
    var $buttonGroup = $(buttonGroup);
    $buttonGroup.on('click', 'button', function() {
      $buttonGroup.find('.is-checked').removeClass('is-checked');
      $(this).addClass('is-checked');
    });
  });
};