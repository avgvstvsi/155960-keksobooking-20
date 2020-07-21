'use strict';

(function () {
  var DEBOUNCE_INTERVAL = 300;

  window.debounce = function (callback) {
    var lastTimeout = null;
    return function () {
      var settings = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        callback.apply(null, settings);
      }, DEBOUNCE_INTERVAL);
    };
  };
})();
