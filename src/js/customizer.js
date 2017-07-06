// Module Customizer
module.exports = function() {
  $('#custom-block .dropdown button').on('click', function() {
    $(this).siblings('.dropdown-menu').slideToggle(200);
    if ( $(this).parent().hasClass('dropdown') ) {
      $(this).children('i').toggleClass('rotated');
    }
  });

  $('#custom-toggle').on('click', function() {
    $('#custom-block').toggleClass('open');
  });

  $('input[name="navbar"]').change(function() {
    if ( $('#fixed').is(':checked') ) {
      $('header').removeClass('scrolled-menu');
      $('header .navbar-header').removeClass('pos-abs').addClass('pos-fixed');
    } else if ( $('#scroll').is(':checked') ) {
      $('header').addClass('scrolled-menu');
      $('header .navbar-header').removeClass('pos-fixed').addClass('pos-abs');
    }
  });

  var pageName, sectionClass, sectionNumber, styleNumber;

  /* Customizer with input fields */

  $('.section input[type="radio"]').change(function() {
    pageName = $('body').attr('class');
    sectionClass = $(this).parent().parent().attr('class');
    sectionNumber = parseInt(sectionClass.match(/[0-9]+/)[0], 10);
    styleNumber = $(this).parent().children('input').index($(this)) + 1;

    $('.section-block.section' + sectionNumber)
      .hide()
      .find('.switchable')
      .removeClass(function(index, className) {
        return (className.match(/\bstyle\S+/g) || []).join(' ');
      })
      .addClass('style' + styleNumber)
      .load('custom-parts/' + pageName + '-section' + sectionNumber + '-style' + styleNumber + '.html');

    $('.section-block.section' + sectionNumber)
      .fadeIn(500);
    // console.log('custom-parts/' + pageName + '-section' + sectionNumber + '-style' + styleNumber + '.html')
  });

  /* End customizer with input fields */

  /* Customizer with select fields */
  $('#customize .section select').change(function() {
    pageName = $('body').attr('class');
    sectionClass = $(this).parent().parent().parent().attr('class');
    sectionNumber = parseInt(sectionClass.match(/[0-9]+/)[0], 10);
    styleNumber = $(this).find(':selected').attr('value');

    $('.section-block.section' + sectionNumber)
      .hide()
      .find('.switchable')
      .removeClass(function(index, className) {
        return (className.match(/\bstyle\S+/g) || []).join(' ');
      })
      .addClass('style' + styleNumber)
      .load('custom-parts/' + pageName + '-section' + sectionNumber + '-style' + styleNumber + '.html');

    $('.section-block.section' + sectionNumber)
      .fadeIn(500);
    // console.log('custom-parts/' + pageName + '-section' + sectionNumber + '-style' + styleNumber + '.html')
  });
};
/* End customizer with select fields */
