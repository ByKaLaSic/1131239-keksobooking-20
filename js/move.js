'use strict';

(function () {
  var MIN_RANGE_X = 0;
  var MAX_RANGE_X = window.map.map.offsetWidth;
  var MIN_RANGE_Y = 130;
  var MAX_RANGE_Y = 630;
  var DEFICIENT = 0.5;

  window.map.mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (window.map.mainPin.offsetLeft - shift.x < MIN_RANGE_X - window.map.mainPin.offsetWidth / 2) {
        window.map.mainPin.style.left = window.map.mainPin.offsetWidth / -2 + 'px';
      } else if (window.map.mainPin.offsetLeft - shift.x > MAX_RANGE_X - window.map.mainPin.offsetWidth / 2) {
        window.map.mainPin.style.left = window.map.offsetWidth - window.map.mainPin.offsetWidth / 2 + 'px';
      } else {
        window.map.mainPin.style.left = (window.map.mainPin.offsetLeft - shift.x) + 'px';
      }

      if (window.map.mainPin.offsetTop + window.map.mainPin.offsetHeight + window.form.ANGLE_HEIGHT_MAIN_PIN - shift.y < MIN_RANGE_Y) {
        window.map.mainPin.style.top = MIN_RANGE_Y - window.map.mainPin.offsetHeight - window.form.ANGLE_HEIGHT_MAIN_PIN + 'px';
      } else if (window.map.mainPin.offsetTop + window.map.mainPin.offsetHeight + window.form.ANGLE_HEIGHT_MAIN_PIN - shift.y > MAX_RANGE_Y) {
        window.map.mainPin.style.top = MAX_RANGE_Y - window.map.mainPin.offsetHeight - window.form.ANGLE_HEIGHT_MAIN_PIN + 'px';
      } else {
        window.map.mainPin.style.top = (window.map.mainPin.offsetTop - shift.y) + 'px';
      }

      window.form.address.value = window.map.mainPin.offsetLeft + Math.round(window.map.mainPin.offsetWidth / 2) + ', ' + (window.map.mainPin.offsetTop + window.map.mainPin.offsetHeight + window.form.ANGLE_HEIGHT_MAIN_PIN);
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
