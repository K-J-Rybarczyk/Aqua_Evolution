
//Cell.js tu, Cell.js tam, sialalalala... To jest Cell dla serwera. 
var Cell = function(xpozycja, ypozycja) {
    var x = xpozycja,
        y = ypozycja,
        maxSpeed = 2,
        id;
    
    var getX = function() {
        return x;
    };

    var setX = function(newX) {
        x = newX;
    };

    var getY = function() {
        return y;
    };

    var setY = function(newY) {
        y = newY;
    };

    var getSpeed = function(){
        return maxSpeed;
    };

    var setSpeed = function(newSpeed){
        maxSpeed = newSpeed;  
    };

    return {
        getX: getX,
        getY: getY,
        setX: setX,
        setY: setY,
        id: id,
        setSpeed : setSpeed,
        getSpeed : getSpeed
    };
};

exports.Cell = Cell;