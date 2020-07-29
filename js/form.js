'use strict';

(function () {
  var NUMBER_OF_ROOMS = '100';
  var MIN_PRICE = {
    flat: 1000,
    house: 5000,
    palace: 10000,
    bungalo: 0
  };

  var adForm = document.querySelector('.ad-form');

  var guests = adForm.querySelector('select[name="capacity"');
  var rooms = adForm.querySelector('select[name="rooms"]');
  var inputPrice = adForm.querySelector('#price');
  var selectType = adForm.querySelector('select[name="type"]');
  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');
  var resetFormButton = adForm.querySelector('.ad-form__reset');
  var main = document.querySelector('main');

  var getRoomsAndGuests = function () {
    if (rooms.value === NUMBER_OF_ROOMS) {
      guests.setCustomValidity('Комната не для гостей');
    } else if (rooms.value < guests.value) {
      guests.setCustomValidity('Выберите большее количество комнат');
    } else {
      guests.setCustomValidity('');
    }
  };

  var changeMinPriceValue = function () {
    inputPrice.min = MIN_PRICE[selectType.value];
    inputPrice.placeholder = MIN_PRICE[selectType.value];
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

  var createSuccessMessage = function () {

    var successForm = document.querySelector('#success')
      .content
      .querySelector('.success');

    main.appendChild(successForm);

    var onEscPress = function (evt) {
      if (evt.key === window.util.KeyCode.ESCAPE) {
        successForm.remove();
      }
      document.removeEventListener('keydown', onEscPress);
      document.removeEventListener('click', onClick);
    };

    var onClick = function () {
      successForm.remove();
      document.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onEscPress);
    };

    document.addEventListener('keydown', onEscPress);
    document.addEventListener('click', onClick);
  };

  var createErrorMessage = function () {

    var errorForm = document.querySelector('#error')
      .content
      .querySelector('.error');

    main.appendChild(errorForm);

    var onEscPress = function (evt) {
      if (evt.key === window.util.KeyCode.ESCAPE) {
        errorForm.remove();
      }
      document.removeEventListener('keydown', onEscPress);
      document.removeEventListener('click', onClick);
    };

    var onClick = function () {
      errorForm.remove();
      document.removeEventListener('click', onClick);
      document.removeEventListener('keydown', onEscPress);
    };

    document.addEventListener('keydown', onEscPress);
    document.addEventListener('click', onClick);
  };

  var onSubmit = function (evt) {
    window.backend.upload(new FormData(adForm), function () {
      createSuccessMessage();
      adForm.reset();
      window.main.hideForms();
    }, function () {
      createErrorMessage();
    });
    evt.preventDefault();
  };

  adForm.addEventListener('submit', onSubmit);

  resetFormButton.addEventListener('click', function () {
    adForm.reset();
  });

  window.form = {
    getRoomsAndGuests: getRoomsAndGuests
  };
})();

