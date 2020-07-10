'use strict';

(function () {
  // Генерация 8 объектов
  var getRandomNumberInRange = function (min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    return Math.floor(rand);
  };

  var getRandomStringInArray = function (arr) {
    return arr[getRandomNumberInRange(0, arr.length - 1)];
  };

  window.util = {
    getRandomNumberInRange: getRandomNumberInRange,
    getRandomStringInArray: getRandomStringInArray
  };
})();
