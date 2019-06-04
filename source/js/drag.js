'use strict';

(function() {
    
    //*******/
    //В этом модуле я делаю возможным перетакивание главной метки.
    //*******/

    var map = document.querySelector('.map');
    var mainMapPin = map.querySelector('.map__pin--main');
    var ADRESS_LOCATION_Y_MIN =  165;
    var MainPin = {
        'WIDTH': 65,
        'HEIGHT': 90
    }

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

            var totalCoords = {
                'x': mainMapPin.offsetLeft - shift.x,
                'y': mainMapPin.offsetTop - shift.y
            }

            var limit = {
                'left': (map.offsetWidth - map.offsetWidth) + MainPin.WIDTH / 2,
                'right': map.offsetWidth - MainPin.WIDTH / 2,
                'top': (map.offsetHeight - map.offsetHeight) + ADRESS_LOCATION_Y_MIN - MainPin.WIDTH / 2,
                'bottom': map.offsetHeight - ADRESS_LOCATION_Y_MIN
            }

            mainMapPin.style.left = totalCoords.x + 'px';
            mainMapPin.style.top = totalCoords.y + 'px';
        
            if (totalCoords.x < limit.left) {
                mainMapPin.style.left = limit.left + 'px';
            } else if (totalCoords.x > limit.right) {
                mainMapPin.style.left = limit.right + 'px';
            } else if (totalCoords.y < limit.top) {
                mainMapPin.style.top = limit.top + 'px';
            } else if (totalCoords.y > limit.bottom) {
                mainMapPin.style.top = limit.bottom + 'px';
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