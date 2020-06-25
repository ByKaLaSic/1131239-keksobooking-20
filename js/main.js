'use strict';

(function () {
  var HousesTypes = {
    palace: 'Дворец',
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом'
  };

  var ads = [];

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
    window.form.activeState();
  };

  window.main = {
    HousesTypes: HousesTypes,
    ads: ads,
    errorHandler: errorHandler,
    successHandler: successHandler
  };
})();
