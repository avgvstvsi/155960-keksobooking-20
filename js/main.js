'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var adFormInputs = adForm.querySelectorAll('fieldset');
  var mapFaded = document.querySelector('.map');
  var mapFilter = document.querySelector('.map__filters');
  var mapFilterInputs = mapFilter.children;

  // Активация страницы
  var hideForms = function (element, isDisabled) {
    for (var i = 0; i < element.length; i++) {
      element[i].disabled = isDisabled;
    }
  };

  hideForms(mapFilterInputs, true);
  hideForms(adFormInputs, true);

  var showForms = function () {
    mapFaded.classList.remove('map--faded');
    adForm.classList.remove('ad-form--disabled');
    hideForms(mapFilterInputs, false);
    hideForms(adFormInputs, false);
    window.pin.renderActivePosition();
    window.form.getRoomsAndGuests();
    window.load(window.pin.renderPins, function () {});
    window.load(window.card.renderCard, function () {});
  };

  window.main = {
    showForms: showForms
  };
})();
