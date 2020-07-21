'use strict';

(function () {
  var DEFAULT_FILTER = 'any';

  var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters.querySelector('#housing-type');

  var filterHousingType = (function (adv) {
    return housingType.value === DEFAULT_FILTER || housingType.value === adv.offer.type;
  });

  var updateOffers = function (offers) {
    var offersCopy = offers.slice();
    var filterValue = offersCopy.filter(filterHousingType);
    return filterValue;
  };

  // var removeCard = function () {
  //   var popup = document.querySelector('.popup');
  //   if (popup) {
  //     popup.remove();
  //   }
  // };

  var activateFilters = function (offers) {

    var makeFilterFormActive = function () {
      window.card.closeCard();
      var filteredOffers = updateOffers(offers);
      window.pin.renderPins(filteredOffers);
    };

    mapFilters.addEventListener('change', makeFilterFormActive);
  };

  window.filter = {
    updateOffers: updateOffers,
    activateFilters: activateFilters
  };

}());
