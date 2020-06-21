'use strict';

(function () {

  var MIN_RANGE_X = 0;
  var MAX_RANGE_X = window.map.map.offsetWidth;
  var MIN_RANGE_Y = 130;
  var MAX_RANGE_Y = 630;

  window.map.mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var rangeX = window.map.mainPin.offsetLeft + window.map.mainPin.offsetWidth / 2;
      var rangeY = window.map.mainPin.offsetTop + window.map.mainPin.offsetHeight + 15;

      if (rangeX > MIN_RANGE_X && rangeX < MAX_RANGE_X &&
          rangeY > MIN_RANGE_Y && rangeY < MAX_RANGE_Y) {

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        window.map.mainPin.style.top = (window.map.mainPin.offsetTop - shift.y) + 'px';
        window.map.mainPin.style.left = (window.map.mainPin.offsetLeft - shift.x) + 'px';
      }

      window.form.address.value = rangeX + ', ' + rangeY;
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
