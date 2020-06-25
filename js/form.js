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
  var resetButton = document.querySelector('.ad-form__reset');
  var success = document.querySelector('#success').content.querySelector('.success');
  var error = document.querySelector('#error').content.querySelector('.error');
  var main = document.querySelector('main');
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
      if (this[window.main.HousesTypes[type.value]] > price.value) {
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
    price.placeholder = selectPriceValidation[window.main.HousesTypes[type.value]];
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

  var onSuccessEscPress = function (evt) {
    if (window.utils.isEscPressed(evt)) {
      evt.preventDefault();
      closeSuccess();
    }
  };

  var onErrorEscPress = function (evt) {
    if (window.utils.isEscPressed(evt)) {
      evt.preventDefault();
      closeError();
    }
  };

  var closeSuccess = function () {
    main.removeChild(success);
    document.removeEventListener('keydown', onSuccessEscPress);
  };

  var closeError = function () {
    main.removeChild(error);
    document.removeEventListener('keydown', onErrorEscPress);
  };

  success.addEventListener('click', function () {
    closeSuccess();
  });

  error.addEventListener('click', function () {
    closeError();
  });

  var successHandler = function () {
    main.append(success);
    document.addEventListener('keydown', onSuccessEscPress);
    reverseActiveState(reset);
  };

  var errorHandler = function () {
    main.append(error);
    document.addEventListener('keydown', onErrorEscPress);
  };

  adForm.addEventListener('submit', function (evt) {
    window.upload(new FormData(adForm), successHandler, errorHandler);
    evt.preventDefault();
  });

  var activeState = function () {
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
  };

  var reverseActiveState = function (reset) {
    map.classList.add('map--faded');
    adForm.classList.add('ad-form--disabled');
    var pins = document.querySelectorAll('.map__pin');

    for (i = 0; i < filterFormChildren.length; i++) {
      filterFormChildren[i].setAttribute('disabled', 'true');
    }

    for (i = 0; i < fieldsetAdForm.length; i++) {
      fieldsetAdForm[i].setAttribute('disabled', 'true');
    }

    for (i = 1; i < pins.length; i++) {
      pinList.removeChild(pins[i]);
    }

    window.map.mainPin.style.top = 375 + 'px';
    window.map.mainPin.style.left = 570 + 'px';
    reset();
    address.value = mainPin.offsetLeft + mainPin.offsetWidth / 2 + ', ' + (mainPin.offsetTop + mainPin.offsetHeight / 2);
  };

  var reset = function () {
    adForm.reset();
    address.value = mainPin.offsetLeft + mainPin.offsetWidth / 2 + ', ' + (mainPin.offsetTop + mainPin.offsetHeight + ANGLE_HEIGHT_MAIN_PIN);
  };

  resetButton.addEventListener('click', function () {
    reset();
  });

  window.form = {
    activeState: activeState,
    address: address,
    ANGLE_HEIGHT_MAIN_PIN: ANGLE_HEIGHT_MAIN_PIN
  };
})();
