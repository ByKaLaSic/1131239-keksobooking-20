'use strict';

(function () {
  var filter = function () {
    var form = document.querySelector('.map__filters');
    var type = form.querySelector('#housing-type');
    var price = form.querySelector('#housing-price');
    var pinList = document.querySelector('.map__pins');

    var Price = {
      LOW: 10000,
      HIGH: 50000
    };

    var getRank = function (element) {
      var rank = 0;

      if (element.offer.type === type.value) {
        rank += 1;
      }

      if (price.value === 'low' && element.offer.price <= Price.LOW) {
        rank += 1;
        console.log(element.offer.price);
      } else
      if (price.value === 'high' && element.offer.price >= Price.HIGH) {
        rank += 1;
        console.log(element.offer.price);
      } else
      if (price.value === 'middle' && element.offer.price >= Price.LOW && element.offer.price <= Price.HIGH) {
        rank += 1;
        console.log(element.offer.price);
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

      var sameType = 0;
      for (i = 0; i < window.main.ads.length; i++) {
        if (adsCopy[i].offer.type === type.value) {
          sameType += 1;
        }
      }

      var newOffers = [];

      window.card.cards = [];

      for (var j = 0; j < sameType; j++) {
        window.card.getCreateCard(adsCopy[j]);
      }

      for (i = 0; i < sameType; i++) {
        newOffers.push(window.pin.getCreatePin(adsCopy[i], i));
      }

      var takeNumber = sameType > window.main.MAX_SIMILAR_PIN_COUNT ? window.main.MAX_SIMILAR_PIN_COUNT : sameType;

      if (document.querySelector('.map__card')) {
        document.querySelector('.map__card').remove();
      }

      for (i = 0; i < takeNumber; i++) {
        pinList.appendChild(newOffers[i]);
      }
    });
  };

  window.filter = {
    filter: filter
  };
}());
