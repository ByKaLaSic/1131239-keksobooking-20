'use strict';

(function () {
  var filter = function () {
    var form = document.querySelector('.map__filters');
    var type = form.querySelector('#housing-type');
    // var pins = document.querySelectorAll('.map__pin');
    var pinList = document.querySelector('.map__pins');

    var getRank = function (pin) {
      var rank = 0;
      if (pin.offer.type === type.value) {
        rank += 1;
      }
      return rank;
    };

    var namesComparator = function (left, right) {
      if (left.offer.title > right.offer.title) {
        return 1;
      } else if (left < right) {
        return -1;
      } else {
        return 0;
      }
    };

    form.addEventListener('change', function () {
      var adsCopy = window.main.ads.slice();

      adsCopy.sort(function (left, right) {
        var rankDiff = getRank(right) - getRank(left);
        if (rankDiff === 0) {
          rankDiff = namesComparator(left, right);
        }
        return rankDiff;
      });

      var offers = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      for (var i = 0; i < offers.length; i++) {
        offers[i].remove();
      }

      window.sameType = 0;
      for (i = 0; i < window.main.ads.length; i++) {
        if (adsCopy[i].offer.type === type.value) {
          window.sameType += 1;
        }
      }

      var newOffers = [];

      for (i = 0; i < window.sameType; i++) {
        newOffers.push(window.pin.getCreatePin(adsCopy[i], i));
      }

      // window.main.createPinsCards(newOffers);

      // if (window.sameType) {
      var takeNumber = window.sameType > window.main.MAX_SIMILAR_PIN_COUNT ? window.main.MAX_SIMILAR_PIN_COUNT : window.sameType;
      // } else {
      //   takeNumber = window.main.MAX_SIMILAR_PIN_COUNT;
      // }

      for (i = 0; i < takeNumber; i++) {
        pinList.appendChild(newOffers[i]);
        console.log(newOffers[i]);
      }
    });
  };

  window.filter = {
    filter: filter
  };
}());
