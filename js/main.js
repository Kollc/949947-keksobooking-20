'use strict';

var TOTAL_ADS = 8;
var HEIGHT_MARK = 70;
var WIDTH_MARK = 50; // примерные значения обычных меток

var HEIGHT_MAIN_MARK = 85; // примерные значения главной метки
var WIDTH_MAIN_MARK = 65;

var MAX_COUNT_ROOMS = 100;
var MIN_COUNT_GUESTS = 0;

var MAX_SIMBOLS = 100;
var MIN_SIMBOLS = 30;

var MAX_PRICE = 1000000;

var mapPins = document.querySelector('.map__pins'); // блок с картой, куда нужно добавить объявления
var mapContainer = document.querySelector('.map__filters-container');
var map = document.querySelector('.map');
var pinMain = document.querySelector('.map__pin--main');
var adForm = document.querySelector('.ad-form');
var addressInput = document.querySelector('#address');
var roomNumber = document.querySelector('#room_number');
var guestNumber = document.querySelector('#capacity');
var wrappersElementsForm = document.querySelectorAll('.ad-form__element');
var titleAd = document.querySelector('#title');
var priceAd = document.querySelector('#price');
var typeAd = document.querySelector('#type');
var timeIn = document.querySelector('#timein');
var timeOut = document.querySelector('#timeout');
var imagesAd = document.querySelector('#images');
var avatarAd = document.querySelector('#avatar');

document.querySelectorAll('fieldset').disabled = true; // делаем элеметы формы не активными
document.querySelectorAll('map__filters').disabled = true; // делаем элеметы формы не активными

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
    palace: {
      name: 'Дворец',
      enName: 'palace',
      minPrice: 10000
    }
  },
  {
    house: {
      name: 'Дом',
      enName: 'house',
      minPrice: 5000
    }
  },
  {
    flat: {
      name: 'Квартира',
      enName: 'flat',
      minPrice: 1000
    }
  },
  {
    bungalo: {
      name: 'Бунгало',
      enName: 'bungalo',
      minPrice: 0
    }
  },
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

// Функция заполняет элементы списка текстом или давбляет в src путь к картинкам
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

// Функция возвращает массив только с уникальными значениями
function uniqueElementsMass(value, index, arr) {
  return arr.indexOf(value) === index;
}

// Функция возвращает массив  с радомными элементами
var randomGenerateSomeElement = function (mass) {
  var countElements = randomGenerate(0, mass.length);
  var newMass = [];

  for (var i = 0; i <= countElements; i++) {
    newMass.push(mass[randomGenerate(0, mass.length)]);
  }

  return newMass.filter(uniqueElementsMass);
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

// функция проверят соответствие кол-ва комнат и кол-ва гостей (в данном случае)
var validationMatchingRooms = function (ElementRooms, ElementGuests) {
  var roomsValue = parseInt(ElementRooms.value, 10);
  var guestsValue = parseInt(ElementGuests.value, 10);

  if (roomsValue < guestsValue) {
    ElementRooms.setCustomValidity('Нужно больше комнат или взять меньше гостей');
  } else {
    if ((roomsValue === MAX_COUNT_ROOMS && guestsValue !== MIN_COUNT_GUESTS) || (roomsValue !== MAX_COUNT_ROOMS && guestsValue === MIN_COUNT_GUESTS)) {
      ElementRooms.setCustomValidity('100 комнат подойдут только не для гостей');
    } else {
      ElementRooms.setCustomValidity('');
      ElementGuests.setCustomValidity('');
    }
  }
};

// функция проверят соответствие типа жилья и цены за ночь (в данном случае)
var validationMatchingType = function (typeValue) {
  var priceNight = 0;

  switch (typeValue) {
    case OPTIONS.TYPES[0].palace.enName:
      priceNight = OPTIONS.TYPES[0].palace.minPrice;
      break;

    case OPTIONS.TYPES[1].house.enName:
      priceNight = OPTIONS.TYPES[1].house.minPrice;
      break;

    case OPTIONS.TYPES[2].flat.enName:
      priceNight = OPTIONS.TYPES[2].flat.minPrice;
      break;

    case OPTIONS.TYPES[3].bungalo.enName:
      priceNight = OPTIONS.TYPES[3].bungalo.minPrice;
      break;

    default:
      break;
  }

  return priceNight;
};

// функция , которая разблокировывает страницу
var unlockPage = function (mapElem, adFormElem) {
  mapElem.classList.remove('map--faded');
  adFormElem.classList.remove('ad-form--disabled');
  document.querySelectorAll('fieldset').disabled = false; // делаем элеметы формы активными
  document.querySelectorAll('map__filters').disabled = false; // делаем элеметы формы активными
};

// функция, которая добавляет координаты главной точки в поле адреса
var addCoordinatesAddress = function (inputField, x, y) {
  inputField.value = (x - Math.floor(WIDTH_MAIN_MARK / 2)) + ', ' + (y - Math.floor(HEIGHT_MAIN_MARK / 2));
};

// Функция добавляет метки объявлений в DOM
var addAds = function () {

  var fragmentLabel = document.createDocumentFragment();
  var fragmentCard = document.createDocumentFragment();

  var templateLabel = document.querySelector('#pin').content.querySelector('.map__pin'); // получаем шаблон метки из верстки
  var templateCard = document.querySelector('#card').content.querySelector('.map__card'); // получаем шаблон каточки объяевления из верстки

  for (var i = 0; i < TOTAL_ADS; i++) {
    var elemLabel = templateLabel.cloneNode(true);
    elemLabel.querySelector('img').src = createAdsObj(i).author.avatar;
    elemLabel.querySelector('img').alt = createAdsObj(i).offer.title;
    elemLabel.style.left = (createAdsObj(i).location.x - WIDTH_MARK / 2) + 'px'; // устанавливаем координаты метки с учетом ее размеров
    elemLabel.style.top = (createAdsObj(i).location.y - HEIGHT_MARK) + 'px'; // устанавливаем координаты метки с учетом ее размеров
    fragmentLabel.appendChild(elemLabel);

    var elemCard = templateCard.cloneNode(true);
    elemCard.querySelector('.popup__avatar').src = createAdsObj(i).author.avatar;
    elemCard.querySelector('.popup__title').textContent = createAdsObj(i).offer.title;
    elemCard.querySelector('.popup__text--address').textContent = createAdsObj(i).offer.address;
    elemCard.querySelector('.popup__text--price').textContent = createAdsObj(i).offer.price + '₽/ночь';
    elemCard.querySelector('.popup__type').textContent = russificationTypes(createAdsObj(i).offer.type).name;
    elemCard.querySelector('.popup__text--capacity').textContent = createAdsObj(i).offer.rooms + ' комнаты для ' + createAdsObj(i).offer.guests + ' гостей';
    elemCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + createAdsObj(i).offer.checkin + ', выезд до ' + createAdsObj(i).offer.checkout;
    elemCard.appendChild(createListElement(createAdsObj(i).offer.features, elemCard.querySelector('.popup__features'), '.popup__feature', false));
    elemCard.querySelector('.popup__description').textContent = createAdsObj(i).offer.description;
    elemCard.appendChild(createListElement(createAdsObj(i).offer.photos, elemCard.querySelector('.popup__photos'), '.popup__photo', true));
    elemCard.style.display = 'none'; // скрываем все карточки на странице
    fragmentCard.appendChild(elemCard);
  }

  mapPins.appendChild(fragmentLabel); // добавляем метки объявлений на карту
  map.insertBefore(fragmentCard, mapContainer); // добавляем объявления на страницу
};

addAds();

// Ещё один момент заключается в том, что поле адреса должно быть заполнено всегда, в том числе сразу после открытия страницы.
addCoordinatesAddress(addressInput, pinMain.style.left.replace('px', ''), pinMain.style.top.replace('px', '')); // вызов метода, который устанавливает значения поля ввода адреса
addressInput.setAttribute('readonly', 'true'); // добавлет к полю адрес возможность только чтения
pinMain.addEventListener('mousedown', function (evt) {
  if (evt.button === 0) {
    unlockPage(map, adForm);
    addCoordinatesAddress(addressInput, pinMain.style.left.replace('px', ''), pinMain.style.top.replace('px', '')); // вызов метода, который устанавливает значения поля ввода адреса
  }
});

// разблокирование страницы нажатием на Enter
pinMain.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    unlockPage(map, adForm);
  }
});

validationMatchingRooms(roomNumber, guestNumber); // чтобы пользователь не мог отправить неправильную форму , как только страниа загрузилась

wrappersElementsForm.forEach(function (formElement) { //  перебираем все fieldset в форме
  formElement.addEventListener('input', function (evt) {
    if (evt.target === roomNumber || evt.target === guestNumber) {
      validationMatchingRooms(roomNumber, guestNumber); //  Функция валидации сопоставление кол-ва гостей и комнат
    }
  });
});

// при клике (или нажатии Enter) на метку появляется характеристика объявления
var allCards = map.querySelectorAll('.map__card'); // получаем все карточки
var allPins = mapPins.querySelectorAll('button:not(.map__pin--main)'); // получаем все метки на карте

allPins.forEach(function (pin, indexPin) {
  pin.addEventListener('click', function (evt) {
    allCards.forEach(function (card) {
      card.style.display = 'none';
    });

    allCards[indexPin].style.display = 'block';

    var closeCard = allCards[indexPin].querySelector('.popup__close'); // получаем триггер закрытия

    closeCard.addEventListener('click', function () { // закрытие объявления по клику
      allCards[indexPin].style.display = 'none';
    });

    document.addEventListener('keydown', function () { // закрытие объявления на клавишу Esc
      if (evt.key === 'Escape') {
        allCards[indexPin].style.display = 'none';
      }
    });
  });

  pin.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      allCards.forEach(function (card) {
        card.style.display = 'none';
      });

      allCards[indexPin].style.display = 'block';
    }

    var closeCard = allCards[indexPin].querySelector('.popup__close'); // получаем триггер закрытия

    closeCard.addEventListener('click', function () { // закрытие объявления по клику
      allCards[indexPin].style.display = 'none';
    });

    document.addEventListener('keydown', function () { // закрытие объявления на клавишу Esc
      if (evt.key === 'Escape') {
        allCards[indexPin].style.display = 'none';
      }
    });
  });
});

// валидация поля "Заголовок объявления"
titleAd.addEventListener('input', function () {
  var titleLenght = titleAd.value.length;

  if (titleLenght > MAX_SIMBOLS) {
    titleAd.setCustomValidity('Удалите лишние ' + (titleLenght - MAX_SIMBOLS) + ' символов');
  } else if (titleLenght < MIN_SIMBOLS) {
    titleAd.setCustomValidity('Еще ' + (MIN_SIMBOLS - titleLenght) + ' символов');
  } else {
    titleAd.setCustomValidity('');
  }
});

// валидация сопоставления типа жилья и цены за ночь
priceAd.placeholder = validationMatchingType(typeAd.value); // изменял placeholder сразу после загрузки страницы(тк в поле тип жилья изначально стоит "Квартира")

wrappersElementsForm.forEach(function (formElement) { //  перебираем все fieldset в форме
  formElement.addEventListener('input', function (evt) {
    if (evt.target === priceAd || evt.target === typeAd) {
      var minPrice = validationMatchingType(typeAd.value);
      priceAd.placeholder = minPrice;

      if (priceAd.value < minPrice) {
        priceAd.setCustomValidity('Минимальная сумма ' + minPrice);
      } else if (priceAd.value > MAX_PRICE) {
        priceAd.setCustomValidity('Максимальная сумма ' + MAX_PRICE);
      } else {
        priceAd.setCustomValidity('');
      }
    }
  });
});


// валидация сопоставления времени заезда и выезда
priceAd.placeholder = validationMatchingType(typeAd.value); // изменял placeholder сразу после загрузки страницы(тк в поле тип жилья изначально стоит "Квартира")

wrappersElementsForm.forEach(function (formElement) { //  перебираем все fieldset в форме
  formElement.addEventListener('input', function (evt) {
    if (evt.target === timeIn) {
      timeOut.value = evt.target.value;
    } else if (evt.target === timeOut) {
      timeIn.value = evt.target.value;
    }
  });
});

// Значением полей «Ваша фотография» и «Фотография жилья» может быть только изображение.
imagesAd.setAttribute('accept', 'image/jpg, image/jpeg');
avatarAd.setAttribute('accept', 'image/jpg, image/jpeg');
