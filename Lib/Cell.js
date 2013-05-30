
//Cell.js tu, Cell.js tam, sialalalala... To jest Cell dla serwera. 
var Cell = function(xpozycja, ypozycja) {
    var x = xpozycja,
        y = ypozycja,
        dos = doswiadczenie=0,
        lvl = level=0,
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


    var getDos = function() {
        return dos;
    };

    var setDos = function(newDos) {
        dos = newDos;
    };

    var getLvl = function() {
        return lvl;
    };

    var setLvl = function(newLvl) {
        lvl = newLvl;
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