'use strict';

var MIN_PIN_Y = 130;
var MAX_PIN_Y = 630;
var QUANTITY_ADS = 8;
var KEYS = {
  enter: 13,
  esc: 27
};
var MOUSE_KEYS = {
  leftButton: 0
};
var TIMES = [
  '12:00',
  '13:00',
  '14:00'
];
var TYPES = [
  'palace',
  'flat',
  'house',
  'bungalo'
];
var HOUSES_TYPES = {
  palace: 'Дворец',
  flat: 'Квартира',
  bungalo: 'Бунгало',
  house: 'Дом'
};
var photos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'];
var ANGLE_HEIGHT_MAIN_PIN = 15;
var PIN_WIDTH = 50;
var PIN_HEIGHT = 70;
var ads = [];
var cards = [];
var pinFragment = document.createDocumentFragment();
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var pinList = document.querySelector('.map__pins');
var cardFragment = document.createDocumentFragment();
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var adFilter = document.querySelector('.map__filters-container');
var map = document.querySelector('.map');
var adForm = document.querySelector('.ad-form');
var fieldsetAdForm = adForm.querySelectorAll('fieldset');
var filterForm = document.querySelector('.map__filters');
var filterFormChildren = filterForm.children;
var mainPin = document.querySelector('.map__pin--main');
var roomNumber = adForm.querySelector('#room_number');
var capacity = adForm.querySelector('#capacity');
var type = adForm.querySelector('#type');
var price = adForm.querySelector('#price');
var timein = adForm.querySelector('#timein');
var timeout = adForm.querySelector('#timeout');
var address = document.querySelector('#address');
address.setAttribute('disabled', 'true');
address.value = mainPin.offsetLeft - mainPin.offsetWidth / 2 + ', ' + (mainPin.offsetTop - mainPin.offsetHeight / 2);

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
  'Бунгало': '0',
  'Квартира': '1000',
  'Дом': '5000',
  'Дворец': '10000',
  'setCustomValidity': function () {
    if (this[HOUSES_TYPES[type.value]] > price.value) {
      price.setCustomValidity('Маленькая стоимость');
      return;
    }
    price.setCustomValidity('');
  }
};

price.addEventListener('change', function () {
  selectPriceValidation.setCustomValidity();
  var maxPrice = 1000000;
  if (price.value > maxPrice) {
    price.setCustomValidity('Цена должна быть не больше 1000000');
  }
});

type.addEventListener('change', function () {
  selectPriceValidation.setCustomValidity();
  price.placeholder = selectPriceValidation[HOUSES_TYPES[type.value]];
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

var activeState = function () {
  map.classList.remove('map--faded');
  adForm.classList.remove('ad-form--disabled');
  pinList.appendChild(pinFragment);
  address.value = mainPin.offsetLeft - mainPin.offsetWidth / 2 + ', ' + (mainPin.offsetTop - mainPin.offsetHeight - ANGLE_HEIGHT_MAIN_PIN);

  for (i = 0; i < fieldsetAdForm.length; i++) {
    fieldsetAdForm[i].removeAttribute('disabled');
  }

  for (i = 0; i < filterFormChildren.length; i++) {
    filterFormChildren[i].removeAttribute('disabled');
  }
};

var leftButtonPressed = function (evt) {
  return evt.button === MOUSE_KEYS.leftButton;
};

var isEscPressed = function (evt) {
  return evt.keyCode === KEYS.esc;
};

var isEnterPressed = function (evt) {
  return evt.keyCode === KEYS.enter;
};

mainPin.addEventListener('keydown', function (evt) {
  if (isEnterPressed(evt)) {
    activeState();
  }
});

mainPin.addEventListener('mousedown', function (evt) {
  if (leftButtonPressed(evt)) {
    activeState();
  }
});

var random = {
  getRandomLengthArr: function (arr) {
    var arrlength = Math.round(Math.random() * arr.length);
    var newArr = [];
    for (i = 0; i < arrlength; i++) {
      newArr.push(arr[i]);
    }
    return newArr;
  },
  getRandomElementFormArray: function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  },
  getRandomX: function () {
    var pinX = Math.floor(Math.random() * map.offsetWidth);
    return pinX;
  },
  getRandomY: function () {
    var pinY = Math.floor(Math.random() * (MAX_PIN_Y - MIN_PIN_Y)) + MIN_PIN_Y;
    return pinY;
  }
};

var arrayAds = function () {
  for (var j = 1; j <= QUANTITY_ADS; j++) {
    var ad = {
      'author': {
        'avatar': 'img/avatars/user0' + j + '.png'
      },
      'offer': {
        'title': 'Заголовок',
        'address': '600, 350',
        'price': 7000,
        'type': HOUSES_TYPES[random.getRandomElementFormArray(TYPES)],
        'rooms': 3,
        'guests': 7,
        'checkin': random.getRandomElementFormArray(TIMES),
        'checkout': random.getRandomElementFormArray(TIMES),
        'features': random.getRandomLengthArr(FEATURES),
        'description': 'Описание',
        'photos': random.getRandomLengthArr(photos)
      },
      'location': {
        'x': random.getRandomX(),
        'y': random.getRandomY()
      }
    };
    ads.push(ad);
  }
};

var onPopupEscPress = function (evt) {
  if (evt.key === 'Escape') {
    evt.preventDefault();
    // closePopup();
  }
};

var getCreatePin = function (publicity, NumberArr) {

  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style.left = publicity.location.x - PIN_WIDTH / 2 + 'px';
  pinElement.style.top = publicity.location.y - PIN_HEIGHT + 'px';
  pinElement.querySelector('img').src = publicity.author.avatar;
  pinElement.querySelector('img').alt = publicity.offer.title;

  var openPopup = function () {
    for (i = 0; i < cards.length; i++) {
      cards[i].classList.add('hidden');
    }
    cards[NumberArr].classList.remove('hidden');
    document.addEventListener('keydown', onPopupEscPress);
  };

  pinElement.addEventListener('click', function () {
    openPopup();
  });

  return pinElement;
};

var createPinFragment = function () {
  for (i = 0; i < ads.length; i++) {
    pinFragment.appendChild(getCreatePin(ads[i], i));
  }
};

var getCreateCard = function (publicity, NumberArr) {

  var cardElement = cardTemplate.cloneNode(true);
  var blcokPhotos = cardElement.querySelector('.popup__photos');
  var randomFeatures = random.getRandomLengthArr(FEATURES);
  var popupFeaturesList = cardElement.querySelector('.popup__features');
  var popupFeatures = cardElement.querySelectorAll('.popup__feature');
  var popupClose = cardElement.querySelector('.popup__close');

  var makeTextElement = function (className, text) {
    cardElement.querySelector(className).textContent = text;
  };

  makeTextElement('.popup__title', publicity.offer.title);
  makeTextElement('.popup__text--address', publicity.offer.address);
  makeTextElement('.popup__text--price', publicity.offer.price + '₽/ночь');
  makeTextElement('.popup__type', publicity.offer.type);
  makeTextElement('.popup__text--capacity', publicity.offer.rooms + ' комнаты для ' + publicity.offer.guests + ' гостей');
  makeTextElement('.popup__text--time', 'Заезд поесле ' + publicity.offer.checkin + ', выезд до ' + publicity.offer.checkout);
  makeTextElement('.popup__description', publicity.offer.description);
  cardElement.querySelector('.popup__avatar').src = publicity.author.avatar;

  for (i = FEATURES.length - 1; i >= randomFeatures.length; i--) {
    popupFeaturesList.removeChild(popupFeatures[i]);
  }

  for (i = 0; i < publicity.offer.photos.length; i++) {
    if (i === 0) {
      var photo = blcokPhotos.querySelector('.popup__photo');
      photo.src = publicity.offer.photos[0];
    } else {
      var newPhoto = photo.cloneNode();
      newPhoto.src = publicity.offer.photos[i];
      blcokPhotos.appendChild(newPhoto);
    }
  }

  cardElement.classList.add('hidden');
  cards.push(cardElement);

  var closePopup = function () {
    cards[NumberArr].classList.add('hidden');
    document.removeEventListener('keydown', onPopupEscPress);
  };

  popupClose.addEventListener('click', function () {
    closePopup();
  });

  return cardElement;
};

var createCardFragment = function () {
  for (var j = 0; j < ads.length; j++) {
    cardFragment.appendChild(getCreateCard(ads[j], j));
  }
};

// pinList.addEventListener('click', function (evt) {
// });

arrayAds();
createPinFragment();
createCardFragment();
map.insertBefore(cardFragment, adFilter);
