'use strict';

(function () {
  var PIN_WIDTH = 50;
  var PIN_HEIGHT = 70;
  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
  var adFilter = document.querySelector('.map__filters-container');

  window.pin = {
    getCreatePin: function (publicity, NumberArr) {

      var pinElement = pinTemplate.cloneNode(true);
      pinElement.style.left = publicity.location.x - PIN_WIDTH / 2 + 'px';
      pinElement.style.top = publicity.location.y - PIN_HEIGHT + 'px';
      pinElement.querySelector('img').src = publicity.author.avatar;
      pinElement.querySelector('img').alt = publicity.offer.title;

      var openPopup = function () {
        for (var i = 0; i < window.main.cards.length; i++) {
          window.main.cards[i].remove();
        }
        window.data.map.insertBefore(window.main.cards[NumberArr], adFilter);
        document.addEventListener('keydown', window.main.onPopupEscPress);
      };

      pinElement.addEventListener('click', function () {
        window.numberActiveCard = NumberArr;
        openPopup();
      });

      return pinElement;
    }
  };
})();
