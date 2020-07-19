'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var adFormInputs = adForm.querySelectorAll('fieldset');
  var mapFaded = document.querySelector('.map');
  var mapFilter = document.querySelector('.map__filters');
  var mapFilterInputs = mapFilter.children;

  // Активация страницы
  var hidingForms = function (element, isDisabled) {
    for (var i = 0; i < element.length; i++) {
      element[i].disabled = isDisabled;
    }
  };

  hidingForms(mapFilterInputs, true);
  hidingForms(adFormInputs, true);

  var showForms = function () {
    mapFaded.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    hidingForms(mapFilterInputs, false);
    hidingForms(adFormInputs, false);
    window.pin.renderActivePosition();
    window.form.getRoomsAndGuests();
    window.load(window.pin.renderPins, function () {});
  };

  var hideForms = function () {
    mapFaded.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    hidingForms(mapFilterInputs, true);
    hidingForms(adFormInputs, true);
  };

  window.main = {
    showForms: showForms,
    hideForms: hideForms
  };
})();
