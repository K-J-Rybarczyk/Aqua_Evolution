var maxx = 770;
var maxy = 570;
var minx = 0;
var miny = 0;

//Cell.js tu, Cell.js tam, sialalalala... To jest Cell dla klienta.
var Cell = function(xpozycja, ypozycja, doswiadczenie, level, maxSpeed) {
    var x = xpozycja,
        y = ypozycja,
        dos = doswiadczenie,
        lvl = level,
        id,
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

    var getSpeed = function(){
        return maxSpeed;
    };

    var setSpeed = function(newSpeed){
        maxSpeed = newSpeed;  
    };


    // Update player position
    var update = function(keys) {
        // Previous position
        var prevX = x,
            prevY = y;



     if(x>maxx){
        x = 0;
        y = y + maxSpeed;} 

    if(y>maxy){
        y = 0;
        x = x + maxSpeed;}

    if(x<minx){
        x = maxx;
        y = y + maxSpeed;} 

    if(y<miny){
        y = maxy;
        x = x + maxSpeed;} 




        // Up key takes priority over down
        if (keys.gora) {
            y = y - maxSpeed;
        } else if (keys.dol) {
            y = y + maxSpeed;
        };

        // Left key takes priority over right
        if (keys.lewo) {
            x = x - maxSpeed;
        } else if (keys.prawo) {
            x = x + maxSpeed;
        };

        return (prevX != x || prevY != y) ? true : false;
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


ctx.strokeStyle = 'white';
ctx.font="15px Arial";
ctx.strokeText("^ ^",x-8,y+7);

};

var drawPlankton = function(ctx,xplankton,yplankton)
{


ctx.fillStyle = "yellow";

ctx.beginPath();
ctx.arc(xplankton,yplankton,7,0,2*Math.PI,true);
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
        id:id,
        getSpeed: getSpeed,
        setSpeed: setSpeed,
        drawCell: drawCell,
        drawPlankton: drawPlankton,
        update: update
    }
};