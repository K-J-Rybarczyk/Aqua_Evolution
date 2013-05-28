
//Cell.js tu, Cell.js tam, sialalalala... To jest Cell dla serwera. 
var Cell = function(xpozycja, ypozycja) {
    var x = xpozycja,
        y = ypozycja,
        id;
    
    var getX = function() {
        return x;
    };

    var getY = function() {
        return y;
    };

    var setX = function(newX) {
        x = newX;
    };

    var setY = function(newY) {
        y = newY;
    };

    return {
        getX: getX,
        getY: getY,
        setX: setX,
        setY: setY,
        id: id
    }
};

exports.Cell = Cell;