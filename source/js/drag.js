'use strict';

(function() {
    var map = document.querySelector('.map');
    var mainMapPin = map.querySelector('.map__pin--main');//Находим нашу главную метку.
    var ADRESS_LOCATION_Y_MIN =  165;
    var MainPin = {
        'WIDTH': 65,
        'HEIGHT': 90
    }

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
            var limitLeft = (map.offsetWidth - map.offsetWidth) + MainPin.WIDTH / 2;
            var limitRight = map.offsetWidth - MainPin.WIDTH / 2;
            var limitTop = (map.offsetHeight - map.offsetHeight) + ADRESS_LOCATION_Y_MIN - MainPin.WIDTH / 2; 
            var limitBottom = map.offsetHeight - ADRESS_LOCATION_Y_MIN;


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