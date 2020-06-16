'use strict';

(function () {
  var Keys = {
    ENTER: 13,
    ESCAPE: 27
  };
  var MouseKeys = {
    LEFT_BUTTON: 0
  };
  var isLeftButtonPressed = function (evt) {
    return evt.button === MouseKeys.LEFT_BUTTON;
  };
  var isEscPressed = function (evt) {
    return evt.keyCode === Keys.ESCAPE;
  };
  var isEnterPressed = function (evt) {
    return evt.keyCode === Keys.ENTER;
  };
  window.utils = {
    isLeftButtonPressed: isLeftButtonPressed,
    isEscPressed: isEscPressed,
    isEnterPressed: isEnterPressed
  };
})();
