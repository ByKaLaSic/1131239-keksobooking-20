'use strict';

(function () {
  var FILE_TYPES = ['jpeg', 'png', 'jpg'];

  var form = document.querySelector('.ad-form');
  var fileUserPhoto = form.querySelector('.ad-form-header__input');
  var fileApartmentPhoto = form.querySelector('.ad-form__input');
  var userPreview = form.querySelector('.ad-form-header__preview');
  var apartmentPreview = form.querySelector('.ad-form__photo');
  var photoСounter = 0;

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
        var image = document.createElement('img');
        image.src = reader.result;
        image.width = 70;
        image.height = 70;
        if (photoСounter > 0) {
          var apartmentPreviewClone = apartmentPreview.cloneNode(false);
          apartmentPreviewClone.appendChild(image);
          apartmentPreview.insertAdjacentElement('beforebegin', apartmentPreviewClone);
        } else {
          apartmentPreview.appendChild(image);
        }
        photoСounter++;
      });

      reader.readAsDataURL(file);
    }
  });
})();
