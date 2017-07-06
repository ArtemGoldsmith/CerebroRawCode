module.exports = function() {
  $('#pages-list-open').on('click', function() {
    $('#pages-list-block').toggleClass('open');
    $('#pages-list-open').children().toggleClass('fa-folder-open-o', 'fa-folder-o');
  });
};