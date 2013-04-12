(function (win, nav) {
  "use strict";

  win.requestAnimationFrame = win.requestAnimationFrame ||
                              win.msRequestAnimationFrame ||
                              win.mozRequestAnimationFrame ||
                              win.webkitRequestAnimationFrame;

  nav.getUserMedia = nav.getUserMedia ||
                     nav.oGetUserMedia ||
                     nav.msGetUserMedia ||
                     nav.mozGetUserMedia ||
                     nav.webkitGetUserMedia;

  // Fallback for browsers that don't provide
  // the requestAnimationFrame API (e.g. Opera).
  if (!win.requestAnimationFrame) {
    win.requestAnimationFrame = function (callback) {
      setTimeout(callback, 0);
    };
  }

  // Fallback for browsers that don't provide
  // the URL.createObjectURL API (e.g. Opera).
  if (!win.URL || !win.URL.createObjectURL) {
    win.URL = win.URL || {};
    win.URL.createObjectURL = function (obj) {
      return obj;
    };
  }

})(window, navigator);
