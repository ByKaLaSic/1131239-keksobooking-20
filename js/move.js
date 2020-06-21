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

      var angleForX = window.map.mainPin.offsetLeft + window.map.mainPin.offsetWidth / 2;
      var angleForY = window.map.mainPin.offsetTop + window.map.mainPin.offsetHeight + window.form.ANGLE_HEIGHT_MAIN_PIN;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (angleForX > MIN_RANGE_X && angleForX < MAX_RANGE_X &&
        angleForY > MIN_RANGE_Y && angleForY < MAX_RANGE_Y) {

        window.map.mainPin.style.top = (window.map.mainPin.offsetTop - shift.y) + 'px';
        window.map.mainPin.style.left = (window.map.mainPin.offsetLeft - shift.x) + 'px';
      } else {
        switch (false) {
          case angleForX > MIN_RANGE_X:
            window.map.mainPin.style.left = window.map.mainPin.offsetWidth / -2 + 'px';
            break;
          case angleForX < MAX_RANGE_X:
            window.map.mainPin.style.left = window.map.map.offsetWidth - window.map.mainPin.offsetWidth / 2 - 1 + 'px';
            // break;
          // case 'Зима':
            // answer = 'Тельняжку';
            // break;
          // case 'Лето':
            // answer = 'Майку';
            // break;
          // case 'Весна':
            // answer = 'Плащ';
            // break;
        }
      }

      window.form.address.value = angleForX + ', ' + angleForY;
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
