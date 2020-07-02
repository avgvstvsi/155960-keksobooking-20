'use strict';

(function () {
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
  var LOCATION_X_MIN = 200;
  var LOCATION_X_MAX = 1200;
  var LOCATION_Y_MIN = 130;
  var LOCATION_Y_MAX = 630;

  var createApartment = function () {
    var makeAd = [];
    for (var i = 0; i < NUMBER_PINS; i++) {

      var locationX = window.util.getRandomNumberInRange(LOCATION_X_MIN, LOCATION_X_MAX);
      var locationY = window.util.getRandomNumberInRange(LOCATION_Y_MIN, LOCATION_Y_MAX);

      makeAd.push({
        author: {
          avatar: AUTHOR_AVATAR + window.util.getRandomNumberInRange(1, 8) + '.png'
        },
        offer: {
          title: OFFER_TITLE + window.util.getRandomNumberInRange(1, 8),
          address: locationX + ', ' + locationY,
          price: window.util.getRandomNumberInRange(OFFER_MIN_PRICE, OFFER_MAX_PRICE),
          type: window.util.getRandomStringInArray(OFFER_TYPE),
          rooms: window.util.getRandomNumberInRange(OFFER_MIN_ROOMS, OFFER_MAX_ROOMS),
          guests: window.util.getRandomNumberInRange(OFFER_MIN_GUESTS, OFFER_MAX_GUESTS),
          checkin: window.util.getRandomStringInArray(OFFER_CHECKIN),
          checkout: window.util.getRandomStringInArray(OFFER_CHECKOUT),
          features: window.util.getRandomStringInArray(OFFER_FEATURES),
          description: OFFER_DESCRIPTION + window.util.getRandomNumberInRange(1, 8),
          photos: OFFER_PHOTOS + window.util.getRandomNumberInRange(1, 3) + '.jpg'
        },
        location: {
          x: locationX,
          y: locationY
        }
      });
    }

    return makeAd;
  };
  window.data = {
    createApartment: createApartment
  };
})();

