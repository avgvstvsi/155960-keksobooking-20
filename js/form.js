'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');

  var NUMBER_OF_ROOMS = '100';

  // Валидация соответствия гостей и комнат
  var guests = adForm.querySelector('select[name="capacity"');
  var rooms = adForm.querySelector('select[name="rooms"]');
  var inputPrice = adForm.querySelector('#price');
  var selectType = adForm.querySelector('select[name="type"]');
  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');


  var getRoomsAndGuests = function () {
    if (rooms.value === NUMBER_OF_ROOMS) {
      guests.setCustomValidity('Комната не для гостей');
    } else if (rooms.value < guests.value) {
      guests.setCustomValidity('Выберите большее количество комнат');
    } else {
      guests.setCustomValidity('');
    }
  };

  var getMinPrice = function (type) {
    var minPrice = 0;
    switch (type) {
      case 'bungalo':
        minPrice = 0;
        break;
      case 'flat':
        minPrice = 1000;
        break;
      case 'house':
        minPrice = 5000;
        break;
      case 'palace':
        minPrice = 10000;
        break;
    }
    return minPrice;
  };

  var changeMinPriceValue = function () {
    inputPrice.min = getMinPrice(selectType.value);
    inputPrice.placeholder = getMinPrice(selectType.value);
  };

  rooms.addEventListener('change', getRoomsAndGuests);
  guests.addEventListener('change', getRoomsAndGuests);
  selectType.addEventListener('change', changeMinPriceValue);

  timeIn.addEventListener('change', function () {
    timeOut.value = timeIn.value;
  });

  timeOut.addEventListener('change', function () {
    timeIn.value = timeOut.value;
  });

  window.form = {
    getRoomsAndGuests: getRoomsAndGuests
  };
})();

