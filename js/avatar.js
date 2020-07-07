'use strict';

(function () {
  var FILE_TYPES = ['jpeg', 'png'];

  var form = document.querySelector('.ad-form');
  var fileUserPhoto = form.querySelector('.ad-form-header__input');
  var fileApartmentPhoto = form.querySelector('.ad-form__input');
  // var fileChooser = document.querySelector('.upload input[type=file]');
  var userPreview = form.querySelector('.ad-form-header__preview');
  var apartmentPreview = form.querySelector('.ad-form__photo');
  // var preview = document.querySelector('.setup-user-pic');

  fileUserPhoto.addEventListener('change', function () {
    var file = fileUserPhoto.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        userPreview.querySelector('img').src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });

  fileApartmentPhoto.addEventListener('change', function () {
    var file = fileApartmentPhoto.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        apartmentPreview.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
})();
