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
  TYPES: [{
    palace: 'Дворец'
  },
  {
    flat: 'Квартира'
  },
  {
    house: 'Дом'
  },
  {
    bungalo: 'Бунгало'
  }
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

// Функция проверяет соответстиве элемента в объекте массива и возвращает русифицированную версию (пришлось написать вот это, тк ассоциативные массивы только с ES6)
var russificationTypes = function (obj) {
  var types = ['palace', 'flat', 'house', 'bungalo'];
  var currentType;
  for (var i = 0; i < types.length; i++) {
    if (obj.hasOwnProperty(types[i])) {
      currentType = obj[types[i]];
    }
  }

  return currentType;
};

// Функция заполняет элементы списка текстом или давбляет в src путь к картинкам и удаляет пустые
var createListElement = function (mass, parentElement, SelectorElements, image) {
  if (!image) {
    mass.forEach(function (item) {
      var childElement = parentElement.querySelector(SelectorElements + '--' + item);
      childElement.textContent = item;
    });

    var childAllElements = parentElement.querySelectorAll(SelectorElements);
    childAllElements.forEach(function (item) {
      if (item.textContent === '') {
        item.remove();
      }
    });
  } else {
    mass.forEach(function (item, index) {
      var childElement = parentElement.querySelector(SelectorElements);
      if (index >= 1) {
        childElement = childElement.cloneNode(true);
      }

      childElement.src = item;
      parentElement.appendChild(childElement);
    });
  }

  return parentElement;
};

// Функция возвращает элемент только с уникальными значениями
var uniqueElementsMass = function (arr) {

  for (var l = 0; l < arr.length; l++) {

    for (var z = l + 1; z < arr.length; z++) {
      if (arr[l] === arr[z]) {
        delete arr[z];
      }
    }
  }

  return arr.filter(function (e) {
    return e !== null;
  });
};

// Функция возвращает массив  с радомными элементами
var randomGenerateSomeElement = function (mass) {
  var j = randomGenerate(0, mass.length); // перменная кол-ва элементов
  var newMass = [];

  for (var i = 0; i <= j; i++) {
    newMass.push(mass[randomGenerate(0, mass.length)]);
  }

  return uniqueElementsMass(newMass);
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
      'type': OPTIONS.TYPES[randomGenerate(0, OPTIONS.TYPES.length)],
      'rooms': randomGenerate(OPTIONS.ROOMS.MIN, OPTIONS.ROOMS.MAX),
      'guests': randomGenerate(OPTIONS.GUESTS.MIN, OPTIONS.GUESTS.MAX),
      'checkin': OPTIONS.CHECKINS[randomGenerate(0, OPTIONS.CHECKINS.length)],
      'checkout': OPTIONS.CHECKOUTS[randomGenerate(0, OPTIONS.CHECKOUTS.length)],
      'features': randomGenerateSomeElement(OPTIONS.FEATURES),
      'description': OPTIONS.DESCRIPTION[randomGenerate(0, OPTIONS.DESCRIPTION.length)],
      'photos': randomGenerateSomeElement(OPTIONS.PHOTOS)
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

  var fragmentLabel = document.createDocumentFragment();
  var fragmentCard = document.createDocumentFragment();

  var mapPins = document.querySelector('.map__pins'); // блок с картой, куда нужно добавить объявления
  var mapContainer = document.querySelector('.map__filters-container');
  var map = document.querySelector('.map');
  map.classList.remove('map--faded'); // делаем карту активной

  var templateLabel = document.querySelector('#pin').content.querySelector('.map__pin'); // получаем шаблон метки из верстки
  var templateCard = document.querySelector('#card').content.querySelector('.map__card'); // получаем шаблон каточки объяевления из верстки

  for (var i = 0; i < TOTAL_ADS; i++) {
    var elemLabel = templateLabel.cloneNode(true);
    elemLabel.querySelector('img').src = createAdsObj(i).author.avatar;
    elemLabel.querySelector('img').alt = createAdsObj(i).offer.title;
    elemLabel.style.left = (createAdsObj(i).location.x - WIDTH_ADS / 2) + 'px'; // устанавливаем координаты метки с учетом ее размеров
    elemLabel.style.top = (createAdsObj(i).location.y - HEIGHT_ADS) + 'px'; // устанавливаем координаты метки с учетом ее размеров
    fragmentLabel.appendChild(elemLabel);

    var elemCard = templateCard.cloneNode(true);
    elemCard.querySelector('.popup__avatar').src = createAdsObj(i).author.avatar;
    elemCard.querySelector('.popup__title').textContent = createAdsObj(i).offer.title;
    elemCard.querySelector('.popup__text--address').textContent = createAdsObj(i).offer.address;
    elemCard.querySelector('.popup__text--price').textContent = createAdsObj(i).offer.price + '₽/ночь';
    elemCard.querySelector('.popup__type').textContent = russificationTypes(createAdsObj(i).offer.type);
    elemCard.querySelector('.popup__text--capacity').textContent = createAdsObj(i).offer.rooms + ' комнаты для ' + createAdsObj(i).offer.guests + ' гостей';
    elemCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + createAdsObj(i).offer.checkin + ', выезд до ' + createAdsObj(i).offer.checkout;
    elemCard.appendChild(createListElement(createAdsObj(i).offer.features, elemCard.querySelector('.popup__features'), '.popup__feature', false));
    elemCard.querySelector('.popup__description').textContent = createAdsObj(i).offer.description;
    elemCard.appendChild(createListElement(createAdsObj(i).offer.photos, elemCard.querySelector('.popup__photos'), '.popup__photo', true));
    fragmentCard.appendChild(elemCard);
  }

  mapPins.appendChild(fragmentLabel);// добавляем метки объявлений на карту
  map.insertBefore(fragmentCard, mapContainer); // добавляем объявления на страницу
};

addAds();
