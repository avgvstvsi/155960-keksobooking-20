'use strict';

(function () {

  var KeyCode = {
    ENTER: 'Enter',
    ESCAPE: 'Escape',
    MAIN_BUTTON: 0
  };

  var getRandomNumberInRange = function (min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  };

  var getRandomStringInArray = function (arr) {
    return arr[getRandomNumberInRange(0, arr.length - 1)];
  };

  window.util = {
    getRandomNumberInRange: getRandomNumberInRange,
    getRandomStringInArray: getRandomStringInArray,
    KeyCode: KeyCode
  };
})();
