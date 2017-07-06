// Module Directional Hover
module.exports = function directionalHover(element) {

  $(element).each(function() {
    $(this).hoverdir();
  });

};