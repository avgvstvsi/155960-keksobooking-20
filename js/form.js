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
    switch (type) {
      case 'flat':
        return 1000;
      case 'house':
        return 5000;
      case 'palace':
        return 10000;
      case 'bungalo':
      default:
        return 0;
    }
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

