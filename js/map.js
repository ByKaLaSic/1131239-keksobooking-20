'use strict';

(function () {
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  mainPin.addEventListener('keydown', function (evt) {
    if (window.utils.isEnterPressed(evt)) {
      window.load(window.main.successHandler, window.main.errorHandler);
    }
  });

  mainPin.addEventListener('mousedown', function (evt) {
    if (window.utils.isLeftButtonPressed(evt)) {
      window.load(window.main.successHandler, window.main.errorHandler);
    }
  });
  window.map = {
    mainPin: mainPin,
    map: map
  };
})();
