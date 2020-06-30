'use strict';

(function () {

  var HEIGHT_MAIN_MARK = 85; // примерные значения главной метки
  var WIDTH_MAIN_MARK = 65;

  // функция, которая добавляет координаты главной точки в поле адреса
  window.addCoordinatesAddress = function (inputField, x, y) {
    inputField.value = (x - Math.floor(WIDTH_MAIN_MARK / 2)) + ', ' + (y - Math.floor(HEIGHT_MAIN_MARK / 2));
  };


  // функция , которая разблокировывает страницу
  window.unlockPage = function (mapElem, adFormElem) {
    mapElem.classList.remove('map--faded');
    adFormElem.classList.remove('ad-form--disabled');
    document.querySelectorAll('fieldset').disabled = false; // делаем элеметы формы активными
    document.querySelectorAll('map__filters').disabled = false; // делаем элеметы формы активными
  };

  // Функция проверяет соответстиве элемента в объекте массива и возвращает русифицированную версию (пришлось написать вот это, тк ассоциативные массивы только с ES6)
  window.russificationTypes = function (obj) {
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
  window.createListElement = function (mass, parentElement, SelectorElements, image) {
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
  window.randomGenerateSomeElement = function (mass) {
    var countElements = window.randomGenerate(0, mass.length);
    var newMass = [];

    for (var i = 0; i <= countElements; i++) {
      newMass.push(mass[window.randomGenerate(0, mass.length)]);
    }

    return newMass.filter(uniqueElementsMass);
  };

  // функция возращает рандомное число в определенном интервале
  window.randomGenerate = function (min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  };
})();
