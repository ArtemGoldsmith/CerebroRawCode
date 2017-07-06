// Module Color Picker
module.exports = function colorPicker(colorBlockId, colorStripeId) {

  function shadeColor(hex, lum) {

    // validate hex string
    hex = String(hex).replace(/[^0-9a-f]/gi, '');
    if ( hex.length < 6 ) {
      hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
    }
    lum = lum || 0;

    // convert to decimal and change luminosity
    var rgb = "#", c, i;
    for ( i = 0; i < 3; i++ ) {
      c = parseInt(hex.substr(i * 2, 2), 16);
      c = Math.round(Math.min(Math.max(0, c + (c * lum)), 255)).toString(16);
      rgb += ("00" + c).substr(c.length);
    }

    return rgb;
  }

  function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  }

  function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
  }

  var colorBlock = document.getElementById(colorBlockId);
  var ctx1 = colorBlock.getContext('2d');
  var width1 = colorBlock.width;
  var height1 = colorBlock.height;

  var colorStripe = document.getElementById(colorStripeId);
  var ctx2 = colorStripe.getContext('2d');
  var width2 = colorStripe.width;
  var height2 = colorStripe.height;

  var x = 0;
  var y = 0;
  var drag = false;
  var rgbaColor = 'rgba(255, 0, 0, 1)';
  var rgbaColorTheme;
  var hexColor;

  ctx1.rect(0, 0, width1, height1);
  fillGradient();

  ctx2.rect(0, 0, width2, height2);
  var grd1 = ctx2.createLinearGradient(0, 0, 0, height1);
  grd1.addColorStop(0, 'rgba(255, 0, 0, 1)');
  grd1.addColorStop(0.16666667, 'rgba(255, 255, 0, 1)');
  grd1.addColorStop(0.33333334, 'rgba(0, 255, 0, 1)');
  grd1.addColorStop(0.50000001, 'rgba(0, 255, 255, 1)');
  grd1.addColorStop(0.66666668, 'rgba(0, 0, 255, 1)');
  grd1.addColorStop(0.83333335, 'rgba(255, 0, 255, 1)');
  grd1.addColorStop(1, 'rgba(255, 0, 0, 1)');

  ctx2.fillStyle = grd1;
  ctx2.fill();
  if ( $(colorBlock).attr('id') == 'colorBlockTheme' ) {

    $("<style>")
      .addClass('theme-colors')
      .prop("id", "theme-colors")
      .prop("type", "text/css")
      .html('')
      .appendTo('head');

  } else if ( $(colorBlock).attr('id') == 'colorBlockText' ) {

    $("<style>")
      .addClass('text-colors')
      .prop("id", "text-colors")
      .prop("type", "text/css")
      .html('')
      .appendTo('head');

  } else if ( $(colorBlock).attr('id') == 'colorBlockButtons' ) {

    $("<style>")
      .addClass('buttons-colors')
      .prop("id", "buttons-colors")
      .prop("type", "text/css")
      .html('')
      .appendTo('head');

  }
  var themeCustomColors = $('#theme-custom-colors');
  var textCustomColors = $('#text-custom-colors');
  var buttonsCustomColors = $('#buttons-custom-colors');
  var themeColors = $("style.theme-colors");
  var textColors = $("style.text-colors");
  var buttonsColors = $("style.buttons-colors");
  var themeVal, textVal, buttonsVal;

  function setStyles(bool) {
    if ( $(colorBlock).attr('id') == 'colorBlockTheme' || bool == 'theme' ) {
      var themeCSS =
        // background-color
        '#banner-slider .owl-controls .owl-pagination .owl-page.active span,' +
        '#banner-slider .owl-controls .owl-pagination .owl-page:hover span,' +
        '.section-block.preview-gallery .overlay figcaption .star,' +
        '.section-block.recent-news .news figcaption .star,' +
        '.section-block #news-slider .news figcaption .star,' +
        '.section-block.fat-bikes .news figcaption .star,' +
        '.section-block.similar-news .blog-news .info:before,' +
        '.section-block.technology .overlay figcaption a,' +
        '.section-block.bikes .overlay figcaption .star,' +
        '.section-block.contact-info .block .star,' +
        '.partners .block a .overlay,' +
        '.about-gallery .overlay figcaption .star,' +
        '.marks .full-height .socials a:hover,' +
        '.cd-single-point > a,' +
        '.style3 .nav-tabs .active a,' +
        '.style3 .nav-tabs .active a:hover, .style3 .nav-tabs .active a:focus,' +
        '.features .progress-bar-list .progress-line {' +
        'background-color: ' + hexColor +
        '}' +
        // color
        'header ul li a:hover,' +
        'header ul li.open > a,' +
        '.orange-text,' +
        '.rating label,' +
        '.rating input:checked ~ label,' +
        '.rating:not(:checked) > label:hover,' +
        '.rating:not(:checked) > label:hover ~ label,' +
        '.style1 .bike-tabs .nav-tabs .active a p,' +
        '.style2 .bike-tabs .nav-tabs .active a p,' +
        '.bottom-navigation .filter li a:hover, .bottom-navigation .filter li a:focus,' +
        '.bottom-navigation .filter li.active a,' +
        '.bottom-navigation .pagination li.active a,' +
        '.bottom-navigation .pagination li:hover a, .bottom-navigation .pagination li:focus a,' +
        '.socials.about a:hover,' +
        '.marks .full-height .video a:hover,' +
        'footer .socials a:hover {' +
        'color: ' + hexColor +
        '}' +
        '.rating input:checked + label:hover, .rating input:checked ~ label:hover,' +
        '.rating input:checked label:hover ~ input:checked ~ label, .rating input:checked input:checked ~ label:hover {' +
        'color: ' + shadeColor(hexColor, 0.15) +
        '}' +
        'header .navbar-header .navbar-collapse .navbar-nav li a:hover {' +
        'color: ' + hexColor +
        '}' +
        // border-color
        'footer,' +
        '.style1 .bike-tabs .nav-tabs .active a,' +
        '.style1 .bike-tabs .nav-tabs .active a:hover, .style1 .bike-tabs .nav-tabs .active a:focus,' +
        '.style2 .bike-tabs .nav-tabs .active a,' +
        '.style2 .bike-tabs .nav-tabs .active a:hover, .style2 .bike-tabs .nav-tabs .active a:focus,' +
        '.style3 .nav-tabs .active a,' +
        '.style3 .nav-tabs .active a:hover, .style3 .nav-tabs .active a:focus,' +
        '.blog-info.overlay:hover:before,' +
        '.blog-info.overlay:before {' +
        'border-color: ' + hexColor +
        '}' +

        // rewrite animation
        '@keyframes cd-pulse ' +
        '{' +
        '0% ' +
        '{' +
        '-webkit-transform: scale(1);' +
        'transform: scale(1);' +
        'background-color: ' + hexColor + ';' +
        'background-color: rgba(' + rgbaColorTheme + ', 0.8);' +
        '} ' +
        '50% ' +
        '{' +
        'background-color: ' + hexColor + ';' +
        'background-color: rgba(' + rgbaColorTheme + ', 0.8);' +
        '}' +
        '100%' +
        '{' +
        '-webkit-transform: scale(1.6);' +
        'transform: scale(1.6);' +
        'background-color: ' + hexColor + ';' +
        'background-color: rgba(' + rgbaColorTheme + ', 0);' +
        '}' +
        '}';
      themeColors
        .html('')
        .html(themeCSS);
      themeVal = $(".theme-colors").html();
      themeColors.attr({
        'data-hex': hexColor,
        'data-rgb': rgbaColorTheme
      });
      themeCustomColors.val(themeCSS);

    } else if ( $(colorBlock).attr('id') == 'colorBlockText' || bool == 'text' ) {
      var textCSS =
        '.rounded-btn,' +
        '.rounded-btn:hover, .rounded-btn:focus,' +
        '.rect-btn,' +
        '.rect-btn:hover, .rect-btn:focus,' +
        'form .submit-btn,' +
        'form .submit-btn:hover, form .submit-btn:focus,' +
        '.section-block .star i,' +
        '#news-slider .owl-buttons .owl-prev, #news-slider .owl-buttons .owl-next,' +
        '.section-block.similar-news .blog-news:hover .info .text span,' +
        '.section-block.similar-news .blog-news:hover .info .text a,' +
        '.section-block.technology .overlay figcaption a,' +
        '.marks .full-height .socials a:hover,' +
        '.cd-single-point i,' +
        '.style3 .nav-tabs .active a p,' +
        '#news-slider .owl-controls .owl-buttons .owl-prev, #news-slider .owl-controls .owl-buttons .owl-next {' +
        'color: ' + hexColor + ';' +
        '}';
      textColors
        .html('')
        .html(textCSS);
      textVal = $(".text-colors").html();
      textColors.attr({
        'data-hex': hexColor
      });
      textCustomColors.val(textCSS);

    } else if ( $(colorBlock).attr('id') == 'colorBlockButtons' || bool == 'buttons' ) {
      var buttonsCSS =
        '.rounded-btn,' +
        '.rect-btn,' +
        'form .submit-btn,' +
        '#news-slider .owl-controls .owl-buttons .owl-prev, #news-slider .owl-controls .owl-buttons .owl-next,' +
        '#news-slider .owl-controls .owl-pagination .owl-page.active span,' +
        '#news-slider .owl-controls .owl-pagination .owl-page:hover span {' +
        'background-color: ' + hexColor + ';' +
        '}' +
        '.rounded-btn:hover,' +
        '.rect-btn:hover,' +
        'form .submit-btn:hover,' +
        '#news-slider .owl-buttons .owl-prev, #news-slider .owl-buttons .owl-next:hover,' +
        '#news-slider .owl-controls .owl-buttons .owl-prev:hover, #news-slider .owl-controls .owl-buttons .owl-next:hover {' +
        'background-color: ' + shadeColor(hexColor, 0.15) + ';' +
        '}' +
        '.rounded-btn:focus,' +
        '.rect-btn:focus,' +
        'form .submit-btn:focus,' +
        '#news-slider .owl-buttons .owl-prev, #news-slider .owl-buttons .owl-next:focus {' +
        'background-color: ' + shadeColor(hexColor, -0.07) + ';' +
        '}';
      buttonsColors
        .html('')
        .html(buttonsCSS);
      buttonsVal = $(".buttons-colors").html();
      buttonsColors.attr({
        'data-hex': hexColor
      });
      buttonsCustomColors.val(buttonsCSS);
    }
  }

  function fillGradient() {
    ctx1.fillStyle = rgbaColor;
    ctx1.fillRect(0, 0, width1, height1);

    var grdWhite = ctx2.createLinearGradient(0, 0, width1, 0);
    grdWhite.addColorStop(0, 'rgba(255,255,255,1)');
    grdWhite.addColorStop(1, 'rgba(255,255,255,0)');
    ctx1.fillStyle = grdWhite;
    ctx1.fillRect(0, 0, width1, height1);

    var grdBlack = ctx2.createLinearGradient(0, 0, 0, height1);
    grdBlack.addColorStop(0, 'rgba(0,0,0,0)');
    grdBlack.addColorStop(1, 'rgba(0,0,0,1)');
    ctx1.fillStyle = grdBlack;
    ctx1.fillRect(0, 0, width1, height1);
  }

  function mousedownBlock(e) {
    drag = true;
    setMarker(e);
    changeBlockColor(e);
    if ( $(this).attr('id') == 'colorBlockTheme' ) {
      $('#hexInputTheme').val(hexColor.slice(1));
      $('#hexInputTheme').css('background', hexColor);
    } else if ( $(this).attr('id') == 'colorBlockText' ) {
      $('#hexInputText').val(hexColor.slice(1));
      $('#hexInputText').css('background', hexColor);
    } else if ( $(this).attr('id') == 'colorBlockButtons' ) {
      $('#hexInputButtons').val(hexColor.slice(1));
      $('#hexInputButtons').css('background', hexColor);
    }
  }

  function mousemoveBlock(e) {
    if ( drag ) {
      changeBlockColor(e);
      setMarker(e);
      if ( $(this).attr('id') == 'colorBlockTheme' ) {
        $('#hexInputTheme').val(hexColor.slice(1));
        $('#hexInputTheme').css('background', hexColor);
      } else if ( $(this).attr('id') == 'colorBlockText' ) {
        $('#hexInputText').val(hexColor.slice(1));
        $('#hexInputText').css('background', hexColor);
      } else if ( $(this).attr('id') == 'colorBlockButtons' ) {
        $('#hexInputButtons').val(hexColor.slice(1));
        $('#hexInputButtons').css('background', hexColor);
      }
    }
  }

  function mouseupBlock(e) {
    drag = false;
  }

  function mousedownStripe(e) {
    drag = true;
    setStripe(e);
    changeStripeColor(e);
    $(this).siblings('.colorPickerMarker').remove();
    retrieveBlockColor();
  }

  function mousemoveStripe(e) {
    if ( drag ) {
      setStripe(e);
      changeStripeColor(e);
      retrieveBlockColor();
    }
  }

  function mouseupStripe(e) {
    drag = false;
  }

  function retrieveBlockColor() {
    if ( $(colorBlock).siblings().hasClass('colorPickerMarker') ) {
      var marker = $(colorBlock).siblings('.colorPickerMarker').position();
      x = marker.left;
      y = marker.top;

      var imageData = ctx1.getImageData(x, y, 1, 1).data;
      rgbaColor = 'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)';
      rgbaColorTheme = imageData[0] + ', ' + imageData[1] + ', ' + imageData[2];
      hexColor = rgbToHex(imageData[0], imageData[1], imageData[2]);

      setStyles();
    }
  }

  function changeBlockColor(e) {
    x = e.offsetX;
    y = e.offsetY;
    var imageData = ctx1.getImageData(x, y, 1, 1).data;
    rgbaColor = 'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ',1)';
    rgbaColorTheme = imageData[0] + ', ' + imageData[1] + ', ' + imageData[2];
    hexColor = rgbToHex(imageData[0], imageData[1], imageData[2]);

    setStyles();
  }

  function hexToRgb(hex) {
    var c;
    if ( /^#([A-Fa-f0-9]{3}){1,2}$/.test(hex) ) {
      c = hex.substring(1).split('');
      if ( c.length == 3 ) {
        c = [c[0], c[0], c[1], c[1], c[2], c[2]];
      }
      c = '0x' + c.join('');
      return [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',');
    }
    throw new Error('Bad Hex');
  }

  function changeStripeColor(e) {
    x = e.offsetX;
    y = e.offsetY + 3;
    var imageData = ctx2.getImageData(x, y, 1, 1).data;
    rgbaColor = 'rgba(' + imageData[0] + ',' + imageData[1] + ',' + imageData[2] + ', 1)';
    rgbaColorTheme = imageData[0] + ',' + imageData[1] + ',' + imageData[2];
    fillGradient();
  }

  function setMarker(e) {
    $(colorBlock).siblings('.colorPickerMarker').remove();
    $('<div>').addClass('colorPickerMarker').css({
      'top': e.offsetY,
      'left': e.offsetX
    }).appendTo($(colorBlock).parent());
  }

  function setStripe(e) {
    $(colorStripe).siblings('.colorPickerStripe').remove();
    $('<div>').addClass('colorPickerStripe').css({
      'top': e.offsetY
    }).appendTo($(colorStripe).parent());
  }
  
  function removeMarkers(input) {
    $(input).parent().siblings('.color-picker').children('.colorPickerMarker').remove();
    $(input).parent().siblings('.color-picker').children('.colorPickerStripe').remove();
  }

  document.getElementById('hexInputTheme').oninput = function() {
    this.value = this.value.replace(/[^0-9a-z]/gi, '');
    if ( $(this).val().length == 6 ) {
      hexColor = '#' + $(this).val();
      rgbaColorTheme = hexToRgb(hexColor);
      setStyles('theme');
      removeMarkers('#hexInputTheme');
      $('#hexInputTheme').css('background', hexColor);
    }
  };

  document.getElementById('hexInputText').oninput = function() {
    this.value = this.value.replace(/[^0-9a-z]/gi, '');
    if ( $(this).val().length == 6 ) {
      hexColor = '#' + $(this).val();
      rgbaColorTheme = hexToRgb(hexColor);
      setStyles('text');
      removeMarkers('#hexInputText');
      $('#hexInputText').css('background', hexColor);
    }
  };

  document.getElementById('hexInputButtons').oninput = function() {
    this.value = this.value.replace(/[^0-9a-z]/gi, '');
    if ( $(this).val().length == 6 ) {
      hexColor = '#' + $(this).val();
      rgbaColorTheme = hexToRgb(hexColor);
      setStyles('buttons');
      removeMarkers('#hexInputButtons');
      $('#hexInputButtons').css('background', hexColor);
    }
  };

  colorBlock.addEventListener("mousedown", mousedownBlock, false);
  colorBlock.addEventListener("mouseup", mouseupBlock, false);
  colorBlock.addEventListener("mousemove", mousemoveBlock, false);

  colorStripe.addEventListener("mousedown", mousedownStripe, false);
  colorStripe.addEventListener("mouseup", mouseupStripe, false);
  colorStripe.addEventListener("mousemove", mousemoveStripe, false);
};