'use strict';

(function() {
    var map = document.querySelector('.map');
    var similarMapCardTepmlate = document.querySelector('template').content.querySelector('.map__card');//Находим шаблон карточек объявлений.
    var similarMapPinList = document.querySelector('.map__pins');//Находим элемент куда будем вставлять наши метки. на карте

    //Функция для вставки для списка преимуществ сдаваемого жилья.
    var renderListItem = function(element, textClassName, array) {
        element.textContent = '';

        for (var i = 0; i < array.length; i++) {
            element.insertAdjacentHTML('beforeEnd', '<li class="' + textClassName + array[i] + '"></li>');
        }
    }

    //Фунция для вставки списка фотографий сдаваемого жилья.
    var renderImage = function(element, array) {
        element.textContent = '';

        for (var i = 0; i < array.length; i++) {
            element.insertAdjacentHTML('beforeEnd', '<li><img src="' + array[i] + '" width="45" height="40"></li>')
        }
    }

    //Фукнция для отображения на русском тип сдаваемого жилья.
    var getRightHouseType = function (type) {
        var houseType = ''

        switch (type) {
            case 'palace':
                houseType = 'Дворец'
                break;

            case 'flat':
                houseType = 'Квартира'
                break;

            case 'house':
                houseType = 'Дом'
                break;

            case 'bungalo':
                houseType = 'Бунгало'
                break; 
        }
        
        return houseType;
    }

    //Функция для получения карточек объявлений.
    var getMapCards = function(mapCardElelment, id) {
        var mapCard = similarMapCardTepmlate.cloneNode(true);

        mapCard.querySelector('.popup__title').textContent = mapCardElelment.offer.title;
        mapCard.querySelector('.popup__text--adress').children[0].textContent = mapCardElelment.offer.adress;
        mapCard.querySelector('.popup__text--price').textContent = mapCardElelment.offer.price;
        mapCard.querySelector('.popup__text--price').insertAdjacentHTML('beforeEnd', ' &#x20bd;/<span>ночь</span>')
        mapCard.querySelector('.popup__type').textContent = getRightHouseType(mapCardElelment.offer.type);
        mapCard.querySelector('.popup__text--capacity').textContent = mapCardElelment.offer.rooms + ' комнаты для ' + mapCardElelment.offer.guests + ' гостей';
        mapCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + mapCardElelment.offer.checkin + ' , выезд до ' + mapCardElelment.offer.checkout;
        renderListItem(mapCard.querySelector('.popup__features'), 'feature feature--', mapCardElelment.offer.features);
        mapCard.querySelector('.popup__description').textContent = mapCardElelment.offer.description;
        renderImage(mapCard.querySelector('.popup__pictures'), mapCardElelment.offer.photos);
        mapCard.querySelector('.popup__avatar').src = mapCardElelment.author.avatar;
        mapCard.dataset.adsId = id;

        return mapCard;
    }

    var mapFilters = document.querySelector('.map__filters-container');//Находим элемент перед которым будем вставлять наши карточки. 

    //Фукция для переключения состояния активности полей формы.
    var toogleConditionInput = function(selector, value) {
        var elements = document.querySelectorAll(selector);

        for (var i = 0; i < elements.length; i++) {
            elements[i].disabled = value;
        }
    }

    toogleConditionInput('fieldset', true);//По умолчанию поля формы неактивны.

    var mainMapPin = map.querySelector('.map__pin--main');//Находим нашу главную метку.

    var getMainMapPinLocation = function() {
        var addressInput = document.querySelector('#address');

        if (map.classList.contains('map--faded')) {
            addressInput.value = 'x: ' + mainMapPin.offsetLeft + ', y: ' + mainMapPin.offsetTop;
        } else {
            addressInput.value = 'x: ' + mainMapPin.offsetLeft + ', y: ' + (mainMapPin.offsetTop + window.data.MAIN_PIN_HEIGHT / 2);
        }
    }

    getMainMapPinLocation();

     //Функция для генерирования нашей разметки.
    var fragmentGenerator = function(array, render) {
        var fragment = document.createDocumentFragment();

        for (var i = 0; i < array.length; i++) {
            fragment.appendChild(render(array[i], i));
        }

        return fragment;
    }

    var adForm = document.querySelector('.notice__form');

    //Функция для активации карты
    var mapActivate = function() {
        map.classList.remove('map--faded');
        adForm.classList.remove('notice__form--disabled');
        toogleConditionInput('fieldset', false);
        similarMapPinList.appendChild(fragmentGenerator(window.data.ads, window.pins.getPins));//Вставляем наши метки.
        while(similarMapPinList.children.length > 10) {
            similarMapPinList.removeChild(similarMapPinList.lastChild);
        }
    }

    mainMapPin.addEventListener('click', mapActivate)

    //Аллилуйя! У меня получилось !╰(▔∀▔)╯ .
    // Я страдал 2 дня из-за того-что, что не знал как связать метки на карте и карточки объявления ~(>_<~).
    //Функция при клике на метку будет показывать соответствующую карточку с объявлением.
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

    var onCloseButton = function(evt) {
        var target = evt.target;
        var closePopup = target.closest('.popup__close');
        var deleteCard = map.querySelector('.map__card');

        if (closePopup) {
            map.removeChild(deleteCard);
        }
    }

    map.addEventListener('click', onCloseButton)

    //Отмлеживаем нажатие на метки.
    similarMapPinList.addEventListener('click', function(evt) {
        onMapPinClick(evt);
    })

    window.pinLocation = {
        'getMainMapPinLocation': getMainMapPinLocation
    }
})();