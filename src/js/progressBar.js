// Module Progress Bar
module.exports = function progressBar() {

  setTimeout(function() {
    $('.progress-bar-list .progress-line').each(function() {
      var widthLine = $(this).attr('data-progress');
      $(this).animate({
        'width': widthLine + '%'
      }, 1500);
    });
  }, 500);

};