'use strict';

(function() {
    var map = document.querySelector('.map');
    var mainMapPin = map.querySelector('.map__pin--main');//Находим нашу главную метку.
    

    //Отслеживаем нажатие на главную метку.
    mainMapPin.addEventListener('mousedown', function(evt) {
        evt.preventDefault();

        var startCoords = {
            'x': evt.clientX,
            'y': evt.clientY
        }

        var onMouseMove = function(moveEvt) {
            var shift = {
                'x': startCoords.x - moveEvt.clientX,
                'y': startCoords.y - moveEvt.clientY
            }

            startCoords = {
                'x': moveEvt.clientX,
                'y': moveEvt.clientY
            }

            var xCoordsCalc = mainMapPin.offsetLeft - shift.x;
            var yCoordsCalc = mainMapPin.offsetTop - shift.y
            var limitLeft = (map.offsetWidth - map.offsetWidth) + window.data.MAIN_PIN_WIDTH / 2;
            var limitRight = map.offsetWidth - window.data.MAIN_PIN_WIDTH / 2;
            var limitTop = (map.offsetHeight - map.offsetHeight) +window.data. ADRESS_LOCATION_Y_MIN - window.data.MAIN_PIN_WIDTH / 2; 
            var limitBottom = map.offsetHeight - window.data.ADRESS_LOCATION_Y_MIN;


            mainMapPin.style.left = xCoordsCalc + 'px';
            mainMapPin.style.top = yCoordsCalc + 'px';
        
            if (xCoordsCalc < limitLeft) {
                mainMapPin.style.left = limitLeft + 'px';
            } else if (xCoordsCalc > limitRight) {
                mainMapPin.style.left = limitRight + 'px';
            } else if (yCoordsCalc < limitTop) {
                mainMapPin.style.top = limitTop + 'px';
            } else if (yCoordsCalc > limitBottom) {
                mainMapPin.style.top = limitBottom + 'px';
            }

            window.pinLocation.getMainMapPinLocation();
        }

        

        var onMouseUp = function(upEvt) {
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }

        document.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mouseup', onMouseUp)
    })
})();