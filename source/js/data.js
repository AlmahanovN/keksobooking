(function() {

    //*******/
    //В этом модуле я храню данные которые получаю с сервера.
    //*******/
    
    window.data = {
        'ads': []
    }

    var successDataHandler = function(data) {
        window.data.ads = data;
    }

    window.load(successDataHandler, window.util.errorHandler);
})();