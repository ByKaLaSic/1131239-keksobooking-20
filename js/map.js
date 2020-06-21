'use strict';

(function () {
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  mainPin.addEventListener('keydown', function (evt) {
    if (window.utils.isEnterPressed(evt)) {
      window.form.activeState();
    }
  });

  mainPin.addEventListener('mousedown', function (evt) {
    if (window.utils.isLeftButtonPressed(evt)) {
      window.form.activeState();
    }
  });
  window.map = {
    mainPin: mainPin,
    map: map
  };
})();
