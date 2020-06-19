'use strict';

(function () {
  var cardFragment = document.createDocumentFragment();

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

  var createCardFragment = function () {
    for (var j = 0; j < window.main.ads.length; j++) {
      cardFragment.appendChild(window.card.getCreateCard(window.main.ads[j]));
    }
  };

  createCardFragment();
})();
