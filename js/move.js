'use strict';

(function () {

  window.map.mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var rangeX = +window.map.mainPin.style.left.replace('px', '') + window.map.mainPin.offsetWidth / 2;
      var rangeY = +window.map.mainPin.style.top.replace('px', '') + window.map.mainPin.offsetHeight + 15;

      if (rangeX > 0 && rangeX < 1200 &&
          rangeY > 130 && rangeY < 630) {
        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        // var ost = window.map.mainPin.offsetLeft - window.map.mainPin.offsetWidth / 2 + ', ' + (window.map.mainPin.offsetTop - window.map.mainPin.offsetHeight - 15);

        window.map.mainPin.style.top = (window.map.mainPin.offsetTop - shift.y) + 'px';
        window.map.mainPin.style.left = (window.map.mainPin.offsetLeft - shift.x) + 'px';
        console.log('true');
      } else {
        console.log('false');
      }

      // console.log(rangeX);
      console.log(rangeY);
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
