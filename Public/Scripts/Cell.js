var maxx = 770;
var maxy = 570;
var minx = 0;
var miny = 0;

//Cell.js tu, Cell.js tam, sialalalala... To jest Cell dla klienta.
var Cell = function(xpozycja, ypozycja) {
    var x = xpozycja,
        y = ypozycja,
        id,
        xprzemieszczenie,
        yprzemieszczenie,
        maxSpeed = 2;
    
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

    var getSpeed = function(){
        return maxSpeed;
    };

    var setSpeed = function(newSpeed){
        maxSpeed = newSpeed;  
    };


    var update = function(keys) {

        var prevX = x,
            prevY = y;


//Zmodernizowana wersja poruszania się, pochodząca z starego Game.js
 

/*   if(x<maxx){
        x = x + xprzemieszczenie;
        y = y + yprzemieszczenie;}

    if(y<maxy){
        x = x + xprzemieszczenie;
        y = y + yprzemieszczenie;}

    if(x>maxx){
        x = 0;
        y = y + yprzemieszczenie;} 

    if(y>maxy){
        y = 0;
        x = x + xprzemieszczenie;}

    if(x<minx){
        x = maxx;
        y = y + yprzemieszczenie;} 

    if(y<miny){
        y = maxy;
        x = x + xprzemieszczenie;} */


        x = Math.min(Math.max(x + xprzemieszczenie,minx),maxx);
        y = Math.min(Math.max(y + yprzemieszczenie,miny),maxy);




  //aktualna pozycja stworka
  // NEW: coś mi mówi, że to nie będzie działać, przy wielu użytkownikach...
//document.getElementById('hero').style.left = x;
//document.getElementById('hero').style.top = y;

  //zmiana przemieszczenia, które później wpływa na pozycję
  //Teraz szybkość podana u góry wpływa na szybkość stworka
  if (keys.gora == 1)
    yprzemieszczenie = Math.max(yprzemieszczenie - 1,-1*maxSpeed);
  if (keys.dol == 1)
    yprzemieszczenie = Math.min(yprzemieszczenie + 1,1*maxSpeed);
  if (keys.prawo == 1)
    xprzemieszczenie = Math.min(xprzemieszczenie + 1,1*maxSpeed);
  if (keys.lewo == 1)
    xprzemieszczenie = Math.max(xprzemieszczenie - 1,-1*maxSpeed);

return (prevX != x || prevY != y) ? true : false;

    };

var drawCell = function(ctx) 
{
ctx.fillStyle = "green";
ctx.beginPath();
ctx.arc(xpozycja,ypozycja,15,0,2*Math.PI,true);
ctx.closePath();
ctx.fill();
};


    return {
        getX: getX,
        getY: getY,
        setX: setX,
        setY: setY,
        getSpeed: getSpeed,
        setSpeed: setSpeed,
        drawCell: drawCell,
        update: update
    }
};