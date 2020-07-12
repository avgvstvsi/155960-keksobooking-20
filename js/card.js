'use strict';

(function () {
  var mapFaded = document.querySelector('.map');
  var cardTemplate = document.querySelector('#card')
  .content
  .querySelector('.map__card');

  var ImgProperties = {
    IMG_WIDTH: '45px',
    IMG_HEIGHT: '40px',
    IMG_ALT: 'Фотография жилья',
  };

  var ESCAPE = 27;

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
      var newImg = document.createElement('img');
      newImg.src = data.offer.photos[i];
      newImg.classList.add('popup__photo');
      newImg.style.width = ImgProperties.IMG_WIDTH;
      newImg.style.height = ImgProperties.IMG_HEIGHT;
      newImg.alt = ImgProperties.IMG_ALT;
      cardPhotos.appendChild(newImg);
    }

    cardElement.querySelector('.popup__avatar').src = data.author.avatar;
    var mapFiltersContainer = document.querySelector('.map__filters-container');
    var closeCardBtn = cardElement.querySelector('.popup__close');
    var closeCard = function () {
      var popup = mapFaded.querySelector('.popup');
      popup.remove();
      closeCardBtn.removeEventListener('click', closeCardEnter);
      closeCardBtn.removeEventListener('keydown', closeCardEsc);
    };
    var closeCardEnter = function () {
      closeCard();
    };
    var closeCardEsc = function (evt) {
      if (evt.keyCode === ESCAPE) {
        closeCard();
      }
    };
    closeCardBtn.addEventListener('click', closeCardEnter);
    document.addEventListener('keydown', closeCardEsc);
    mapFaded.insertBefore(cardElement, mapFiltersContainer);

    return cardElement;
  };

  window.card = {
    getPinCard: getPinCard
  };

})();
