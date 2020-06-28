'use strict';

(function () {
  var form = document.querySelector('.map__filters');
  var type = form.querySelector('#housing-type');

  var getRank = function (pin) {
    var rank = 0;

    if (pin.offer.type === type.value) {
      rank += 1;
    }

    return rank;
  };

  // var namesComparator = function (left, right) {
  //   if (left > right) {
  //     return 1;
  //   } else if (left < right) {
  //     return -1;
  //   } else {
  //     return 0;
  //   }
  // };

  form.addEventListener('change', function () {
    var s = window.main.ads.sort(function (left, right) {
      var rankDiff = getRank(right) - getRank(left);
      if (rankDiff === 0) {
        // rankDiff = namesComparator(left.name, right.name);
        console.log('Говно');
      }
    });
    console.log(s);
  });
}());
