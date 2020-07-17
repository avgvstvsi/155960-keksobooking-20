'use strict';

(function () {
  var mapFaded = document.querySelector('.map');
  var cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');

  var ImgProperties = {
    WIDTH: '45px',
    HEIGHT: '40px',
    ALT: 'Фотография жилья',
  };

  var ESCAPE = 27;

  var getPinCardData = function (data) {
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
      var newImg = document.createElement('img');
      newImg.src = data.offer.photos[i];
      newImg.classList.add('popup__photo');
      newImg.style.width = ImgProperties.WIDTH;
      newImg.style.height = ImgProperties.HEIGHT;
      newImg.alt = ImgProperties.ALT;
      cardPhotos.appendChild(newImg);
    }

    cardElement.querySelector('.popup__avatar').src = data.author.avatar;
    getCardState(cardElement);
    return cardElement;
  };

  var getCardState = function (cardElement) {
    var mapFiltersContainer = document.querySelector('.map__filters-container');
    var closeCardBtn = cardElement.querySelector('.popup__close');
    var closeCard = function () {
      var popup = mapFaded.querySelector('.popup');
      popup.remove();
      closeCardBtn.removeEventListener('click', onCloseCardEnter);
      closeCardBtn.removeEventListener('keydown', onCloseCardEsc);
      document.removeEventListener('keydown', onCloseCardEsc);
    };
    var onCloseCardEnter = function () {
      closeCard();
    };
    var onCloseCardEsc = function (evt) {
      if (evt.keyCode === ESCAPE) {
        closeCard();
      }

    };
    closeCardBtn.addEventListener('click', onCloseCardEnter);
    document.addEventListener('keydown', onCloseCardEsc);
    mapFaded.insertBefore(cardElement, mapFiltersContainer);
  };

  window.card = {
    getPinCardData: getPinCardData
  };

})();
