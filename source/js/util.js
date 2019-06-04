(function() {

    //*******/
    //В этом модуле я полезные функций.
    //*******/
    
    var KeyCode = {
        'ESC': 27,
        'ENTER': 13  
    }
    
    window.util = {
        'isEscEvent': function(evt, action) {
            if(evt.keyCode === KeyCode.ESC) {
                action();
            }
        },
        'isEnterEvent': function(evt, action) {
            if(evt.keyCode === KeyCode.ENTER) {
                action();
            }
        },
        'errorHandler': function(errorMessage) {
            var node = document.createElement('div');

            node.style = 'z-index: 100; margin: 0 auto; text-align: center; color: white; background-color: red';
            node.style.position = 'fixed';
            node.style.left = 0;
            node.style.right = 0;
            node.style.fontSize = '30px';
            node.textContent = errorMessage;

            document.body.insertAdjacentElement('afterBegin', node);
        }
    }
})();