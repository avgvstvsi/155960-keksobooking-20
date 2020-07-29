'use strict';

(function () {
  var MAX_PINS = 5;
  var MAIN_BUTTON = 0;

  var mapFaded = document.querySelector('.map');
  var mapPin = document.querySelector('.map__pin--main');
  var mapPins = document.querySelector('.map__pins');

  var MapPinAttribute = {
    SIZE: 62,
    STING: 22,
    TOP: 375,
    LEFT: 570
  };

  var MapSize = {
    WIDTH: 1200,
    HEIGHT: 704,
  };

  var templatePin = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

  var getPinTemplate = function (data) {
    var pinElement = templatePin.cloneNode(true);
    var pinIcon = pinElement.querySelector('img');
    pinElement.style = 'left: ' + data.location.x + 'px; top: ' + data.location.y + 'px;';
    pinIcon.src = data.author.avatar;
    pinIcon.alt = data.offer.title;

    var openPopup = function () {
      var popup = mapFaded.querySelector('.popup');
      var mapPinActive = document.querySelector('.map__pin--active');
      pinElement.classList.add('map__pin--active');
      if (popup) {
        popup.remove();
      }
      if (mapPinActive) {
        mapPinActive.classList.remove('map__pin--active');
      }
      window.card.getPinCardData(data);
    };

    pinElement.addEventListener('click', openPopup);

    return pinElement;
  };

  var renderAll = window.debounce(function (pinsData) {
    clear();
    var fragment = document.createDocumentFragment();
    var pinsCount = (pinsData.length > MAX_PINS) ? MAX_PINS : pinsData.length;
    for (var i = 0; i < pinsCount; i++) {
      fragment.appendChild(getPinTemplate(pinsData[i]));
    }
    return mapPins.appendChild(fragment);
  });

  var clear = function () {
    mapPins.querySelectorAll('.map__pin:not(.map__pin--main)').forEach(function (pin) {
      pin.remove();
    });
  };

  var renderPinsClick = function (evt) {
    if (evt.button === window.util.KeyCode.MAIN_BUTTON) {
      window.main.showForms();
    }
  };

  var renderPinsEnter = function (evt) {
    if (evt.key === window.util.KeyCode.ENTER) {
      window.main.showForms();
    }
  };

  mapPin.addEventListener('mousedown', renderPinsClick);
  mapPin.addEventListener('keydown', renderPinsEnter);

  var address = document.querySelector('#address');

  var renderInactivePosition = function () {
    address.value = Math.floor(MapSize.WIDTH / 2) + ', ' + Math.floor(MapSize.HEIGHT / 2);
  };

  renderInactivePosition();

  var renderActivePosition = function () {
    address.value = Math.floor(MapSize.WIDTH / 2) + ', ' + Math.floor((MapSize.HEIGHT / 2) + (MapPinAttribute.SIZE / 2) + MapPinAttribute.STING);
  };

  var setDefaultPosition = function () {
    mapPin.style.left = MapPinAttribute.LEFT + 'px';
    mapPin.style.top = MapPinAttribute.TOP + 'px';
  };

  window.pin = {
    renderAll: renderAll,
    renderActivePosition: renderActivePosition,
    clear: clear,
    setDefaultPosition: setDefaultPosition,
    templatePin: templatePin
  };
})();
