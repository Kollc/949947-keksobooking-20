'use strict';

(function () {
  // данные объявлений
  window.OPTIONS = {
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
})();
