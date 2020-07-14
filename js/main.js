'use strict';

(function () {
  var MAX_SIMILAR_PIN_COUNT = 5;
  var HousesTypes = {
    palace: 'Дворец',
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом'
  };

  var ads;
  var pinList = document.querySelector('.map__pins');

  var onError = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'z-index: 100; margin: 0 auto; text-align: center; background-color: red;';
    node.style.position = 'absolute';
    node.style.left = 0;
    node.style.right = 0;
    node.style.fontSize = '30px';

    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  var createPinsCards = function () {
    for (var i = 0; i < MAX_SIMILAR_PIN_COUNT; i++) {
      window.pin.pinFragment.appendChild(window.pin.getCreatePin(ads[i], i));
    }

    for (var j = 0; j < MAX_SIMILAR_PIN_COUNT; j++) {
      window.card.getCreateCard(ads[j]);
    }

    pinList.appendChild(window.pin.pinFragment);
  };

  var onSuccess = function (arrAds) {
    ads = arrAds;
    window.main.ads = ads;
    createPinsCards();
    window.form.activeState();
    window.filter.filter();
  };

  window.main = {
    HousesTypes: HousesTypes,
    onError: onError,
    onSuccess: onSuccess,
    ads: ads,
    createPinsCards: createPinsCards,
    MAX_SIMILAR_PIN_COUNT: MAX_SIMILAR_PIN_COUNT
  };
})();
