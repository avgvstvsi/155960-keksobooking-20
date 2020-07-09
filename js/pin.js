'use strict';

(function () {
  var MAP_PIN_SIZE = 65;
  var MAP_PIN_STING = 22;
  var MAX_PINS = 5;

  var mapPin = document.querySelector('.map__pin--main');
  var mapPins = document.querySelector('.map__pins');
  var templatePin = document.querySelector('#pin')
      .content
      .querySelector('.map__pin');

  var MapSize = {
    MAP_WIDTH: 1200,
    MAP_HEIGHT: 750,
  };

  var ENTER = 13;
  var MAIN_BUTTON = 0;

  var getPinTemplate = function (data) {
    var pinElement = templatePin.cloneNode(true);
    var pinIcon = pinElement.querySelector('img');
    pinElement.style = 'left: ' + data.location.x + 'px; top: ' + data.location.y + 'px;';
    pinIcon.src = data.author.avatar;
    pinIcon.alt = data.offer.title;

    return pinElement;
  };

  var renderPins = function (pinsData) {
    var fragment = document.createDocumentFragment();
    var pinsCount = pinsData.length > MAX_PINS ? MAX_PINS : pinsData.length;
    for (var i = 0; i < pinsCount; i++) {
      fragment.appendChild(getPinTemplate(pinsData[i]));
    }
    mapPins.appendChild(fragment);
  };

  mapPin.addEventListener('mousedown', function (evt) {
    if (evt.button === MAIN_BUTTON) {
      window.main.showForms();
    }
  });

  mapPin.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER) {
      window.main.showForms();
    }
  });

  // Определение начальных координат метки
  var address = document.querySelector('#address');

  var renderInactivePosition = function () {
    address.value = Math.floor(MapSize.MAP_WIDTH / 2) + ', ' + Math.floor(MapSize.MAP_HEIGHT / 2);
  };

  renderInactivePosition();

  var renderActivePosition = function () {
    address.value = Math.floor(MapSize.MAP_WIDTH / 2) + ', ' + Math.floor((MapSize.MAP_HEIGHT / 2) + (MAP_PIN_SIZE / 2) + MAP_PIN_STING);
  };

  window.pin = {
    renderPins: renderPins,
    renderActivePosition: renderActivePosition
  };
})();

