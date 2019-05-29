'use strict';

(function() {
    var similarMapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');//Находимlo шаблон меток.


    //Функция для получения меток.
    var getPins = function(mapPinElement, id) {
        var mapPin = similarMapPinTemplate.cloneNode(true);

        mapPin.style.left = (mapPinElement.offer.location.x  + window.data.PIN_WIDTH / 2) + 'px';
        mapPin.style.top = (mapPinElement.offer.location.y - window.data.PIN_HEIGHT / 2) + 'px';
        mapPin.querySelector('img').src = mapPinElement.author.avatar;
        mapPin.querySelector('img').alt = mapPinElement.offer.title;
        mapPin.dataset.adsId = id;
        
        return mapPin;
    }

    window.pins = {
        'getPins': getPins
    }
})();