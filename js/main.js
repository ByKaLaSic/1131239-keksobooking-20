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
  var cardFragment = document.createDocumentFragment();
  var numberActiveCard;

  var onPopupEscPress = function (evt) {
    if (window.utils.isEscPressed(evt)) {
      evt.preventDefault();
      closePopup();
    }
  };

  var closePopup = function () {
    cards[window.main.numberActiveCard].remove();
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var errorHandler = function (errorMessage) {
    return errorMessage;
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
        cardFragment.appendChild(window.card.getCreateCard(window.main.ads[j]));
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
    closePopup: closePopup,
    numberActiveCard: numberActiveCard
  };
})();
