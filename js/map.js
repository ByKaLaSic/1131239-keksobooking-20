'use strict';

(function () {
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');

  var onMainPinPress = function () {
    mainPin.removeEventListener('keydown', onEnterPress);
    mainPin.removeEventListener('mousedown', onLeftButtonMousePress);
    window.load(window.main.successHandler, window.main.errorHandler);
  };

  var onEnterPress = function (evt) {
    if (window.utils.isEnterPressed(evt)) {
      evt.preventDefault();
      onMainPinPress();
    }
  };

  var onLeftButtonMousePress = function (evt) {
    if (window.utils.isLeftButtonPressed(evt)) {
      evt.preventDefault();
      onMainPinPress();
    }
  };

  mainPin.addEventListener('keydown', onEnterPress);
  mainPin.addEventListener('mousedown', onLeftButtonMousePress);

  window.map = {
    mainPin: mainPin,
    map: map,
    onEnterPress: onEnterPress,
    onLeftButtonMousePress: onLeftButtonMousePress
  };
})();
