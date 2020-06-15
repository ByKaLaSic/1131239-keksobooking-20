'use strict';

(function () {
  var QUANTITY_ADS = 8;
  var Times = [
    '12:00',
    '13:00',
    '14:00'
  ];
  var Types = [
    'palace',
    'flat',
    'house',
    'bungalo'
  ];
  var HousesTypes = {
    palace: 'Дворец',
    flat: 'Квартира',
    bungalo: 'Бунгало',
    house: 'Дом'
  };
  var photos = [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
  var Features = [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'];

  var ads = [];
  var cards = [];
  var pinFragment = document.createDocumentFragment();
  var mainPin = document.querySelector('.map__pin--main');

  var onPopupEscPress = function (evt) {
    if (window.utul.isEscPressed(evt)) {
      evt.preventDefault();
      // closePopup();
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
          'type': HousesTypes[window.data.random.getRandomElementFormArray(Types)],
          'rooms': 3,
          'guests': 7,
          'checkin': window.data.random.getRandomElementFormArray(Times),
          'checkout': window.data.random.getRandomElementFormArray(Times),
          'features': window.data.random.getRandomLengthArr(Features),
          'description': 'Описание',
          'photos': window.data.random.getRandomLengthArr(photos)
        },
        'location': {
          'x': window.data.random.getRandomX(),
          'y': window.data.random.getRandomY()
        }
      };
      ads.push(ad);
    }
  };
  window.main = {
    cards: cards,
    pinFragment: pinFragment,
    mainPin: mainPin,
    onPopupEscPress: onPopupEscPress,
    arrayAds: arrayAds,
    HousesTypes: HousesTypes,
    Features: Features,
    ads: ads
  };
})();
