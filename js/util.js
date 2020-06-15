'use strict';

(function () {
  var Keys = {
    enter: 13,
    esc: 27
  };
  var MouseKeys = {
    leftButton: 0
  };
  window.util = {
    leftButtonPressed: function (evt) {
      return evt.button === MouseKeys.leftButton;
    },
    isEscPressed: function (evt) {
      return evt.keyCode === Keys.esc;
    },
    isEnterPressed: function (evt) {
      return evt.keyCode === Keys.enter;
    }
  };
})();
