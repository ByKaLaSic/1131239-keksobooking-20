'use strict';

(function () {
  var filter = function () {
    var form = document.querySelector('.map__filters');
    var type = form.querySelector('#housing-type');
    var pins = document.querySelectorAll('.map__pin');

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

      for (var i = 1; i <= pins.length; i++) {
        var pin = pins[i];
        console.log(pin);
        // pin.remove();
      }
      window.createPinsCards(adsCopy);
    });
  };
  window.filter = {
    filter: filter
  };
}());
