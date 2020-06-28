'use strict';

(function () {
  var form = document.querySelector('.map__filters');
  var type = form.querySelector('#housing-type');

  form.addEventListener('change', function () {
    console.log(type);
  });
}());
