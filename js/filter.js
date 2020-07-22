'use strict';

(function () {
  var DEFAULT_FILTER = 'any';

  var mapFilters = document.querySelector('.map__filters');
  var housingType = mapFilters.querySelector('#housing-type');
  var housingPrice = mapFilters.querySelector('#housing-price');
  var housingRooms = mapFilters.querySelector('#housing-rooms');
  var housingGuests = mapFilters.querySelector('#housing-guests');
  var priceMap = {
    'middle': {
      from: 10000,
      to: 50000
    },
    'low': {
      from: 0,
      to: 9999
    },
    'high': {
      from: 50001,
      to: 100000
    }
  };

  var filterHousingType = (function (adv) {
    return housingType.value === DEFAULT_FILTER || housingType.value === adv.offer.type;
  });

  var filterHousingPrice = function (adv) {
    return housingPrice.value === DEFAULT_FILTER || adv.offer.price >= priceMap[housingPrice.value].from && adv.offer.price <= priceMap[housingPrice.value].to;
  };

  var filterHousingRooms = (function (adv) {
    return housingRooms.value === DEFAULT_FILTER || Number(housingRooms.value) === adv.offer.rooms;
  });

  var filterHousingGuests = (function (adv) {
    return housingGuests.value === DEFAULT_FILTER || Number(housingGuests.value) === adv.offer.guests;
  });

  var filterHousingFeatures = function (adv) {
    var checkedFeatures = mapFilters.querySelectorAll('input:checked');

    return Array.from(checkedFeatures).every(function (feature) {
      return adv.offer.features.includes(feature.value);
    });
  };

  var updateOffers = function (offers) {
    var offersCopy = offers.slice();
    var filterValue = [];
    filterValue = offersCopy.filter(function (adv) {
      return filterHousingType(adv) &&
      filterHousingPrice(adv) &&
      filterHousingRooms(adv) &&
      filterHousingGuests(adv) &&
      filterHousingFeatures(adv);
    });
    return filterValue;
  };

  var activateFilters = function (offers) {

    var makeFilterFormActive = function () {
      window.card.closeCard();
      window.pin.renderPins(updateOffers(offers));
    };

    mapFilters.addEventListener('change', makeFilterFormActive);
  };

  window.filter = {
    updateOffers: updateOffers,
    activateFilters: activateFilters
  };

}());
