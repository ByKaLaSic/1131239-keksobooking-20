'use strict';

(function () {
  var QUANTITY_ADS = 8;
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
  var cards = [];
  var pinFragment = document.createDocumentFragment();
  var mainPin = document.querySelector('.map__pin--main');
  var numberActiveCard;

  var onPopupEscPress = function (evt) {
    if (window.utils.isEscPressed(evt)) {
      evt.preventDefault();
      closePopup();
    }
  };

  var closePopup = function () {
    cards[window.main.numberActiveCard].remove();
    document.removeEventListener('keydown', onPopupEscPress);
  };

  var arrayAds = function () {
    for (var j = 1; j <= QUANTITY_ADS; j++) {
      var ad = {
        author: {
          avatar: 'img/avatars/user0' + j + '.png'
        },
        offer: {
          title: 'Заголовок',
          address: '600, 350',
          price: 7000,
          type: HOUSES_TYPES[window.data.random.getRandomElementFormArray(TYPES)],
          rooms: 3,
          guests: 7,
          checkin: window.data.random.getRandomElementFormArray(TIMES),
          checkout: window.data.random.getRandomElementFormArray(TIMES),
          features: window.data.random.getRandomLengthArr(FEATURES),
          description: 'Описание',
          photos: window.data.random.getRandomLengthArr(PHOTOS)
        },
        location: {
          x: window.data.random.getRandomX(),
          y: window.data.random.getRandomY()
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
    HOUSES_TYPES: HOUSES_TYPES,
    FEATURES: FEATURES,
    ads: ads,
    closePopup: closePopup,
    numberActiveCard: numberActiveCard
  };
})();
