'use strict';

(function() {

    //*******/
    //В этом модуле я делаю валидацию формы и отправку его данных.
    //*******/

    var adForm = document.querySelector('.notice__form');
    var adFormTitleInput = adForm.querySelector('#title');

    var apartmentMinPrice = {
        'BUNGALO': 0,
        'FLAT': 1000,
        'HOUSE': 5000,
        'PALACE': 10000,
    }

    var AD_MAX_ROOMS = 100;
    var AD_NOT_GUESTS = 0;

    adFormTitleInput.addEventListener('invalid', function() {
        if (adFormTitleInput.validity.tooShort) {
            adFormTitleInput.setCustomValidity('Заголовок объявления должен состоять минимум из 30-и символов. Длинна текста сейчас ' + adFormTitleInput.value.length);
        } else if (adFormTitleInput.validity.tooLong) {
            adFormTitleInput.setCustomValidity('Заголовок объявления должен состоять максимум из 100 символов. Длинна текста сейчас ' + adFormTitleInput.value.length);
        } else if (adFormTitleInput.validity.valueMissing) {
            adFormTitleInput.setCustomValidity('Обязательное поле');
        } else {
            adFormTitleInput.setCustomValidity('');
        }
    })

    var adFormType = adForm.querySelector('#type');
    var adFormPriceInput = adForm.querySelector('#price');
    var adFormPriceInputMin = 0;

    var getMinPrice = function() {
        var adFormTypeSelectedValue = adFormType.options[adFormType.selectedIndex].value;

        switch (adFormTypeSelectedValue) {
            case 'bungalo': 
                adFormPriceInputMin = apartmentMinPrice.BUNGALO;
                break;
            case 'flat':
                adFormPriceInputMin = apartmentMinPrice.FLAT;
                break;
            case 'house':
                adFormPriceInputMin = apartmentMinPrice.HOUSE;
                break;
            case 'palace':
                adFormPriceInputMin = apartmentMinPrice.PALACE;
                break;
        }

        adFormPriceInput.placeholder = adFormPriceInputMin;
        adFormPriceInput.min = adFormPriceInputMin;
    }

    adFormType.addEventListener('change', getMinPrice)

    adFormPriceInput.addEventListener('invalid', function() {
        if (adFormPriceInput.validity.rangeOverflow) {
            adFormPriceInput.setCustomValidity('Цена не должна превышать ' + adFormPriceInput.max + ' рублей');
        } else if (adFormPriceInput.validity.rangeUnderflow) {
            adFormPriceInput.setCustomValidity('Цена не должна быть ниже ' + adFormPriceInput.min + ' рублей');
        } else if (adFormPriceInput.validity.valueMissing) {
            adFormPriceInput.setCustomValidity('Обязательное поле');
        } else {
            adFormPriceInput.setCustomValidity('');
        }
    })

    var adFormCheckinTimeSelect = adForm.querySelector('#timein');
    var adFormChechkoutTimeSelect = adForm.querySelector('#timeout');

    var syncCheckinChechkoutTime = function(evt, selectElement) {
        var target = evt.currentTarget.selectedIndex;

        selectElement.options[target].selected = true;
    }

    adFormCheckinTimeSelect.addEventListener('change', function(evt){
        syncCheckinChechkoutTime(evt, adFormChechkoutTimeSelect);
    })

    adFormChechkoutTimeSelect.addEventListener('change', function(evt) {
        syncCheckinChechkoutTime(evt, adFormCheckinTimeSelect);
    })

    var adFormNumberRoomsSelect = adForm.querySelector('#room_number');
    var adFormNumderGuestsSelect = adForm.querySelector('#capacity');

    var syncRoomsGuetsSelect = function(evt) {
        var target = evt.currentTarget;
        var selectedOption = target.options[target.selectedIndex];
        
        for (var i = 0; i < target.length; i++) {     
            adFormNumderGuestsSelect.options[i].disabled = true;
            if (+selectedOption.value >=  +adFormNumderGuestsSelect.options[i].value) {
                adFormNumderGuestsSelect.options[i].disabled = false;
                if (+adFormNumderGuestsSelect.options[i].value === AD_NOT_GUESTS) {
                    adFormNumderGuestsSelect.options[i].disabled = true;
                } 
            } 
            if (+selectedOption.value === AD_MAX_ROOMS) {
                adFormNumderGuestsSelect.options[i].disabled = true;
                if (+adFormNumderGuestsSelect.options[i].value === AD_NOT_GUESTS) {
                    adFormNumderGuestsSelect.options[i].disabled = false;
                }
            }
        }
    }


    var validityNumberAndGuestsInputs = function() {
        if (adFormNumderGuestsSelect.options[adFormNumderGuestsSelect.selectedIndex].disabled === true) {
            adFormNumderGuestsSelect.setCustomValidity('Выбрано недопустимое значение. Пожалуйста, попробуйте выбрать');
        } else {
            adFormNumderGuestsSelect.setCustomValidity('');
        }
    }

    adFormNumberRoomsSelect.addEventListener('change', function(evt) {
        syncRoomsGuetsSelect(evt);
        validityNumberAndGuestsInputs();
    })

    adFormNumderGuestsSelect.addEventListener('change', validityNumberAndGuestsInputs)

    var successFormHandler = function(message) {
        var node = document.createElement('div');
        node.style = 'z-index: 100; margin: 0 auto; text-align: center; color: #ffffff; font-size: 50px; background-color: green; opacity: 0.85; cursor: pointer;';
        node.style.position = 'fixed';
        node.style.left = 0;
        node.style.right = 0;
        node.style.top = 0;
        node.style.bottom = 0;

        node.insertAdjacentHTML('afterBegin', '<p>Форма отправлена успешно</p>')
        

        document.body.appendChild(node);

        var closeSuccessPopup = function(evt) {
            evt.preventDefault();
            document.body.removeChild(node);
        }

        node.addEventListener('click', function(evt) {
            closeSuccessPopup(evt)
        })

        window.addEventListener('keydown', function(evt) {
            window.util.isEscEvent(evt, closeSuccessPopup(evt));
        })
    }

    adForm.addEventListener('submit', function(evt) {
        window.save(new FormData(adForm), successFormHandler, window.util.errorHandler)
        evt.preventDefault();
    })
})();
