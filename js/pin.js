'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var adFilter = document.querySelector('.map__filters-container');
  var map = document.querySelector('.map');
  var pinFragment = document.createDocumentFragment();

  window.pin = {
    getCreatePin: function (publicity, NumberArr) {

      var pinElement = pinTemplate.cloneNode(true);
      pinElement.style.left = publicity.location.x - PIN_WIDTH / 2 + 'px';
      pinElement.style.top = publicity.location.y - PIN_HEIGHT + 'px';
      pinElement.querySelector('img').src = publicity.author.avatar;
      pinElement.querySelector('img').alt = publicity.offer.title;

      var openPopup = function () {
        for (var i = 0; i < window.card.cards.length; i++) {
          window.card.cards[i].remove();
        }
        map.insertBefore(window.card.cards[NumberArr], adFilter);
        document.addEventListener('keydown', window.card.onPopupEscPress);
      };

      pinElement.addEventListener('click', function () {
        window.main.numberActiveCard = NumberArr;
        openPopup();
      });

      return pinElement;
    },
    pinFragment: pinFragment
  };
})();
