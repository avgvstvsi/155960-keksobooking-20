'use strict';

var AUTHOR_AVATAR = 'img/avatars/user0';

var OFFER_TITLE = 'Заголовок предложения 0';
var OFFER_MIN_PRICE = 1000;
var OFFER_MAX_PRICE = 10000;
var OFFER_TYPE = ['palace', 'flat', 'house', 'bungalo'];
var OFFER_MIN_ROOMS = 1;
var OFFER_MAX_ROOMS = 4;
var OFFER_MIN_GUESTS = 1;
var OFFER_MAX_GUESTS = 3;
var OFFER_CHECKIN = ['12:00', '13:00', '14:00'];
var OFFER_CHECKOUT = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var OFFER_DESCRIPTION = 'Строка с описанием 0';
var OFFER_PHOTOS = 'http://o0.github.io/assets/images/tokyo/hotel';
var NUMBER_PINS = 8;
var NUMBER_OF_ROOMS = '100';

var LOCATION_X_MIN = 200;
var LOCATION_X_MAX = 1200;
var LOCATION_Y_MIN = 130;
var LOCATION_Y_MAX = 630;
var MAP_WIDTH = 1200;
var MAP_HEIGHT = 750;
var MAP_PIN_SIZE = 65;
var MAP_PIN_STING = 22;

var mapFaded = document.querySelector('.map');
var mapPin = document.querySelector('.map__pin--main');
var mapFilter = document.querySelector('.map__filters');
var mapFilterInputs = mapFilter.children;
var adForm = document.querySelector('.ad-form');
var adFormInputs = adForm.querySelectorAll('fieldset');

var mapPins = document.querySelector('.map__pins');
var templatePin = document.querySelector('#pin')
    .content
    .querySelector('.map__pin');

// Генерация 8 объектов
var getRandomNumberInRange = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

var getRandomStringInArray = function (arr) {
  return arr[getRandomNumberInRange(0, arr.length - 1)];
};

var createApartment = function () {
  var makeAd = [];
  for (var i = 0; i < NUMBER_PINS; i++) {

    var locationX = getRandomNumberInRange(LOCATION_X_MIN, LOCATION_X_MAX);
    var locationY = getRandomNumberInRange(LOCATION_Y_MIN, LOCATION_Y_MAX);

    makeAd.push({
      author: {
        avatar: AUTHOR_AVATAR + getRandomNumberInRange(1, 8) + '.png'
      },
      offer: {
        title: OFFER_TITLE + getRandomNumberInRange(1, 8),
        address: locationX + ', ' + locationY,
        price: getRandomNumberInRange(OFFER_MIN_PRICE, OFFER_MAX_PRICE),
        type: getRandomStringInArray(OFFER_TYPE),
        rooms: getRandomNumberInRange(OFFER_MIN_ROOMS, OFFER_MAX_ROOMS),
        guests: getRandomNumberInRange(OFFER_MIN_GUESTS, OFFER_MAX_GUESTS),
        checkin: getRandomStringInArray(OFFER_CHECKIN),
        checkout: getRandomStringInArray(OFFER_CHECKOUT),
        features: getRandomStringInArray(OFFER_FEATURES),
        description: OFFER_DESCRIPTION + getRandomNumberInRange(1, 8),
        photos: OFFER_PHOTOS + getRandomNumberInRange(1, 3) + '.jpg'
      },
      location: {
        x: locationX,
        y: locationY
      }
    });
  }

  return makeAd;
};

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
  for (var i = 0; i < pinsData.length; i++) {
    fragment.appendChild(getPinTemplate(pinsData[i]));
  }
  mapPins.appendChild(fragment);
};

// Активация страницы
var hideForms = function (element, isDisabled) {
  for (var i = 0; i < element.length; i++) {
    element[i].disabled = isDisabled;
  }
};

hideForms(mapFilterInputs, true);
hideForms(adFormInputs, true);

var showForms = function () {
  renderPins(createApartment());
  mapFaded.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  hideForms(mapFilterInputs, false);
  hideForms(adFormInputs, false);
  renderActivePosition();
  getRoomsAndGuests();
};

mapPin.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    showForms();
  }
});

mapPin.addEventListener('keydown', function (evt) {
  if (evt.keyCode === 13) {
    showForms();
  }
});

// Определение начальных координат метки
var address = document.querySelector('#address');

var renderInactivePosition = function () {
  address.value = Math.floor(MAP_WIDTH / 2) + ', ' + Math.floor(MAP_HEIGHT / 2);
};

renderInactivePosition();

var renderActivePosition = function () {
  address.value = Math.floor(MAP_WIDTH / 2) + ', ' + Math.floor((MAP_HEIGHT / 2) + (MAP_PIN_SIZE / 2) + MAP_PIN_STING);
};

// Валидация гостей и комнат
var guests = adForm.querySelector('select[name="capacity"');
var rooms = adForm.querySelector('select[name="rooms"]');

var getRoomsAndGuests = function () {
  if (rooms.value === NUMBER_OF_ROOMS) {
    guests.setCustomValidity('Комната не для гостей');
  } else if (rooms.value < guests.value) {
    guests.setCustomValidity('Выберите большее количество гостей');
  } else {
    guests.setCustomValidity('');
  }
};

rooms.addEventListener('change', getRoomsAndGuests);
guests.addEventListener('change', getRoomsAndGuests);
