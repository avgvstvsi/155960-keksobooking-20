'use strict';

(function () {
  var mapPins = document.querySelector('.map__pins');
  var cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');

  var getPinCard = function (data) {
    var cardElement = cardTemplate.cloneNode(true);

    cardElement.querySelector('.popup__title').textContent = data.offer.title;
    cardElement.querySelector('.popup__text--address').textContent = data.offer.address;
    cardElement.querySelector('.popup__text--price').textContent = data.offer.price + '₽/ночь';

    var type = cardElement.querySelector('.popup__type');
    if (data.offer.type === 'flat') {
      type.textContent = 'Квартира';
    } else if (data.offer.type === 'bungalo') {
      type.textContent = 'Бунгало';
    } else if (data.offer.type === 'house') {
      type.textContent = 'Дом';
    } else {
      type.textContent = 'Дворец';
    }

    cardElement.querySelector('.popup__text--capacity').textContent = data.offer.rooms + ' комнаты для ' + data.offer.guests + ' гостей';
    cardElement.querySelector('.popup__text--time').textContent = ' Заезд после ' + data.offer.checkin + ', выезд до ' + data.offer.checkout;
    cardElement.querySelector('.popup__features').textContent = data.offer.features;
    cardElement.querySelector('.popup__description').textContent = data.offer.description;

    var cardPhotos = cardElement.querySelector('.popup__photos');
    for (var i = 0; i < data.offer.photos.length; i++) {
      var cardPhoto = cardElement.querySelector('.popup__photos').querySelector('.popup__photo').cloneNode(true);

      cardPhoto.src = data.offer.photos[i];
      cardPhotos.appendChild(cardPhoto);
      cardElement.appendChild(cardPhotos);
    }

    cardElement.querySelector('.popup__avatar').src = data.author.avatar;

    return cardElement;
  };

  var renderCard = function (pinsData) {
    var fragment = document.createDocumentFragment();
    fragment.appendChild(getPinCard(pinsData[0]));
    mapPins.appendChild(fragment);
  };

  window.card = {
    renderCard: renderCard
  };

})();
