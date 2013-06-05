var maxx = 770,
    maxy = 570,
    minx = 0,
    miny = 0;

var Cell = function(xpozycja, ypozycja, doswiadczenie, level, punkty, maxSpeed, sila, inteligencja) {
    var x = xpozycja,
        y = ypozycja,
        dos = doswiadczenie,
        lvl = level,
        pkt = punkty,
        id,
        si = sila,
        intel = inteligencja,
        maxSpeed = maxSpeed;
    
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


    var update = function(keys) {
        var oldX = x,
            oldY = y;



     if(x>maxx){
        x = minx;
        y = y + maxSpeed;
    } 

    if(y>maxy){
        x = x + maxSpeed;
        y = miny;        
    }

    if(x<minx){
        x = maxx;
        y = y + maxSpeed;
    } 

    if(y<miny){
        x = x + maxSpeed;
        y = maxy;        
    } 





        if (keys.gora) {
            y = y - maxSpeed;
        };
        
        if (keys.dol) {
            y = y + maxSpeed;
        };


        if (keys.lewo) {
            x = x - maxSpeed;
        };
        
        if (keys.prawo) {
            x = x + maxSpeed;
        };

        return (oldX != x || oldY != y) ? true : false;
    };



var drawCell = function(ctx) 
{

ctx.fillStyle = "#41A317";
ctx.beginPath();
ctx.arc(x,y,15,0,2*Math.PI,true);
ctx.closePath();
ctx.fill();

//////////////////Pierwszy segment macek//////////////////

ctx.fillStyle = "#4CC417";
ctx.beginPath();
ctx.arc(x+10,y+10,5,0,2*Math.PI,true);
ctx.closePath();
ctx.fill();

ctx.fillStyle = "#4CC417";
ctx.beginPath();
ctx.arc(x-10,y-10,5,0,2*Math.PI,true);
ctx.closePath();
ctx.fill();

ctx.fillStyle = "#4CC417";
ctx.beginPath();
ctx.arc(x-10,y+10,5,0,2*Math.PI,true);
ctx.closePath();
ctx.fill();

ctx.fillStyle = "#4CC417";
ctx.beginPath();
ctx.arc(x+10,y-10,5,0,2*Math.PI,true);
ctx.closePath();
ctx.fill();

ctx.fillStyle = "#4CC417";
ctx.beginPath();
ctx.arc(x,y-15,5,0,2*Math.PI,true);
ctx.closePath();
ctx.fill();

ctx.fillStyle = "#4CC417";
ctx.beginPath();
ctx.arc(x,y+15,5,0,2*Math.PI,true);
ctx.closePath();
ctx.fill();

ctx.fillStyle = "#4CC417";
ctx.beginPath();
ctx.arc(x-15,y,5,0,2*Math.PI,true);
ctx.closePath();
ctx.fill();

ctx.fillStyle = "#4CC417";
ctx.beginPath();
ctx.arc(x+15,y,5,0,2*Math.PI,true);
ctx.closePath();
ctx.fill();

//////////////////Drugi segment macek//////////////////

ctx.fillStyle = "#52DA17";
ctx.beginPath();
ctx.arc(x+13,y+13,4,0,2*Math.PI,true);
ctx.closePath();
ctx.fill();

ctx.fillStyle = "#52DA17";
ctx.beginPath();
ctx.arc(x-13,y-13,4,0,2*Math.PI,true);
ctx.closePath();
ctx.fill();

ctx.fillStyle = "#52DA17";
ctx.beginPath();
ctx.arc(x-13,y+13,4,0,2*Math.PI,true);
ctx.closePath();
ctx.fill();

ctx.fillStyle = "#52DA17";
ctx.beginPath();
ctx.arc(x+13,y-13,4,0,2*Math.PI,true);
ctx.closePath();
ctx.fill();

ctx.fillStyle = "#52DA17";
ctx.beginPath();
ctx.arc(x,y-18,4,0,2*Math.PI,true);
ctx.closePath();
ctx.fill();

ctx.fillStyle = "#52DA17";
ctx.beginPath();
ctx.arc(x,y+18,4,0,2*Math.PI,true);
ctx.closePath();
ctx.fill();

ctx.fillStyle = "#52DA17";
ctx.beginPath();
ctx.arc(x-18,y,4,0,2*Math.PI,true);
ctx.closePath();
ctx.fill();

ctx.fillStyle = "#52DA17";
ctx.beginPath();
ctx.arc(x+18,y,4,0,2*Math.PI,true);
ctx.closePath();
ctx.fill();

//////////////////Trzeci segment macek//////////////////

ctx.fillStyle = "#7FE817";
ctx.beginPath();
ctx.arc(x+16,y+16,3,0,2*Math.PI,true);
ctx.closePath();
ctx.fill();

ctx.fillStyle = "#7FE817";
ctx.beginPath();
ctx.arc(x-16,y-16,3,0,2*Math.PI,true);
ctx.closePath();
ctx.fill();

ctx.fillStyle = "#7FE817";
ctx.beginPath();
ctx.arc(x-16,y+16,3,0,2*Math.PI,true);
ctx.closePath();
ctx.fill();

ctx.fillStyle = "#7FE817";
ctx.beginPath();
ctx.arc(x+16,y-16,3,0,2*Math.PI,true);
ctx.closePath();
ctx.fill();

ctx.fillStyle = "#7FE817";
ctx.beginPath();
ctx.arc(x,y-21,3,0,2*Math.PI,true);
ctx.closePath();
ctx.fill();

ctx.fillStyle = "#7FE817";
ctx.beginPath();
ctx.arc(x,y+21,3,0,2*Math.PI,true);
ctx.closePath();
ctx.fill();

ctx.fillStyle = "#7FE817";
ctx.beginPath();
ctx.arc(x-21,y,3,0,2*Math.PI,true);
ctx.closePath();
ctx.fill();

ctx.fillStyle = "#7FE817";
ctx.beginPath();
ctx.arc(x+21,y,3,0,2*Math.PI,true);
ctx.closePath();
ctx.fill();


//////////////////Oczy//////////////////


ctx.strokeStyle = "#FFE87C";
ctx.font="15px Arial";
ctx.strokeText("^ ^",x-8,y+5);


//////////////////Zmiany w wyglądzie według statystyk//////////////////

if (maxSpeed>10){

ctx.fillStyle = "#B1FB17";
ctx.beginPath();
ctx.arc(x+19,y+19,5,0,2*Math.PI,true);
ctx.closePath();
ctx.fill();

ctx.fillStyle = "#B1FB17";
ctx.beginPath();
ctx.arc(x-19,y-19,5,0,2*Math.PI,true);
ctx.closePath();
ctx.fill();

ctx.fillStyle = "#B1FB17";
ctx.beginPath();
ctx.arc(x-19,y+19,5,0,2*Math.PI,true);
ctx.closePath();
ctx.fill();

ctx.fillStyle = "#B1FB17";
ctx.beginPath();
ctx.arc(x+19,y-19,5,0,2*Math.PI,true);
ctx.closePath();
ctx.fill();

ctx.fillStyle = "#B1FB17";
ctx.beginPath();
ctx.arc(x,y-24,5,0,2*Math.PI,true);
ctx.closePath();
ctx.fill();

ctx.fillStyle = "#B1FB17";
ctx.beginPath();
ctx.arc(x,y+24,5,0,2*Math.PI,true);
ctx.closePath();
ctx.fill();

ctx.fillStyle = "#B1FB17";
ctx.beginPath();
ctx.arc(x-24,y,5,0,2*Math.PI,true);
ctx.closePath();
ctx.fill();

ctx.fillStyle = "#B1FB17";
ctx.beginPath();
ctx.arc(x+24,y,5,0,2*Math.PI,true);
ctx.closePath();
ctx.fill();

}


if (si>10){
ctx.strokeStyle = "white";
ctx.font="10px Arial";
ctx.strokeText("ww",x-7,y+10);
}

if (intel>10){
ctx.fillStyle = "#151B8D";
ctx.font="bold 16px Arial";
ctx.fillText("-OO-",x-18,y+4);
}


};

var drawPlankton = function(ctx,xplankton,yplankton)
{


ctx.fillStyle = "yellow";

ctx.beginPath();
ctx.arc(xplankton,yplankton,7,0,2*Math.PI,true);
ctx.closePath();
ctx.fill();


}



var drawWir = function(ctx,xwir,ywir)
{


ctx.fillStyle = "#0020C2";
ctx.beginPath();
ctx.arc(xwir,ywir,21,0,2*Math.PI,true);
ctx.closePath();
ctx.fill();

ctx.fillStyle = "#56A5EC";
ctx.beginPath();
ctx.arc(xwir,ywir,18,0,2*Math.PI,true);
ctx.closePath();
ctx.fill();

ctx.fillStyle = "#0020C2";
ctx.beginPath();
ctx.arc(xwir,ywir,15,0,2*Math.PI,true);
ctx.closePath();
ctx.fill();

ctx.fillStyle = "#56A5EC";
ctx.beginPath();
ctx.arc(xwir,ywir,12,0,2*Math.PI,true);
ctx.closePath();
ctx.fill();

ctx.fillStyle = "#0020C2";
ctx.beginPath();
ctx.arc(xwir,ywir,9,0,2*Math.PI,true);
ctx.closePath();
ctx.fill();

ctx.fillStyle = "#56A5EC";
ctx.beginPath();
ctx.arc(xwir,ywir,6,0,2*Math.PI,true);
ctx.closePath();
ctx.fill();

ctx.fillStyle = "#0020C2";
ctx.beginPath();
ctx.arc(xwir,ywir,3,0,2*Math.PI,true);
ctx.closePath();
ctx.fill();
}



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
        id:id,
        getSpeed: getSpeed,
        setSpeed: setSpeed,
        setSi : setSi,
        getSi : getSi,
        setIntel : setIntel,
        getIntel : getIntel,
        drawCell: drawCell,
        drawPlankton: drawPlankton,
        drawWir: drawWir,
        update: update
    }
};