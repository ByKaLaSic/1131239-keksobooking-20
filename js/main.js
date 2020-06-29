'use strict';

(function () {
  var HousesTypes = {
    palace: 'Дворец',
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом'
  };

  var ads;
  var pinList = document.querySelector('.map__pins');

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

  var createPinsCards = function (arr) {
    var MAX_SIMILAR_PIN_COUNT = 5;
    if (document.querySelector('.map__card')) {
      document.querySelector('.map__card').remove();
    }

    if (window.sameType) {
      var takeNumber = window.sameType > MAX_SIMILAR_PIN_COUNT ? MAX_SIMILAR_PIN_COUNT : window.sameType;
    } else {
      takeNumber = arr.length > MAX_SIMILAR_PIN_COUNT ? MAX_SIMILAR_PIN_COUNT : arr.length;
    }

    for (var i = 0; i < takeNumber; i++) {
      window.pin.pinFragment.appendChild(window.pin.getCreatePin(arr[i], i));
    }

    for (var j = 0; j < takeNumber; j++) {
      window.card.cardFragment.appendChild(window.card.getCreateCard(arr[j]));
    }

    pinList.appendChild(window.pin.pinFragment);
  };

  var successHandler = function (arrAds) {
    ads = arrAds;
    window.main.ads = ads;
    // createPinsCards(ads);
    window.form.activeState();
    window.filter.filter();
  };

  window.main = {
    HousesTypes: HousesTypes,
    errorHandler: errorHandler,
    successHandler: successHandler,
    ads: ads,
    createPinsCards: createPinsCards
  };
})();
