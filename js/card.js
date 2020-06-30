'use strict';

(function () {
  // Функция создает объект с данными одного объявления
  window.createAdsObj = function (i) {
    var adsObj = {
      'author': {
        'avatar': 'img/avatars/user' + (i < 10 ? '0' : '') + (i + 1) + '.png'
      },
      'offer': {
        'title': window.OPTIONS.TITLES[window.randomGenerate(0, window.OPTIONS.TITLES.length)],
        'address': window.randomGenerate(window.OPTIONS.LOCATION.X.MIN, window.OPTIONS.LOCATION.X.MAX) + ',' + window.randomGenerate(window.OPTIONS.LOCATION.Y.MIN, window.OPTIONS.LOCATION.Y.MAX),
        'price': window.randomGenerate(window.OPTIONS.PRICE.MIN, window.OPTIONS.PRICE.MAX),
        'type': window.OPTIONS.TYPES[window.randomGenerate(0, window.OPTIONS.TYPES.length)],
        'rooms': window.randomGenerate(window.OPTIONS.ROOMS.MIN, window.OPTIONS.ROOMS.MAX),
        'guests': window.randomGenerate(window.OPTIONS.GUESTS.MIN, window.OPTIONS.GUESTS.MAX),
        'checkin': window.OPTIONS.CHECKINS[window.randomGenerate(0, window.OPTIONS.CHECKINS.length)],
        'checkout': window.OPTIONS.CHECKOUTS[window.randomGenerate(0, window.OPTIONS.CHECKOUTS.length)],
        'features': window.randomGenerateSomeElement(window.OPTIONS.FEATURES),
        'description': window.OPTIONS.DESCRIPTION[window.randomGenerate(0, window.OPTIONS.DESCRIPTION.length)],
        'photos': window.randomGenerateSomeElement(window.OPTIONS.PHOTOS)
      },
      'location': {
        'x': window.randomGenerate(window.OPTIONS.LOCATION.X.MIN, window.OPTIONS.LOCATION.X.MAX),
        'y': window.randomGenerate(window.OPTIONS.LOCATION.Y.MIN, window.OPTIONS.LOCATION.Y.MAX),
      }
    };

    return adsObj;
  };
})();
