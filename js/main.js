'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var adFormInputs = adForm.querySelectorAll('fieldset');
  var mapFaded = document.querySelector('.map');
  var mapFilter = document.querySelector('.map__filters');
  var mapFilterInputs = mapFilter.children;
  var offers = [];

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
    window.backend.load(function (pinsData) {
      offers = pinsData;
      window.filter.activateFilters(offers);
      var filtredOffers = window.filter.updateOffers(offers);
      window.pin.renderPins(filtredOffers);
    }, function () {});
  };

  var hideForms = function () {
    mapFaded.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    hidingForms(mapFilterInputs, true);
    hidingForms(adFormInputs, true);
  };

  window.main = {
    showForms: showForms,
    hideForms: hideForms,
    offers: offers
  };
})();
