'use strict';

(function () {
  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var cardFragment = document.createDocumentFragment();

  window.card = {
    getCreateCard: function (publicity) {
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
      makeTextElement('.popup__type', window.main.HOUSES_TYPES[publicity.offer.type]);
      makeTextElement('.popup__text--capacity', publicity.offer.rooms + ' комнаты для ' + publicity.offer.guests + ' гостей');
      makeTextElement('.popup__text--time', 'Заезд поесле ' + publicity.offer.checkin + ', выезд до ' + publicity.offer.checkout);
      makeTextElement('.popup__description', publicity.offer.description);
      cardElement.querySelector('.popup__avatar').src = publicity.author.avatar;

      for (var i = 0; i < publicity.offer.features.length; i++) {
        var featureElement = document.createElement('li');
        featureElement.classList.add('popup__feature');
        featureElement.classList.add('popup__feature--' + publicity.offer.features[i]);
        popupFeaturesList.appendChild(featureElement);
      }

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

      window.main.cards.push(cardElement);

      popupClose.addEventListener('click', function () {
        window.main.closePopup();
      });

      return cardElement;
    },
    cardFragment: cardFragment
  };
})();
