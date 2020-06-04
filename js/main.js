'use strict';

var MIN_PIN_Y = 130;
var MAX_PIN_Y = 630;
var QUANTITY_ADS = 8;
var TIMES = [
  '12:00',
  '13:00',
  '14:00'
];
// var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var TYPES_RUS = ['Дворец', 'Квартира', 'Дом', 'Бунгало'];
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
var ads = [];
var pinFragment = document.createDocumentFragment();
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var pinList = document.querySelector('.map__pins');
var cardFragment = document.createDocumentFragment();
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
var adFilter = document.querySelector('.map__filters-container');
var map = document.querySelector('.map');
map.classList.remove('map--faded');

var random = {
  getRandomLengthArr: function (arr) {
    var arrlength = Math.ceil(Math.random() * arr.length);
    var newArr = [];
    for (var k = 0; k < arrlength; k++) {
      newArr.push(arr[k]);
    }
    return newArr;
  },
  getRandomLineArr: function (arr) {
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
  for (var i = 1; i <= QUANTITY_ADS; i++) {
    var ad = {
      'author': {
        'avatar': 'img/avatars/user' + ('0' + i) + '.png'
      },
      'offer': {
        'title': 'Заголовок',
        'address': '600, 350',
        'price': 7000,
        'type': random.getRandomLineArr(TYPES_RUS),
        'rooms': 3,
        'guests': 7,
        'checkin': random.getRandomLineArr(TIMES),
        'checkout': random.getRandomLineArr(TIMES),
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

var getCreatePin = function (publicity) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style.left = publicity.location.x - 25 + 'px';
  pinElement.style.top = publicity.location.y - 70 + 'px';
  pinElement.querySelector('img').src = publicity.author.avatar;
  pinElement.querySelector('img').alt = publicity.offer.title;

  return pinElement;
};

var createPinFragment = function () {
  arrayAds();
  for (var j = 0; j < ads.length; j++) {
    pinFragment.appendChild(getCreatePin(ads[j]));
  }
};

var getCreateCard = function (publicity) {
  var cardElement = cardTemplate.cloneNode(true);
  var blcokPhotos = cardElement.querySelector('.popup__photos');
  cardElement.querySelector('.popup__title').textContent = publicity.offer.title;
  cardElement.querySelector('.popup__text--address').textContent = publicity.offer.address;
  cardElement.querySelector('.popup__text--price').textContent = publicity.offer.price + '₽/ночь';
  cardElement.querySelector('.popup__type').textContent = publicity.offer.type;
  cardElement.querySelector('.popup__text--capacity').textContent = publicity.offer.rooms + ' комнаты для ' + publicity.offer.guests + ' гостей';
  cardElement.querySelector('.popup__text--time').textContent = 'Заезд поесле ' + publicity.offer.checkin + ', выезд до ' + publicity.offer.checkout;
  cardElement.querySelector('.popup__features').textContent = publicity.offer.features;
  cardElement.querySelector('.popup__description').textContent = publicity.offer.description;
  cardElement.querySelector('.popup__avatar').src = publicity.author.avatar;
  for (var j = 0; j < publicity.offer.photos.length; j++) {
    if (j === 0) {
      var photo = blcokPhotos.querySelector('.popup__photo');
      photo.src = publicity.offer.photos[0];
    } else {
      var newPhoto = photo.cloneNode();
      newPhoto.src = publicity.offer.photos[j];
      blcokPhotos.appendChild(newPhoto);
    }
  }

  return cardElement;
};

var createCardFragment = function () {
  for (var j = 0; j < ads.length; j++) {
    cardFragment.appendChild(getCreateCard(ads[j]));
  }
};

createPinFragment();
createCardFragment();
pinList.appendChild(pinFragment);
map.insertBefore(cardFragment, adFilter);
