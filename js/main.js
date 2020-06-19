'use strict';

(function () {
  // var QUANTITY_ADS = 8;
  // var TIMES = [
  //   '12:00',
  //   '13:00',
  //   '14:00'
  // ];
  // var TYPES = [
  //   'palace',
  //   'flat',
  //   'house',
  //   'bungalo'
  // ];
  var HOUSES_TYPES = {
    palace: 'Дворец',
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом'
  };
  // var PHOTOS = [
  //   'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  //   'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  //   'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var FEATURES = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'];

  var ads = [];
  var cards = [];
  var pinFragment = document.createDocumentFragment();
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

  // var successHandler = function (wizards) {
  //   var fragment = document.createDocumentFragment();

  //   for (var i = 0; i < MAX_SIMILAR_WIZARD_COUNT; i++) {
  //     fragment.appendChild(renderWizard(wizards[i]));
  //   }
  //   similarListElement.appendChild(fragment);

  //   userDialog.querySelector('.setup-similar').classList.remove('hidden');
  // };

  var errorHandler = function (errorMessage) {
    return errorMessage;
  };

  var successHandler = function (arrAds) {
    for (var j = 0; j < arrAds.length; j++) {
      ads.push(arrAds[j]);
    }
    console.log(ads);
    var createPinFragment = function () {
      for (var i = 0; i < window.main.ads.length; i++) {
        window.main.pinFragment.appendChild(window.pin.getCreatePin(window.main.ads[i], i));
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
    pinFragment: pinFragment,
    mainPin: mainPin,
    onPopupEscPress: onPopupEscPress,
    HOUSES_TYPES: HOUSES_TYPES,
    FEATURES: FEATURES,
    ads: ads,
    closePopup: closePopup,
    numberActiveCard: numberActiveCard
  };
})();
