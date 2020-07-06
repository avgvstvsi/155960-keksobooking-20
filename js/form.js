'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');

  var NUMBER_OF_ROOMS = '100';

  // Валидация соответствия гостей и комнат
  var guests = adForm.querySelector('select[name="capacity"');
  var rooms = adForm.querySelector('select[name="rooms"]');

  var getRoomsAndGuests = function () {
    if (rooms.value === NUMBER_OF_ROOMS) {
      guests.setCustomValidity('Комната не для гостей');
    } else if (rooms.value < guests.value) {
      guests.setCustomValidity('Выберите большее количество комнат');
    } else {
      guests.setCustomValidity('');
    }
  };

  rooms.addEventListener('change', getRoomsAndGuests);
  guests.addEventListener('change', getRoomsAndGuests);

  window.form = {
    getRoomsAndGuests: getRoomsAndGuests
  };
})();

