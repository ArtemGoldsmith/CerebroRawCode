// Module Set Random Class
module.exports = function setRandomClass() {
  var gallery = $('#blog-gallery');
  var items = gallery.find('.blog-info');
  var number = items.length;
  var random1 = Math.floor((Math.random() * number));
  var random2 = Math.floor((Math.random() * number));
  var random3 = Math.floor((Math.random() * number));
  var random4 = Math.floor((Math.random() * number));
  items.removeClass('random');
  items.eq(random1).addClass('random');
  items.eq(random2).addClass('random');
  items.eq(random3).addClass('random');
  items.eq(random4).addClass('random');
};