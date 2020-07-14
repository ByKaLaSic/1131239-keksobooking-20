'use strict';

(function () {
  var filter = function () {
    var Price = {
      LOW: 10000,
      HIGH: 50000
    };
    var form = document.querySelector('.map__filters');
    var type = form.querySelector('#housing-type');
    var price = form.querySelector('#housing-price');
    var rooms = form.querySelector('#housing-rooms');
    var guests = form.querySelector('#housing-guests');
    var features = form.querySelectorAll('.map__checkbox');
    var pinList = document.querySelector('.map__pins');

    var getRank = function (element) {
      var rank = 0;
      var elementFeatures = '';
      var booleanFeatures = true;

      if (element.offer.type === type.value) {
        rank += 1;
      }

      for (var k = 0; k < element.offer.features.length; k++) {
        elementFeatures += element.offer.features[k] + ' ';
      }

      for (var i = 0; i < features.length; i++) {
        if (features[i].checked) {
          if (elementFeatures.indexOf(features[i].value) === -1) {
            booleanFeatures = false;
          }
        }
      }

      if (booleanFeatures) {
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

    var updatePinsCards = function () {
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

      var numberOfObjects = 0;

      for (i = 0; i < window.main.MAX_SIMILAR_PIN_COUNT; i++) {
        if ((adsCopy[i].offer.type === type.value || type.value === 'any') &&
            (String(adsCopy[i].offer.rooms) === rooms.value || rooms.value === 'any') &&
            (String(adsCopy[i].offer.guests) === guests.value || guests.value === 'any') &&
            ((price.value === 'low' && adsCopy[i].offer.price <= Price.LOW) ||
             (price.value === 'high' && adsCopy[i].offer.price >= Price.HIGH) ||
             (price.value === 'middle' && adsCopy[i].offer.price >= Price.LOW && adsCopy[i].offer.price <= Price.HIGH) || price.value === 'any')) {
          var elementFeatures = '';
          var booleanFeatures = true;

          for (var k = 0; k < adsCopy[i].offer.features.length; k++) {
            elementFeatures += adsCopy[i].offer.features[k] + ' ';
          }

          for (var j = 0; j < features.length; j++) {
            if (features[j].checked) {
              if (elementFeatures.indexOf(features[j].value) === -1) {
                booleanFeatures = false;
              }
            }
          }

          if (booleanFeatures) {
            numberOfObjects += 1;
          }
        }
      }

      var newOffers = [];

      window.card.cards = [];

      for (j = 0; j < numberOfObjects; j++) {
        window.card.getCreateCard(adsCopy[j]);
      }

      for (i = 0; i < numberOfObjects; i++) {
        newOffers.push(window.pin.getCreatePin(adsCopy[i], i));
      }

      if (document.querySelector('.map__card')) {
        window.card.closePopup();
      }

      for (i = 0; i < numberOfObjects; i++) {
        pinList.appendChild(newOffers[i]);
      }
    };

    form.addEventListener('change', function () {
      window.debounce(updatePinsCards)();
    });
  };

  window.filter = {
    filter: filter
  };
}());
