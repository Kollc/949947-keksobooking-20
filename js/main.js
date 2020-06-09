'use strict';

var TOTAL_ADS = 8;
var HEIGHT_ADS = 70;
var WIDTH_ADS = 50;

// данные объявлений
var OPTIONS = {
  TITLES: [
    'Большая уютная квартира',
    'Маленькая неуютная квартира',
    'Огромный прекрасный дворец',
    'Маленький ужасный дворец',
    'Красивый гостевой домик',
    'Некрасивый негостеприимный домик',
    'Уютное бунгало далеко от моря',
    'Неуютное бунгало по колено в воде'
  ],
  DESCRIPTION: [
    'Очень все хорошо',
    'Очень все плохо',
    'Очень даже все нормально',
    'Вчера ночью сдуло крышу',
    'Отопление спичками',
    'Элитный пентхаус в центре города',
    'Много кокосовых пальм вокруг',
    'Красивые соседки'
  ],
  TYPES: [
    'palace',
    'flat',
    'house',
    'bungalo'
  ],
  CHECKINS: [
    '12:00',
    '13:00',
    '14:00'
  ],
  CHECKOUTS: [
    '12:00',
    '13:00',
    '14:00'
  ],
  FEATURES: [
    'wifi',
    'dishwasher',
    'parking',
    'washer',
    'elevator',
    'conditioner'
  ],
  PHOTOS: [
    'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
    'http://o0.github.io/assets/images/tokyo/hotel3.jpg'
  ],
  GUESTS: {
    MIN: 1,
    MAX: 15
  },
  ROOMS: {
    MIN: 1,
    MAX: 5
  },
  PRICE: {
    MIN: 1000,
    MAX: 1000000
  },
  LOCATION: {
    X: {
      MIN: 300,
      MAX: 900
    },
    Y: {
      MIN: 130,
      MAX: 630
    }
  }
};

// функция возращает рандомное число в определенном интервале
var randomGenerate = function (min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
};

// Функция создает объект с данными одного объявления
var createAdsObj = function (i) {
  var adsObj = {
    'author': {
      'avatar': 'img/avatars/user' + (i < 10 ? '0' : '') + (i + 1) + '.png'
    },
    'offer': {
      'title': OPTIONS.TITLES[randomGenerate(0, OPTIONS.TITLES.length)],
      'address': randomGenerate(OPTIONS.LOCATION.X.MIN, OPTIONS.LOCATION.X.MAX) + ',' + randomGenerate(OPTIONS.LOCATION.Y.MIN, OPTIONS.LOCATION.Y.MAX),
      'price': randomGenerate(OPTIONS.PRICE.MIN, OPTIONS.PRICE.MAX),
      'type': OPTIONS.FEATURES[randomGenerate(0, OPTIONS.FEATURES.length)],
      'rooms': randomGenerate(OPTIONS.ROOMS.MIN, OPTIONS.ROOMS.MAX),
      'guests': randomGenerate(OPTIONS.GUESTS.MIN, OPTIONS.GUESTS.MAX),
      'checkin': OPTIONS.CHECKINS[randomGenerate(0, OPTIONS.CHECKINS.length)],
      'checkout': OPTIONS.CHECKOUTS[randomGenerate(0, OPTIONS.CHECKOUTS.length)],
      'features': OPTIONS.FEATURES[randomGenerate(0, OPTIONS.FEATURES.length)],
      'description': OPTIONS.DESCRIPTION[randomGenerate(0, OPTIONS.DESCRIPTION.length)],
      'photos': OPTIONS.PHOTOS[randomGenerate(0, OPTIONS.PHOTOS.length)],
    },
    'location': {
      'x': randomGenerate(OPTIONS.LOCATION.X.MIN, OPTIONS.LOCATION.X.MAX),
      'y': randomGenerate(OPTIONS.LOCATION.Y.MIN, OPTIONS.LOCATION.Y.MAX),
    }
  };

  return adsObj;
};

// Функция добавляет метки объявлений в DOM
var addAds = function () {

  var fragment = document.createDocumentFragment();
  var mapPins = document.querySelector('.map__pins'); // блок с картой, куда нужно добавить объявления
  document.querySelector('.map').classList.remove('map--faded'); // делаем карту активной
  var templateLabel = document.querySelector('#pin').content.querySelector('.map__pin'); // получаем шаблон из верстки

  for (var i = 0; i < TOTAL_ADS; i++) {
    var elem = templateLabel.cloneNode(true);
    elem.querySelector('img').src = createAdsObj(i).author.avatar;
    elem.querySelector('img').alt = createAdsObj(i).offer.title;
    elem.style.left = (createAdsObj(i).location.x - WIDTH_ADS / 2) + 'px'; // устанавливаем координаты метки с учетом ее размеров
    elem.style.top = (createAdsObj(i).location.y - HEIGHT_ADS) + 'px'; // устанавливаем координаты метки с учетом ее размеров

    fragment.appendChild(elem);
  }
  mapPins.appendChild(fragment);
};


addAds();
