'use strict';

(function () {
  var ANGLE_HEIGHT_MAIN_PIN = 15;
  var map = document.querySelector('.map');
  var mainPin = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var fieldsetAdForm = adForm.querySelectorAll('fieldset');
  var filterForm = document.querySelector('.map__filters');
  var filterFormChildren = filterForm.children;
  var roomNumber = adForm.querySelector('#room_number');
  var capacity = adForm.querySelector('#capacity');
  var type = adForm.querySelector('#type');
  var price = adForm.querySelector('#price');
  var timein = adForm.querySelector('#timein');
  var timeout = adForm.querySelector('#timeout');
  var address = document.querySelector('#address');
  address.value = mainPin.offsetLeft + mainPin.offsetWidth / 2 + ', ' + (mainPin.offsetTop + mainPin.offsetHeight / 2);
  var pinList = document.querySelector('.map__pins');
  var SelectGuestsValidation = {
    1: '1',
    2: '1, 2',
    3: '1, 2, 3',
    100: '0',
    setCustomValidity: function () {
      if (this[roomNumber.value].indexOf(capacity.value) === -1) {
        capacity.setCustomValidity('Кол-во гостей не должно превышать кол-во комнат. "Нет гостей" только для 100 комнат');
      } else {
        capacity.setCustomValidity('');
      }
    }
  };

  SelectGuestsValidation.setCustomValidity();

  roomNumber.addEventListener('change', function () {
    SelectGuestsValidation.setCustomValidity();
  });

  capacity.addEventListener('change', function () {
    SelectGuestsValidation.setCustomValidity();
  });

  var selectPriceValidation = {
    Бунгало: '0',
    Квартира: '1000',
    Дом: '5000',
    Дворец: '10000',
    setCustomValidity: function () {
      if (this[window.main.HOUSES_TYPES[type.value]] > price.value) {
        price.setCustomValidity('Маленькая стоимость');
        return;
      }
      price.setCustomValidity('');
    }
  };

  price.addEventListener('change', function () {
    selectPriceValidation.setCustomValidity();
    var MAX_PRICE = 1000000;
    if (price.value > MAX_PRICE) {
      price.setCustomValidity('Цена должна быть не больше 1000000');
    }
  });

  type.addEventListener('change', function () {
    selectPriceValidation.setCustomValidity();
    price.placeholder = selectPriceValidation[window.main.HOUSES_TYPES[type.value]];
  });

  timein.addEventListener('change', function () {
    timeout.value = timein.value;
  });

  timeout.addEventListener('change', function () {
    timein.value = timeout.value;
  });

  for (var i = 0; i < filterFormChildren.length; i++) {
    filterFormChildren[i].setAttribute('disabled', 'true');
  }

  for (i = 0; i < fieldsetAdForm.length; i++) {
    fieldsetAdForm[i].setAttribute('disabled', 'true');
  }

  adForm.addEventListener('submit', function (evt) {
    window.upload(new FormData(adForm), function () {
      // userDialog.classList.add('hidden');
      console.log('изи');
    });
    evt.preventDefault();
  });

  window.form = {
    activeState: function () {
      map.classList.remove('map--faded');
      adForm.classList.remove('ad-form--disabled');
      pinList.appendChild(window.pin.pinFragment);
      address.value = mainPin.offsetLeft + mainPin.offsetWidth / 2 + ', ' + (mainPin.offsetTop + mainPin.offsetHeight + ANGLE_HEIGHT_MAIN_PIN);

      for (i = 0; i < fieldsetAdForm.length; i++) {
        fieldsetAdForm[i].removeAttribute('disabled');
      }

      for (i = 0; i < filterFormChildren.length; i++) {
        filterFormChildren[i].removeAttribute('disabled');
      }
    },
    address: address,
    ANGLE_HEIGHT_MAIN_PIN: ANGLE_HEIGHT_MAIN_PIN
  };
})();
