// module.exports = function() {
//   /*! FileSaver.js demo script
//    *  2016-05-26
//    *
//    *  By Eli Grey, http://eligrey.com
//    *  License: MIT
//    *    See LICENSE.md
//    */
//   /*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/demo/demo.js */
//   /*jshint laxbreak: true, laxcomma: true, smarttabs: true*/
//   /*global saveAs, self*/
//   (function(view) {
//     "use strict";
//     // The canvas drawing portion of the demo is based off the demo at
//     // http://www.williammalone.com/articles/create-html5-canvas-javascript-drawing-app/
//     var document = view.document,
//       $ = function(id) {
//         return document.getElementById(id);
//       },
//       session = view.sessionStorage,
//       // only get URL when necessary in case Blob.js hasn't defined it yet
//       get_blob = function() {
//         return view.Blob;
//       },
//       theme = $("theme-custom-colors"),
//       text = $("text-custom-colors"),
//       buttons = $("buttons-custom-colors"),
//       text_options_form = $("text-options");
//
//     if ( session.text ) {
//       theme.value = text.value = buttons.value = session.text;
//     }
//
//     text_options_form.addEventListener("submit", function(event) {
//       if ( theme.value == "" && text.value == "" && buttons.value == "" ) {
//         alert('Make sure you picked at least one color!');
//         event.preventDefault();
//       } else {
//         event.preventDefault();
//         var BB = get_blob();
//         saveAs(new BB(
//           [theme.value + text.value + buttons.value], {
//             type: "text/css;charset=" + document.characterSet
//           }), "custom-colors.css");
//       }
//     }, false);
//     view.addEventListener("unload", function() {
//       session.text = text.value;
//     }, false);
//   }(self));
// };