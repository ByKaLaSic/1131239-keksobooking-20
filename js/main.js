'use strict';

(function () {
  var HousesTypes = {
    palace: 'Дворец',
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом'
  };

  var ads;

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
    var MAX_SIMILAR_PIN_COUNT = 5;
    ads = arrAds;

    window.createPinsCards = function (arr) {
      for (var i = 0; i < MAX_SIMILAR_PIN_COUNT; i++) {
        window.pin.pinFragment.appendChild(window.pin.getCreatePin(arr[i], i));
      }

      for (var j = 0; j < MAX_SIMILAR_PIN_COUNT; j++) {
        window.card.cardFragment.appendChild(window.card.getCreateCard(arr[j]));
      }
    };

    window.main.ads = ads;
    window.createPinsCards(ads);
    window.form.activeState();
    window.filter.filter();
  };

  window.main = {
    HousesTypes: HousesTypes,
    errorHandler: errorHandler,
    successHandler: successHandler,
    ads: ads
  };
})();
