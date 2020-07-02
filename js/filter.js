'use strict';

(function () {
  var filter = function () {
    var form = document.querySelector('.map__filters');
    var type = form.querySelector('#housing-type');
    var price = form.querySelector('#housing-price');
    var rooms = form.querySelector('#housing-rooms');
    var guests = form.querySelector('#housing-guests');
    var features = form.querySelectorAll('.map__checkbox');
    var pinList = document.querySelector('.map__pins');

    var Price = {
      LOW: 10000,
      HIGH: 50000
    };

    var getRank = function (element) {
      var rank = 0;
      var selectedFeatures = '';
      var elementFeatures = '';

      if (element.offer.type === type.value) {
        rank += 1;
      }

      for (var i = 0; i < features.length; i++) {
        if (features[i].checked) {
          selectedFeatures += features[i].value + ' ';
        }
      }

      for (var k = 0; k < element.offer.features.length; k++) {
        elementFeatures += element.offer.features[k] + ' ';
      }

      if (elementFeatures.indexOf(selectedFeatures) !== -1) {
        rank += 1;
      }

      if (price.value === 'low' && element.offer.price <= Price.LOW) {
        rank += 1;
      } else
      if (price.value === 'high' && element.offer.price >= Price.HIGH) {
        rank += 1;
      } else
      if (price.value === 'middle' && element.offer.price >= Price.LOW && element.offer.price <= Price.HIGH) {
        rank += 1;
      }

      if (String(element.offer.rooms) === rooms.value) {
        rank += 1;
      }

      if (String(element.offer.guests) === guests.value) {
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

    var updateWizards = function () {
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

      var newOffers = [];

      window.card.cards = [];

      for (var j = 0; j < window.main.MAX_SIMILAR_PIN_COUNT; j++) {
        window.card.getCreateCard(adsCopy[j]);
      }

      for (i = 0; i < window.main.MAX_SIMILAR_PIN_COUNT; i++) {
        newOffers.push(window.pin.getCreatePin(adsCopy[i], i));
      }

      if (document.querySelector('.map__card')) {
        document.querySelector('.map__card').remove();
      }

      for (i = 0; i < window.main.MAX_SIMILAR_PIN_COUNT; i++) {
        pinList.appendChild(newOffers[i]);
      }
    };

    form.addEventListener('change', function () {
      updateWizards();
    });
  };

  window.filter = {
    filter: filter
  };
}());
