'use strict';

(function () {
  var HEIGHT_MARK = 70;
  var WIDTH_MARK = 50; // примерные значения обычных меток

  var mapContainer = document.querySelector('.map__filters-container');
  var mapPins = document.querySelector('.map__pins'); // блок с картой, куда нужно добавить объявления
  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  var pinMain = document.querySelector('.map__pin--main');
  var addressInput = document.querySelector('#address');

  window.load(function (data) {
    window.addAds(data.length, data);
  }, window.getError); // в случае ошибки будте выводиться текст под картой (в ТЗ не нашел как правильно это обработать)

  var map = document.querySelector('.map');
  var adForm = document.querySelector('.ad-form');
  window.lockPage(map, adForm);

  // Функция добавляет метки объявлений в DOM
  window.addAds = function (adsTotal, dataAds) {

    var fragmentLabel = document.createDocumentFragment();
    var fragmentCard = document.createDocumentFragment();

    var templateLabel = document.querySelector('#pin').content.querySelector('.map__pin'); // получаем шаблон метки из верстки
    var templateCard = document.querySelector('#card').content.querySelector('.map__card'); // получаем шаблон каточки объяевления из верстки

    for (var i = 0; i < adsTotal; i++) {
      var elemLabel = templateLabel.cloneNode(true);
      elemLabel.querySelector('img').src = dataAds[i].author.avatar;
      elemLabel.querySelector('img').alt = dataAds[i].offer.title;
      elemLabel.style.left = (dataAds[i].location.x - WIDTH_MARK / 2) + 'px'; // устанавливаем координаты метки с учетом ее размеров
      elemLabel.style.top = (dataAds[i].location.y - HEIGHT_MARK) + 'px'; // устанавливаем координаты метки с учетом ее размеров
      fragmentLabel.appendChild(elemLabel);

      var elemCard = templateCard.cloneNode(true);
      elemCard.querySelector('.popup__avatar').src = dataAds[i].author.avatar;
      elemCard.querySelector('.popup__title').textContent = dataAds[i].offer.title;
      elemCard.querySelector('.popup__text--address').textContent = dataAds[i].offer.address;
      elemCard.querySelector('.popup__text--price').textContent = dataAds[i].offer.price + '₽/ночь';
      elemCard.querySelector('.popup__type').textContent = window.russificationTypes(dataAds[i].offer.type);
      elemCard.querySelector('.popup__text--capacity').textContent = dataAds[i].offer.rooms + ' комнаты для ' + dataAds[i].offer.guests + ' гостей';
      elemCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + dataAds[i].offer.checkin + ', выезд до ' + dataAds[i].offer.checkout;
      elemCard.appendChild(window.createListElement(dataAds[i].offer.features, elemCard.querySelector('.popup__features'), '.popup__feature', false));
      elemCard.querySelector('.popup__description').textContent = dataAds[i].offer.description;
      elemCard.appendChild(window.createListElement(dataAds[i].offer.photos, elemCard.querySelector('.popup__photos'), '.popup__photo', true));
      elemCard.style.display = 'none'; // скрываем все карточки на странице
      fragmentCard.appendChild(elemCard);
    }

    mapPins.appendChild(fragmentLabel); // добавляем метки объявлений на карту
    map.insertBefore(fragmentCard, mapContainer); // добавляем объявления на страницу

    addOpenCards();
  };

  // функция добавлят обработчики события на открытие и закрытия карточки объявления
  var addOpenCards = function () {
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
  };

  // разблокирование страницы нажатием на Enter
  pinMain.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      window.unlockPage(map, adForm);
    }
  });

  var HEIGHT_MAIN_MARK = 85; // примерные значения главной метки
  var WIDTH_MAIN_MARK = 65;

  var BORDER_TOP = 130 - HEIGHT_MAIN_MARK / 2; // примерные значения главной метки
  var BORDER_BOTTOM = 630;
  var BORDER_RIGHT = 1140 + WIDTH_MAIN_MARK / 2;
  var BORDER_LEFT = -WIDTH_MAIN_MARK / 2;

  // функция, которая добавляет координаты главной точки в поле адреса
  window.addCoordinatesAddress = function (inputField, x, y) {
    inputField.value = (x - Math.floor(WIDTH_MAIN_MARK / 2)) + ', ' + (y - Math.floor(HEIGHT_MAIN_MARK / 2));
  };

  // Ещё один момент заключается в том, что поле адреса должно быть заполнено всегда, в том числе сразу после открытия страницы.
  window.addCoordinatesAddress(addressInput, pinMain.style.left.replace('px', ''), pinMain.style.top.replace('px', '')); // вызов метода, который устанавливает значения поля ввода адреса


  // перемещение главной метки  с учетом границ карты
  pinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    if (evt.button === 0) {
      window.unlockPage(map, adForm);

      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();

        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        var top = pinMain.offsetTop - shift.y;
        var left = pinMain.offsetLeft - shift.x;

        if ((left > BORDER_LEFT && left < BORDER_RIGHT) && (top > BORDER_TOP && top < BORDER_BOTTOM)) {
          pinMain.style.top = top + 'px';
          pinMain.style.left = left + 'px';

          window.addCoordinatesAddress(addressInput, pinMain.style.left.replace('px', ''), pinMain.style.top.replace('px', '')); // вызов метода, который устанавливает значения поля ввода адреса
        }
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        window.addCoordinatesAddress(addressInput, pinMain.style.left.replace('px', ''), pinMain.style.top.replace('px', '')); // вызов метода, который устанавливает значения поля ввода адреса

        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  });

})();
