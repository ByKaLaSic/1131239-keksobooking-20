'use strict';

(function () {
  var Keys = {
    ENTER: 13,
    ESCAPE: 27
  };
  var MouseKeys = {
    LEFT_BUTTON: 0
  };
  var leftButtonPressed = function (evt) {
    return evt.button === MouseKeys.LEFT_BUTTON;
  };
  var isEscPressed = function (evt) {
    return evt.keyCode === Keys.ESCAPE;
  };
  var isEnterPressed = function (evt) {
    return evt.keyCode === Keys.ENTER;
  };
  window.utils = {
    leftButtonPressed: leftButtonPressed,
    isEscPressed: isEscPressed,
    isEnterPressed: isEnterPressed
  };
})();
