'use strict';

(function() {
    var Url = {
        'GET': 'https://js.dump.academy/keksobooking/data',
        'POST': 'https://js.dump.academy/keksobooking'
    }

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

    window.save = function(data, onLoad, onError) {
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'json';

        xhr.addEventListener('load', function() {
            if (xhr.status === 200) {
                onLoad(xhr.response);
            } else {
                onError('Что-то пошло не так :( ) ' + xhr.status + ' ' + xhr.statusText);
            }
        })

        xhr.open('POST', Url.POST);
        xhr.send(data);
    }
})()
