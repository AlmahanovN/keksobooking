'use strict';

(function() {

    //*******//
    //В этом модуле я делаю страницу активной и отрисовываю метки и карточки объявлений.
    //*******//

    var map = document.querySelector('.map');
    var mainMapPin = map.querySelector('.map__pin--main');
    var similarMapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');
    var similarMapCardTepmlate = document.querySelector('template').content.querySelector('.map__card');
    var similarMapPinList = document.querySelector('.map__pins');





    //*******//
    //Модуль с метками объявлений
    //*******//

    window.pins = function() {
        var Pin = {
            'WIDTH':50,
            'HEIGHT': 70,
        }

        var getPins = function(mapPinElement, id) {
            var mapPin = similarMapPinTemplate.cloneNode(true);

            mapPin.style.left = (mapPinElement.location.x  + Pin.WIDTH / 2) + 'px';
            mapPin.style.top = (mapPinElement.location.y - Pin.HEIGHT / 2) + 'px';
            mapPin.querySelector('img').src = mapPinElement.author.avatar;
            mapPin.querySelector('img').alt = mapPinElement.offer.title;
            mapPin.dataset.adsId = id;
            
            return mapPin;
        }

        var fragmentGenerator = function(array, render) {
            var fragment = document.createDocumentFragment();

            for (var i = 0; i < array.length; i++) {
                fragment.appendChild(render(array[i], i));
            }

            return fragment;
        }

        var adForm = document.querySelector('.notice__form');

        var toogleConditionInput = function(selector, value) {
            var elements = document.querySelectorAll(selector);

            for (var i = 0; i < elements.length; i++) {
                elements[i].disabled = value;
            }
        }

        toogleConditionInput('fieldset', true);

        var mapActivate = function() {
            map.classList.remove('map--faded');
            adForm.classList.remove('notice__form--disabled');
            toogleConditionInput('fieldset', false);
            similarMapPinList.appendChild(fragmentGenerator(window.data.ads, getPins));
            while(similarMapPinList.children.length > 12) {
                similarMapPinList.removeChild(similarMapPinList.lastChild);
            }   
        }

        mainMapPin.addEventListener('mousedown', mapActivate)
    }





    //*******//
    //Модуль с карточками объявлений
    //*******//

    window.card = function() {
        var RightHouseType = {
            'palace': 'Жворец',
            'flat': 'Квартира',
            'house': 'Дом',
            'bungalo': 'Бунгало'
        }

        var renderListItem = function(element, textClassName, array) {
            element.textContent = '';

            for (var i = 0; i < array.length; i++) {
                element.insertAdjacentHTML('beforeEnd', '<li class="' + textClassName + array[i] + '"></li>');
            }
        }

        var renderImage = function(element, array) {
            element.textContent = '';

            for (var i = 0; i < array.length; i++) {
                element.insertAdjacentHTML('beforeEnd', '<li><img src="' + array[i] + '" width="45" height="40"></li>')
            }
        }

        var getMapCards = function(mapCardElelment, id) {
            var mapCard = similarMapCardTepmlate.cloneNode(true);

            mapCard.querySelector('.popup__title').textContent = mapCardElelment.offer.title;
            mapCard.querySelector('.popup__text--adress').children[0].textContent = mapCardElelment.offer.adress;
            mapCard.querySelector('.popup__text--price').textContent = mapCardElelment.offer.price;
            mapCard.querySelector('.popup__text--price').insertAdjacentHTML('beforeEnd', ' &#x20bd;/<span>ночь</span>')
            mapCard.querySelector('.popup__type').textContent = RightHouseType[mapCardElelment.offer.type];
            mapCard.querySelector('.popup__text--capacity').textContent = mapCardElelment.offer.rooms + ' комнаты для ' + mapCardElelment.offer.guests + ' гостей';
            mapCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + mapCardElelment.offer.checkin + ' , выезд до ' + mapCardElelment.offer.checkout;
            renderListItem(mapCard.querySelector('.popup__features'), 'feature feature--', mapCardElelment.offer.features);
            mapCard.querySelector('.popup__description').textContent = mapCardElelment.offer.description;
            renderImage(mapCard.querySelector('.popup__pictures'), mapCardElelment.offer.photos);
            mapCard.querySelector('.popup__avatar').src = mapCardElelment.author.avatar;
            mapCard.dataset.adsId = id;

            return mapCard;
        }

        var mapFilters = document.querySelector('.map__filters-container');

        var getMainMapPinLocation = function() {
            var addressInput = document.querySelector('#address');

            if (map.classList.contains('map--faded')) {
                addressInput.value = 'x: ' + mainMapPin.offsetLeft + ', y: ' + mainMapPin.offsetTop;
            } else {
                addressInput.value = 'x: ' + mainMapPin.offsetLeft + ', y: ' + (mainMapPin.offsetTop + window.data.MAIN_PIN_HEIGHT / 2);
            }
        }

        getMainMapPinLocation();

        var onMapPinClick = function(evt) {
            var target = evt.target;
            var unnecessaryMapPin = target.closest('.map__pin--main');
            var mapPin = target.closest('.map__pin');
            var card = map.querySelector('.map__card');

            if (card) {
                map.removeChild(card);
            }

            if (!unnecessaryMapPin) {
                map.insertBefore(getMapCards(window.data.ads[mapPin.dataset.adsId], mapPin.dataset.adsId), mapFilters);
            }
        }

        var onCloseButtonClick = function(evt) {
            var target = evt.target;
            var closePopup = target.closest('.popup__close');
            var deleteCard = map.querySelector('.map__card');

            if (closePopup) {
                map.removeChild(deleteCard);
            }
        }

        map.addEventListener('click', onCloseButtonClick)

        similarMapPinList.addEventListener('click', function(evt) {
            onMapPinClick(evt);
        })

        window.pinLocation = {
            'getMainMapPinLocation': getMainMapPinLocation
        }
    }

    window.pins();

    window.card();
})();