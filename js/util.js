'use strict';

(function () {
  var Keys = {
    ENTER: 13,
    ESCAPE: 27
  };
  var MouseKeys = {
    LEFT_BUTTON: 0
  };
  window.util = {
    leftButtonPressed: function (evt) {
      return evt.button === MouseKeys.LEFT_BUTTON;
    },
    isEscPressed: function (evt) {
      return evt.keyCode === Keys.ESCAPE;
    },
    isEnterPressed: function (evt) {
      return evt.keyCode === Keys.ENTER;
    }
  };
})();
