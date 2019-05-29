'use strict';

(function() {
    var adForm = document.querySelector('.notice__form');
    var adFormTitleInput = adForm.querySelector('#title');

    var setErrorStyle = function(element, thickness, color) {
        element.style.border = thickness + ' solid ' + color;
    }

    adFormTitleInput.addEventListener('invalid', function() {
        if (adFormTitleInput.validity.tooShort) {
            adFormTitleInput.setCustomValidity('Заголовок объявления должен состоять минимум из 30-и символов. Длинна текста сейчас ' + adFormTitleInput.value.length);
            setErrorStyle(adFormTitleInput, '2px', '#ff0000');
        } else if (adFormTitleInput.validity.tooLong) {
            adFormTitleInput.setCustomValidity('Заголовок объявления должен состоять максимум из 100 символов. Длинна текста сейчас ' + adFormTitleInput.value.length);
            setErrorStyle(adFormTitleInput, '2px', '#ff0000');
        } else if (adFormTitleInput.validity.valueMissing) {
            adFormTitleInput.setCustomValidity('Обязательное поле');
            setErrorStyle(adFormTitleInput, '2px', '#ff0000');
        } else {
            adFormTitleInput.setCustomValidity('');
            setErrorStyle(adFormTitleInput, '1px', "#d9d9d3");
        }
    })

    var adFormType = adForm.querySelector('#type');
    var adFormPriceInput = adForm.querySelector('#price');
    var adFormPriceInputMin = 0;

    var getMinPrice = function() {
        var adFormTypeSelectedValue = adFormType.options[adFormType.selectedIndex].value;

        switch (adFormTypeSelectedValue) {
            case 'bungalo': 
                adFormPriceInputMin = window.data.BUNGALO_MIN_PRICE;
                break;
            case 'flat':
                adFormPriceInputMin = window.data.FLAT_MIN_PRICE;
                break;
            case 'house':
                adFormPriceInputMin = window.data.HOUSE_MIN_PRICE;
                break;
            case 'palace':
                adFormPriceInputMin = window.data.PALACE_MIN_PRICE;
                break;
        }

        adFormPriceInput.placeholder = adFormPriceInputMin;
        adFormPriceInput.min = adFormPriceInputMin;
    }

    adFormType.addEventListener('change', getMinPrice)

    adFormPriceInput.addEventListener('invalid', function() {
        if (adFormPriceInput.validity.rangeOverflow) {
            adFormPriceInput.setCustomValidity('Цена не должна превышать ' + adFormPriceInput.max + ' рублей');
            setErrorStyle(adFormPriceInput, '2px', '#ff0000');
        } else if (adFormPriceInput.validity.rangeUnderflow) {
            adFormPriceInput.setCustomValidity('Цена не должна быть ниже ' + adFormPriceInput.min + ' рублей');
            setErrorStyle(adFormPriceInput, '2px', '#ff0000');
        } else if (adFormPriceInput.validity.valueMissing) {
            adFormPriceInput.setCustomValidity('Обязательное поле');
            setErrorStyle(adFormPriceInput, '2px', '#ff0000');
        } else {
            adFormPriceInput.setCustomValidity('');
            setErrorStyle(adFormPriceInput, '1px', "#d9d9d3");
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
                if (+adFormNumderGuestsSelect.options[i].value === window.data.AD_NOT_GUESTS) {
                    adFormNumderGuestsSelect.options[i].disabled = true;
                } 
            } 
            if (+selectedOption.value === window.data.AD_MAX_ROOMS) {
                adFormNumderGuestsSelect.options[i].disabled = true;
                if (+adFormNumderGuestsSelect.options[i].value === window.data.AD_NOT_GUESTS) {
                    adFormNumderGuestsSelect.options[i].disabled = false;
                }
            }
        }
    }


    var validityNumberAndGuestsInputs = function() {
        if (adFormNumderGuestsSelect.options[adFormNumderGuestsSelect.selectedIndex].disabled === true) {
            adFormNumderGuestsSelect.setCustomValidity('Выбрано недопустимое значение. Пожалуйста, попробуйте выбрать');
            setErrorStyle(adFormNumderGuestsSelect, '2px', '#ff0000');;
        } else {
            adFormNumderGuestsSelect.setCustomValidity('');
            setErrorStyle(adFormNumderGuestsSelect, '1px', "#d9d9d3");
        }
    }

    adFormNumberRoomsSelect.addEventListener('change', function(evt) {
        syncRoomsGuetsSelect(evt);
        validityNumberAndGuestsInputs();
    })

    adFormNumderGuestsSelect.addEventListener('change', validityNumberAndGuestsInputs)
})();
