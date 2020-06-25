'use strict';

(function () {
  var URL = 'https://javascript.pages.academy/keksobooking';
  var StatusCodes = {
    OK: 200
  };

  window.upload = function (data, onSuccess, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCodes.OK) {
        onSuccess(xhr.response);
        return;
      }
      onError();
    });

    xhr.open('POST', URL);
    xhr.send(data);
  };
})();
