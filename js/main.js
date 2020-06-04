'use strict';

var ads = [];
var pinFragment = document.createDocumentFragment();
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');
var pins = document.querySelector('.map__pins');
var photos = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
document.querySelector('.map').classList.remove('map--faded');

var randomLength = function (arr) {
  var length = Math.floor(Math.random() * arr.length);
  var variable = [];
  for (var k = 0; k < length.length; k++) {
    variable.push(arr[k]);
  }
  return variable;
};

var getArrayAds = function () {
  for (var i = 1; i <= 8; i++) {
    var ad = {
      'author': {
        'avatar': 'img/avatars/user' + ('0' + i) + '.png'
      },
      'offer': {
        'title': 'Заголовок',
        'address': '600, 350',
        'price': 3000,
        'type': 'house',
        'rooms': 5,
        'guests': 7,
        'checkin': '13:00',
        'checkout': '14:00',
        'features': randomLength(features),
        'description': 'Описание',
        'photos': randomLength(photos)
      },
      'location': {
        'x': Math.floor(Math.random() * 500) + 130,
        'y': Math.floor(Math.random() * 500) + 130
      }
    };
    ads.push(ad);
  }
};

var completionHTML = function () {
  for (var j = 0; j < ads.length; j++) {
    var pinElement = pinTemplate.cloneNode(true);
    pinElement.style.left = ads[j].location.x + 50 + 'px';
    pinElement.style.top = ads[j].location.y + 70 + 'px';
    pinElement.children[0].src = ads[j].author.avatar;
    pinElement.children[0].alt = ads[j].offer.title;
    pinFragment.appendChild(pinElement);
    pins.appendChild(pinFragment);
  }
};

getArrayAds();
completionHTML();
