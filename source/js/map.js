var NUMBER_ADS = 8;//Число объявлений.
var OFFER_TITLE = ["Большая уютная квартира", "Маленькая неуютная квартира", "Огромный прекрасный дворец", "Маленький ужасный дворец", "Красивый гостевой домик", "Некрасивый негостеприимный домик", "Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде"];//Заголовки предложений.
var ADRESS_LOCATION_X_MIN = 300;//Минимальная кордината по оси X.
var ADRESS_LOCATION_X_MAX = 900;//Максимальная координата по оси X.
var ADRESS_LOCATION_Y_MIN = 130;//Минимальная кордината по оси Y.
var ADRESS_LOCATION_Y_MAX = 630;//Максимальная координата по оси Y.
var MIN_PRICE = 1000;//Минимальная цена.
var MAX_PRICE = 1000000;//Макаслимальная цена.
var HOUSING_TYPES = ['palace', 'flat', 'house', 'bungalo'];//Типы жилья.
var MIN_NUMBER_OF_ROOMS = 1;//Минимальное количества комнат.
var MAX_NUMBER_OF_ROOMS = 5;//Максимальное количество комнат.
var MIN_NUMBER_OF_GUESTS = 1;//Минимальное колическтво гостей.
var MAX_NUMBER_OF_GUESTS = 4;//Максимальное количество гостей.
var CHECKIN_AND_CHECKOUT_TIME = ['12:00', '13:00', '14:00'];//
var FEATURES_LIST = [ "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];//Список преимуществ сдаваемого жилья.
var MIN_LENGTH = 1;//Минимальная длина массива. Нужна для рандомного вывода списка.
var PHOTO_PATH = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];//Путь в фотографиям
var PIN_WIDTH = 50;//Ширини метки
var PIN_HEIGHT = 70;//Высота метки
var MAIN_PIN_WIDTH = 65;//Ширина главной метки 
var MAIN_PIN_HEIGHT = 90;//Высота главной метки

//Функция для вывода рандомного значения из массива.
var getRandomValueOfArray = function(array, count) {
    var value = array[Math.floor(Math.random() * array.length)];
    return value;
}

//Функция для вывода рандомного числа.
var getRandomNumber = function(min, max) {
    var number = Math.round(min + Math.random() * (max - min));
    return number;
}

//Функция рандомного вывода длинны массива.
var getRandomArrayLength = function(minLength, array) {
    var length = Math.round(minLength + Math.random() * (array.length - minLength));
    return length;
}

//Функция рандомного вывода списка.
var getRandomList = function(array) {
    var featuresList = [];
    for(var i = 0; i <  getRandomArrayLength(MIN_LENGTH, array); i++) {
        featuresList.push(getRandomValueOfArray(array));
    }
    return featuresList;
}

//Функция фильтрации повторяющихся значений.
var getAnArrayWithoutDupclicateValues = function(array) {
    if(array.length < 2) {
        return array;
    } else {
        for(var i = 0; i < array.length; i++) {
            for(var j = i + 1; j < array.length; j++) {
                if(array[i] == array[j]) {
                    array.splice(j, 1);
                }
            }
        }
    }
    return array;
}

var ads = [];//Массив где будет храниться информация о объявлениях.

//Фунция для заполнения массива с информацией о объявлениях.
var getInformationAboutAds = function (array, count) {
    for(var i = 0; i < count; i++) {
        var randomXLocation = getRandomNumber(ADRESS_LOCATION_X_MIN, ADRESS_LOCATION_X_MAX);
        var randomYLocation = getRandomNumber(ADRESS_LOCATION_Y_MIN, ADRESS_LOCATION_Y_MAX);
        array.push(
            {
            'author': {
                'avatar': './img/avatars/user0' + (i + 1) + '.png'
            },
            'offer': {
                'title': OFFER_TITLE[i],
                'adress': 'x: ' + randomXLocation + ', y: ' + randomYLocation,
                'price': getRandomNumber(MIN_PRICE, MAX_PRICE),
                'type': getRandomValueOfArray(HOUSING_TYPES),
                'rooms': getRandomNumber(MIN_NUMBER_OF_ROOMS, MAX_NUMBER_OF_ROOMS),
                'guests': getRandomNumber(MIN_NUMBER_OF_GUESTS, MAX_NUMBER_OF_GUESTS),
                'checkin': getRandomValueOfArray(CHECKIN_AND_CHECKOUT_TIME),
                'checkout': getRandomValueOfArray(CHECKIN_AND_CHECKOUT_TIME),
                'features': getAnArrayWithoutDupclicateValues(getRandomList(FEATURES_LIST)),
                'description': '',
                'photos': getRandomList(PHOTO_PATH),
                'location': {
                    'x': randomXLocation,
                    'y': randomYLocation
                }
            }
            }
        );
    }
    return array;
}

getInformationAboutAds(ads, NUMBER_ADS);//Вызываем функцию чтобы заполнить массив.

var map = document.querySelector('.map');
//Делаем карту активной.
var similarMapPinList = document.querySelector('.map__pins');//Находим элемент куда будем вставлять наши метки. на карте
var similarMapPinTemplate = document.querySelector('template').content.querySelector('.map__pin');//Находимlo шаблон меток.


//Функция для получения меток.
var getPins = function (mapPinElement, id) {
    var mapPin = similarMapPinTemplate.cloneNode(true);

    mapPin.style.left = (mapPinElement.offer.location.x + PIN_WIDTH / 2) + 'px';
    mapPin.style.top = (mapPinElement.offer.location.y + PIN_HEIGHT / 2) + 'px';
    mapPin.querySelector('img').src = mapPinElement.author.avatar;
    mapPin.querySelector('img').alt = mapPinElement.offer.title;
    mapPin.dataset.adsId = id;
    return mapPin;
}



//Функция для генерирования нашей разметки.
var fragmentGenerator = function (array, render) {
    var fragment = document.createDocumentFragment();
    for(var i = 0; i < array.length; i++) {
        fragment.appendChild(render(array[i] , i));
    }
    return fragment;
   
}

var similarMapCardTepmlate = document.querySelector('template').content.querySelector('.map__card');//Находим шаблон карточек объявлений.

//Функция для вставки для списка преимуществ сдаваемого жилья.
var renderListItem = function (element, textClassName, array) {
    element.textContent = '';
    for(var i = 0; i < array.length; i++) {
        element.insertAdjacentHTML('beforeEnd', '<li class="' + textClassName + array[i] + '"></li>');
    }
    return element;
}

//Фунция для вставки списка фотографий сдаваемого жилья.
var renderImage = function (element, array) {
    element.textContent = '';
    for(var i = 0; i < array.length; i++) {
        element.insertAdjacentHTML('beforeEnd', '<li><img src="' + array[i] + '" width="45" height="40"></li>')
    }
}

//Фукнция для отображения на русском тип сдаваемого жилья.
getRightHouseType = function (type) {
    var houseType = ''

    switch(type) {
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
var getMapCards = function (mapCardElelment, id) {
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
    for(var i = 0; i < elements.length; i++) {
        elements[i].disabled = value;
    }
}


toogleConditionInput('fieldset', true);//По умолчанию поля формы неактивны

var mainMainPin = map.querySelector('.map__pin--main');//Находим нашу главную метку

var addressInput = document.querySelector('#address');
addressInput.value = 'x: ' + mainMainPin.offsetLeft + ', y: ' + mainMainPin.offsetTop;

//Функция для активации карты
onMainMapPinClick = function(evt) {
    map.classList.remove('map--faded');
    toogleConditionInput('fieldset', false);
    var a = map.querySelector('.map__pin');
    addressInput.value = 'x: ' + mainMainPin.offsetLeft + ', y: ' + (mainMainPin.offsetTop + MAIN_PIN_HEIGHT / 2);
    if(a && !a.classList.contains('map__pin--main')) {
        map.removeChild(a);
    }
    similarMapPinList.appendChild(fragmentGenerator(ads, getPins));//Вставляем наши метки.
}

mainMainPin.addEventListener('mouseup', onMainMapPinClick)

//Аллилуйя! У меня получилось !╰(▔∀▔)╯ 
// Я страдал 2 дня из-за того-что, что не знал как связать метки на карте и карточки объявления ~(>_<~)
//Функция при клике на метку будет показывать соответствующую карточку с объявлением
onMapPinClick = function(evt) {
    var target = evt.target;
    var mapPin = target.closest('.map__pin');
    var card = map.querySelector('.map__card');
    if(card) {
        map.removeChild(card)
    }
    if(!mapPin.classList.contains('map__pin--main')) {
        map.insertBefore(getMapCards(ads[mapPin.dataset.adsId], mapPin.dataset.adsId), mapFilters);
    }

}

similarMapPinList.addEventListener('click', onMapPinClick)

