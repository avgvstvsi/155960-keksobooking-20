'use strict';

(function () {
  var mapPin = document.querySelector('.map__pin--main');
  var MapPinSize = {
    MAP_PIN_WIDTH: 62,
    MAP_PIN_HEIGNH: 84,
  };
  var blockAdress = document.querySelector('#address');

  var CoordinatesLimit = {
    X_MIN: 0,
    X_MAX: 1200,
    Y_MIN: 130,
    Y_MAX: 630,
  };

  mapPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      mapPin.style.top = (mapPin.offsetTop - shift.y) + 'px';
      mapPin.style.left = (mapPin.offsetLeft - shift.x) + 'px';

      var halfWidth = MapPinSize.MAP_PIN_WIDTH / 2;
      var coordMaxX = CoordinatesLimit.X_MAX - halfWidth;
      var coordMinX = CoordinatesLimit.X_MIN - halfWidth;
      var coordMaxY = CoordinatesLimit.Y_MAX - mapPin.offsetHeight;
      var coordMinY = CoordinatesLimit.Y_MIN - mapPin.offsetHeight;

      blockAdress.value = (mapPin.offsetLeft - shift.x + halfWidth) + ', ' + (mapPin.offsetTop - shift.y + MapPinSize.MAP_PIN_HEIGNH);

      if (mapPin.offsetLeft > coordMaxX) {
        mapPin.style.left = coordMaxX + 'px';
      } else if (mapPin.offsetLeft < coordMinX) {
        mapPin.style.left = coordMinX + 'px';
      }

      if (mapPin.offsetTop > coordMaxY) {
        mapPin.style.top = coordMaxY + 'px';
      } else if (mapPin.offsetTop < coordMinY) {
        mapPin.style.top = coordMinY + 'px';
      }

    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });

})();


