'use strict';

(function () {
  var HousesTypes = {
    palace: 'Дворец',
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом'
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
    var ads = arrAds;

    (function () {
      for (var i = 0; i < ads.length; i++) {
        window.pin.pinFragment.appendChild(window.pin.getCreatePin(ads[i], i));
      }
    })();

    (function () {
      for (var j = 0; j < ads.length; j++) {
        window.card.cardFragment.appendChild(window.card.getCreateCard(ads[j]));
      }
    })();

    window.form.activeState();
  };

  window.main = {
    HousesTypes: HousesTypes,
    errorHandler: errorHandler,
    successHandler: successHandler
  };
})();
