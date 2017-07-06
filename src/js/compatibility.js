// Module Compatibility
module.exports = function() {

  // detecting browser
  var doc = document.documentElement;
  doc.setAttribute('data-useragent', navigator.userAgent);
  doc.setAttribute('data-platform', navigator.platform);

  var BrowserDetect = {
    init: function () {
      this.browser = this.searchString(this.dataBrowser) || "Other";
      this.version = this.searchVersion(navigator.userAgent) || this.searchVersion(navigator.appVersion) || "Unknown";
    },
    searchString: function (data) {
      for (var i = 0; i < data.length; i++) {
        var dataString = data[i].string;
        this.versionSearchString = data[i].subString;

        if (dataString.indexOf(data[i].subString) !== -1) {
          return data[i].identity;
        }
      }
    },
    searchVersion: function (dataString) {
      var index = dataString.indexOf(this.versionSearchString);
      if (index === -1) {
        return;
      }

      var rv = dataString.indexOf("rv:");
      if (this.versionSearchString === "Trident" && rv !== -1) {
        return parseFloat(dataString.substring(rv + 3));
      } else {
        return parseFloat(dataString.substring(index + this.versionSearchString.length + 1));
      }
    },

    dataBrowser: [
      {string: navigator.userAgent, subString: "Edge", identity: "MS Edge"},
      {string: navigator.userAgent, subString: "MSIE", identity: "Explorer"},
      {string: navigator.userAgent, subString: "Trident", identity: "Explorer"},
      {string: navigator.userAgent, subString: "Firefox", identity: "Firefox"},
      {string: navigator.userAgent, subString: "Opera", identity: "Opera"},
      {string: navigator.userAgent, subString: "OPR", identity: "Opera"},

      {string: navigator.userAgent, subString: "Chrome", identity: "Chrome"},
      {string: navigator.userAgent, subString: "Safari", identity: "Safari"}
    ]
  };

  BrowserDetect.init();

  function placeholder() {
    var placeholder = 'placeholder' in document.createElement('input');
    if ( !placeholder ) {
      $.getScript("assets/plugins/placeholder.js", function() {
        $(":input").each(function() {
          $(this).placeHolder();
        });
      });
    }
  }

  // Browser Fixes
  var safari10 = navigator.userAgent.indexOf("10.0 Safari") > -1;
  var firefox = navigator.userAgent.indexOf("Firefox") > -1;
  var IE9 = navigator.userAgent.indexOf("MSIE 9.0") > -1;
  var IE10 = navigator.userAgent.indexOf("MSIE 10.0") > -1;

  if ( safari10 ) {
    $('body').addClass('safari-10');
  } else if ( firefox ) {
    $('body').addClass('firefox');
  } else if ( IE9 ) {
    $('body').addClass('ie9');
    placeholder();
  } else if ( IE10 ) {
    $('body').addClass('ie10');
  } else if ( BrowserDetect.browser == 'Explorer' && BrowserDetect.version == '11' ) {
    $('body').addClass('ie11');
  }

};