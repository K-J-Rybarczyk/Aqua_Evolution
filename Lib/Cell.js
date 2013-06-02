
//Cell.js tu, Cell.js tam, sialalalala... To jest Cell dla serwera. 
var Cell = function(xpozycja, ypozycja, doswiadczenie, level, punkty, maxSpeed, sila, inteligencja) {
    var x = xpozycja,
        y = ypozycja,
        dos = doswiadczenie,
        lvl = level,
        pkt = punkty,
        maxSpeed = maxSpeed,
        si = sila,
        intel = inteligencja,
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

    var getPkt = function() {
        return pkt;
    };

    var setPkt = function(newPkt) {
        pkt = newPkt;
    };

    var getSpeed = function(){
        return maxSpeed;
    };

    var setSpeed = function(newSpeed){
        maxSpeed = newSpeed;  
    };

    var getSi = function(){
        return si;
    };

    var setSi = function(newSi){
        si = newSi;  
    };

    var getIntel = function(){
        return intel;
    };

    var setIntel = function(newIntel){
        intel = newIntel;  
    };


    return {
        getX: getX,
        getY: getY,
        setX: setX,
        setY: setY,
        getDos: getDos,
        setDos: setDos,
        getLvl: getLvl,
        setLvl: setLvl,
        getPkt: getPkt,
        setPkt: setPkt,
        id: id,
        setSpeed : setSpeed,
        getSpeed : getSpeed,
        setSi : setSi,
        getSi : getSi,
        setIntel : setIntel,
        getIntel : getIntel
    };
};

exports.Cell = Cell;