'use strict';

(function () {
  // функция загрузки данных с сервера
  window.load = function (onSuccess, onError) {
    var URL = 'https://javascript.pages.academy/keksobooking/data';
    var StatusCode = {
      OK: 200
    };
    var TIMEOUT_IN_MS = 10000;

    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === StatusCode.OK) {
        if (typeof (xhr.response) !== 'undefined') {
          onSuccess(xhr.response);
        } else {
          onError('Получены не все данные!');
        }
      } else {
        onError('Статус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open('GET', URL);
    xhr.send();
  };
})();
