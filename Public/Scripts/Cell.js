var maxx = 1240;
var maxy = 740;

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

    var getMaxSpeed = function() {
        return maxSpeed;
    };
    var setMaxSpeed = function(newMaxSpeed) {
        maxSpeed = newMaxSpeed;
    };


    var update = function(keys) {

//Zmodernizowana wersja poruszania się, pochodząca z starego Game.js
    if(x<maxx){
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
        x = x + xprzemieszczenie;} 




  //aktualna pozycja stworka
  // NEW: coś mi mówi, że to nie będzie działać, przy wielu użytkownikach...
document.getElementById('hero').style.left = x;
document.getElementById('hero').style.top = y;

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


    };


    return {
        getX: getX,
        getY: getY,
        setX: setX,
        setY: setY,
        update: update
    }
};