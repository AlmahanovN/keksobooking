'use strict';

(function() {

    window.data = {
        'NUMBER_ADS': 8,
        'OFFER_TITLE': ["Большая уютная квартира", "Маленькая неуютная квартира", "Огромный прекрасный дворец", "Маленький ужасный дворец", "Красивый гостевой домик", "Некрасивый негостеприимный домик", "Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде"],
        'ADRESS_LOCATION_X_MIN': 0,
        'ADRESS_LOCATION_X_MAX': 1200,
        'ADRESS_LOCATION_Y_MIN': 165,
        'ADRESS_LOCATION_Y_MAX': 630,
        'MIN_PRICE': 1000,
        'MAX_PRICE': 1000000,
        'HOUSING_TYPES': ['palace', 'flat', 'house', 'bungalo'],
        'MIN_NUMBER_OF_ROOMS': 1,
        'MAX_NUMBER_OF_ROOMS': 5,
        'MIN_NUMBER_OF_GUESTS': 1,
        'MAX_NUMBER_OF_GUESTS': 4,
        'CHECKIN_AND_CHECKOUT_TIME': ['12:00', '13:00', '14:00'],
        'FEATURES_LIST': [ "wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"],
        'MIN_LENGTH': 1,
        'PHOTO_PATH': ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'],
        'PIN_WIDTH':50,
        'PIN_HEIGHT': 70,
        'MAIN_PIN_WIDTH': 65,
        'MAIN_PIN_HEIGHT': 90,
        'BUNGALO_MIN_PRICE': 0,
        'FLAT_MIN_PRICE': 1000,
        'HOUSE_MIN_PRICE': 5000,
        'PALACE_MIN_PRICE': 10000,
        'AD_MAX_ROOMS': 100,
        'AD_NOT_GUESTS': 0,
        'ads':  []
    }

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

        for (var i = 0; i <  getRandomArrayLength(window.data.MIN_LENGTH, array); i++) {
            featuresList.push(getRandomValueOfArray(array));
        }

        return featuresList;
    }

    //Функция фильтрации повторяющихся значений.
    var getAnArrayWithoutDupclicateValues = function(array) {
        if (array.length < 2) {
            return array;
        } else {
            for (var i = 0; i < array.length; i++) {
                for (var j = i + 1; j < array.length; j++) {
                    if (array[i] === array[j]) {
                        array.splice(j, 1);
                    }
                }
            }
        }

        return array;
    }

    //Фунция для заполнения массива с информацией о объявлениях.
    var getInformationAboutAds = function(array, count) {
        for (var i = 0; i < count; i++) {
            var randomXLocation = getRandomNumber(window.data.ADRESS_LOCATION_X_MIN, window.data.ADRESS_LOCATION_X_MAX);
            var randomYLocation = getRandomNumber(window.data.ADRESS_LOCATION_Y_MIN, window.data.ADRESS_LOCATION_Y_MAX);

            array.push(
                {
                'author': {
                    'avatar': './img/avatars/user0' + (i + 1) + '.png'
                },
                'offer': {
                    'title': window.data.OFFER_TITLE[i],
                    'adress': 'x: ' + randomXLocation + ', y: ' + randomYLocation,
                    'price': getRandomNumber(window.data.MIN_PRICE, window.data.MAX_PRICE),
                    'type': getRandomValueOfArray(window.data.HOUSING_TYPES),
                    'rooms': getRandomNumber(window.data.MIN_NUMBER_OF_ROOMS, window.data.MAX_NUMBER_OF_ROOMS),
                    'guests': getRandomNumber(window.data.MIN_NUMBER_OF_GUESTS, window.data.MAX_NUMBER_OF_GUESTS),
                    'checkin': getRandomValueOfArray(window.data.CHECKIN_AND_CHECKOUT_TIME),
                    'checkout': getRandomValueOfArray(window.data.CHECKIN_AND_CHECKOUT_TIME),
                    'features': getAnArrayWithoutDupclicateValues(getRandomList(window.data.FEATURES_LIST)),
                    'description': '',
                    'photos': getRandomList(window.data.PHOTO_PATH),
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

    getInformationAboutAds(window.data.ads, window.data.NUMBER_ADS);//Вызываем функцию чтобы заполнить массив.
})();