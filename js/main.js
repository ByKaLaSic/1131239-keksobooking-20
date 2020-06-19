'use strict';

(function () {
  var HOUSES_TYPES = {
    palace: 'Дворец',
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом'
  };

  var ads = [];
  var cards = [];
  var mainPin = document.querySelector('.map__pin--main');
  var numberActiveCard;

  var onPopupEscPress = function (evt) {
    if (window.utils.isEscPressed(evt)) {
      evt.preventDefault();
      window.card.closePopup();
    }
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var successHandler = function (arrAds) {
    for (var j = 0; j < arrAds.length; j++) {
      ads.push(arrAds[j]);
    }
    var createPinFragment = function () {
      for (var i = 0; i < window.main.ads.length; i++) {
        window.pin.pinFragment.appendChild(window.pin.getCreatePin(window.main.ads[i], i));
      }
    };
    var createCardFragment = function () {
      for (j = 0; j < window.main.ads.length; j++) {
        window.card.cardFragment.appendChild(window.card.getCreateCard(window.main.ads[j]));
      }
    };

    createPinFragment();
    createCardFragment();
  };

  window.load(successHandler, errorHandler);

  window.main = {
    cards: cards,
    mainPin: mainPin,
    onPopupEscPress: onPopupEscPress,
    HOUSES_TYPES: HOUSES_TYPES,
    ads: ads,
    numberActiveCard: numberActiveCard
  };
})();
