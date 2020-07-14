'use strict';

(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var cardFragment = document.createDocumentFragment();
  var cards = [];

  var closePopup = function () {
    document.querySelector('.map__card').remove();
    document.removeEventListener('keydown', onPopupEscPress);
    if (document.querySelector('.map__pin.map__pin--active')) {
      document.querySelector('.map__pin.map__pin--active').classList.remove('map__pin--active');
    }
  };

  var onPopupEscPress = function (evt) {
    if (window.utils.isEscPressed(evt)) {
      evt.preventDefault();
      closePopup();
    }
  };

  var getCreateCard = function (publicity) {
    var cardElement = cardTemplate.cloneNode(true);
    var blcokPhotos = cardElement.querySelector('.popup__photos');
    var popupFeaturesList = cardElement.querySelector('.popup__features');
    var popupClose = cardElement.querySelector('.popup__close');

    var makeTextElement = function (className, text) {
      cardElement.querySelector(className).textContent = text;
    };

    makeTextElement('.popup__title', publicity.offer.title);
    makeTextElement('.popup__text--address', publicity.offer.address);
    makeTextElement('.popup__text--price', publicity.offer.price + '₽/ночь');
    makeTextElement('.popup__type', window.main.HousesTypes[publicity.offer.type]);
    makeTextElement('.popup__description', publicity.offer.description);

    if (publicity.offer.rooms || publicity.offer.guests) {
      makeTextElement('.popup__text--capacity', publicity.offer.rooms + ' комнаты для ' + publicity.offer.guests + ' гостей');
    } else {
      cardElement.querySelector('.popup__text--capacity').classList.add('hidden');
    }

    if (publicity.offer.checkin !== '0:00' && publicity.offer.checkout !== '0:00') {
      makeTextElement('.popup__text--time', 'Заезд поесле ' + publicity.offer.checkin + ', выезд до ' + publicity.offer.checkout);
    } else {
      cardElement.querySelector('.popup__text--time').classList.add('hidden');
    }

    cardElement.querySelector('.popup__avatar').src = publicity.author.avatar;

    for (var i = 0; i < publicity.offer.features.length; i++) {
      var featureElement = document.createElement('li');
      featureElement.classList.add('popup__feature');
      featureElement.classList.add('popup__feature--' + publicity.offer.features[i]);
      popupFeaturesList.appendChild(featureElement);
    }

    if (publicity.offer.photos.length !== 0) {
      for (i = 0; i < publicity.offer.photos.length; i++) {
        if (i === 0) {
          var photo = blcokPhotos.querySelector('.popup__photo');
          photo.src = publicity.offer.photos[0];
        } else {
          var newPhoto = photo.cloneNode();
          newPhoto.src = publicity.offer.photos[i];
          blcokPhotos.appendChild(newPhoto);
        }
      }
    } else {
      blcokPhotos.classList.add('hidden');
    }

    window.card.cards.push(cardElement);

    popupClose.addEventListener('click', function () {
      closePopup();
    });

    return cardElement;
  };

  window.card = {
    cardFragment: cardFragment,
    closePopup: closePopup,
    onPopupEscPress: onPopupEscPress,
    cards: cards,
    getCreateCard: getCreateCard
  };
})();
