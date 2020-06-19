'use strict';

(function () {
  var MIN_PIN_Y = 130;
  var MAX_PIN_Y = 630;
  var map = document.querySelector('.map');

  window.data = {
    random: {
      getRandomLengthArr: function (arr) {
        var arrlength = Math.round(Math.random() * arr.length);
        var newArr = [];
        for (var i = 0; i < arrlength; i++) {
          newArr.push(arr[i]);
        }
        return newArr;
      },
      getRandomElementFormArray: function (arr) {
        return arr[Math.floor(Math.random() * arr.length)];
      },
      getRandomX: function () {
        var pinX = Math.floor(Math.random() * map.offsetWidth);
        return pinX;
      },
      getRandomY: function () {
        var pinY = Math.floor(Math.random() * (MAX_PIN_Y - MIN_PIN_Y)) + MIN_PIN_Y;
        return pinY;
      }
    }
  };
})();
