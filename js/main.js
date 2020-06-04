'use strict';

var map = document.querySelector('.map');
map.classList.remove('map--faded');
var MIN_PIN_Y = 130;
var MAX_PIN_Y = 630;
var QUANTITY_ADS = 8;
var TIMES = [
  '12:00',
  '13:00',
  '14:00'
];
var TYPE = ['palace', 'flat', 'house', 'bungalo'];
var PHOTOS = [
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

var getRandomLengthArr = function (arr) {
  var arrlength = Math.floor(Math.random() * arr.length);
  var newArr = [];
  for (var k = 0; k < arrlength; k++) {
    newArr.push(arr[k]);
  }
  return newArr;
};

var getRandomLineArr = function (arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

var getRandomX = function () {
  var pinX = Math.floor(Math.random() * map.offsetWidth);
  return pinX;
};

var getRandomY = function () {
  var pinY = Math.floor(Math.random() * (MAX_PIN_Y - MIN_PIN_Y)) + MIN_PIN_Y;
  return pinY;
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
        'price': 3000,
        'type': getRandomLineArr(TYPE),
        'rooms': 5,
        'guests': 7,
        'checkin': getRandomLineArr(TIMES),
        'checkout': getRandomLineArr(TIMES),
        'features': getRandomLengthArr(FEATURES),
        'description': 'Описание',
        'photos': getRandomLengthArr(PHOTOS)
      },
      'location': {
        'x': getRandomX(),
        'y': getRandomY()
      }
    };
    ads.push(ad);
  }
};

var getCreateElement = function (publicity) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.style.left = publicity.location.x - 25 + 'px';
  pinElement.style.top = publicity.location.y - 70 + 'px';
  pinElement.children[0].src = publicity.author.avatar;
  pinElement.children[0].alt = publicity.offer.title;

  return pinElement;
};

arrayAds();

for (var j = 0; j < ads.length; j++) {
  pinFragment.appendChild(getCreateElement(ads[j]));
}

pinList.appendChild(pinFragment);
