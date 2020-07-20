'use strict';

(function () {
  var MAX_COUNT_ROOMS = 100;
  var MIN_COUNT_GUESTS = 0;

  var MAX_SIMBOLS = 100;
  var MIN_SIMBOLS = 30;

  var MAX_PRICE = 1000000;

  var form = document.querySelector('.ad-form');
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
  var addressInput = document.querySelector('#address');
  var formReset = document.querySelector('.ad-form__reset');

  document.querySelectorAll('fieldset').forEach(function (item) { // делаем элеметы формы не активными
    item.setAttribute('disabled', 'true');
  });

  document.querySelectorAll('.map__filters').forEach(function (item) { // делаем элеметы формы не активными
    item.setAttribute('disabled', 'true');
  });

  addressInput.setAttribute('readonly', 'true'); // добавлет к полю адрес возможность только чтения

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

    window.OPTIONS.TYPES.forEach(function (type) {
      if (type.enName === typeValue) {
        priceNight = type.minPrice;
      }
    });

    return priceNight;
  };

  validationMatchingRooms(roomNumber, guestNumber); // чтобы пользователь не мог отправить неправильную форму , как только страница загрузилась

  wrappersElementsForm.forEach(function (formElement) { //  перебираем все fieldset в форме
    formElement.addEventListener('input', function (evt) {
      if (evt.target === roomNumber || evt.target === guestNumber) {
        validationMatchingRooms(roomNumber, guestNumber); //  Функция валидации сопоставление кол-ва гостей и комнат
      }
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

  // обработчик сбрасывает формы (хотя у кнопки и есть уже type='reset')
  formReset.addEventListener('click', function () {
    form.reset();
  });

  // Значением полей «Ваша фотография» и «Фотография жилья» может быть только изображение.
  imagesAd.setAttribute('accept', 'image/jpg, image/jpeg');
  avatarAd.setAttribute('accept', 'image/jpg, image/jpeg');

  form.addEventListener('submit', function (evt) {
    evt.preventDefault();

    window.save(new FormData(form), window.onSuccess, window.onError); // отправляем данные на сервер
  });
})();
