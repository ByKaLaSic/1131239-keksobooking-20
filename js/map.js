'use strict';

(function () {
  window.main.mainPin.addEventListener('keydown', function (evt) {
    if (window.utils.isEnterPressed(evt)) {
      window.form.activeState();
    }
  });

  window.main.mainPin.addEventListener('mousedown', function (evt) {
    if (window.utils.isLeftButtonPressed(evt)) {
      window.form.activeState();
    }
  });
})();
