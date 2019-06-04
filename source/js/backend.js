'use strict';

(function() {

    //*******/
    //В этом модуле я работаю с сервером.
    //*******/

    var Url = {
        'GET': 'https://js.dump.academy/keksobooking/data',
        'POST': 'https://js.dump.academy/keksobooking'
    }




    //*******/
    //Модуль для загрузки данных  с сервера.
    //*******/

    window.load = function(onLoad, onError) {
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'json';
    
        xhr.addEventListener('load', function() {
            if (xhr.status === 200) {
                onLoad(xhr.response);
            } else {
                onError('Статус ответа ' + xhr.status + ' ' + xhr.statusText);
            }
        })
    
        xhr.open('GET', Url.GET);
        xhr.send();
    }




    //*******/
    //Модуль для отправки данных с формы на сервер.
    //*******/

    window.save = function(data, onLoad, onError) {
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'json';

        xhr.addEventListener('load', function() {
            if (xhr.status === 200) {
                onLoad(xhr.response);
            } else {
                onError('Что-то пошло не так  ' + xhr.status + ' ' + xhr.statusText + ' ༼つಠ益ಠ༽つ ─=≡ΣO))');
            }
        })

        xhr.open('POST', Url.POST);
        xhr.send(data);
    }
})()
