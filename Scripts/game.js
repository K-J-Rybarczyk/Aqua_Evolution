var xpozycja = 0;
var xprzemieszczenie = 0;
var ypozycja = 0;
var yprzemieszczenie = 0;
var maxSpeed = 2;
var minx = 0;
var miny = 0;
var maxx = 1218;
var maxy = 764;
var lewo = 0;
var gora = 0;
var prawo = 0;
var dol = 0;
var xplankton = 0;
var yplankton = 0;

//niezbędna funkcja, do wykrycia "od-naciśnięcia" przycisku, bez tego dla programu przycisk będzie cały czas wciśnięty
function keyup(e)
{
  var code = e.keyCode;
  if (code == 37)
    lewo = 0;
  if (code == 38)
    gora = 0;
  if (code == 39)
    prawo = 0;
  if (code == 40)
    dol = 0;
}

//funkcja naciśnięcia klawisza, przy okazji ułatwia pracę z klawiszami, nie musimy w programie używać ciągle kodów klawiszy, tylko nazw do nich przypisanych
function keydown(e)
{
  var code = e.keyCode;
  if (code == 37)
    lewo = 1;
  if (code == 38)
    gora = 1;
  if (code == 39)
    prawo = 1;
  if (code == 40)
    dol = 1;
}

function ruch()
{

		//xpozycja = xpozycja + xprzemieszczenie;
   		//ypozycja = ypozycja + yprzemieszczenie;


		//Przenika na krawędziach mapy, pojawiając się po przeciwnej stronie
		if(xpozycja<maxx){
		xpozycja = xpozycja + xprzemieszczenie;
   		ypozycja = ypozycja + yprzemieszczenie;}

    if(ypozycja<maxy){
    xpozycja = xpozycja + xprzemieszczenie;
      ypozycja = ypozycja + yprzemieszczenie;}

		if(xpozycja>maxx){
		xpozycja = 0;
   		ypozycja = ypozycja + yprzemieszczenie;} 

    if(ypozycja>maxy){
    ypozycja = 0;
      xpozycja = xpozycja + xprzemieszczenie;}

    if(xpozycja<minx){
    xpozycja = maxx;
      ypozycja = ypozycja + yprzemieszczenie;} 

    if(ypozycja<miny){
    ypozycja = maxy;
      xpozycja = xpozycja + xprzemieszczenie;} 




  //aktualna pozycja stworka
document.getElementById('hero').style.left = xpozycja;
document.getElementById('hero').style.top = ypozycja;

  //zmiana przemieszczenia, które później wpływa na pozycję
  //Teraz szybkość podana u góry wpływa na szybkość stworka
  if (gora == 1)
    yprzemieszczenie = Math.max(yprzemieszczenie - 1,-1*maxSpeed);
  if (dol == 1)
    yprzemieszczenie = Math.min(yprzemieszczenie + 1,1*maxSpeed);
  if (prawo == 1)
    xprzemieszczenie = Math.min(xprzemieszczenie + 1,1*maxSpeed);
  if (lewo == 1)
    xprzemieszczenie = Math.max(xprzemieszczenie - 1,-1*maxSpeed);


//Poniższe funkcje są nieprawidłowe - nie biorą pod uwagę "od-nacisnięcia" przycisku, przez co w najlepszym razie - wykonywałyby się w nieskończoność od pierwszego nacisku
//var klawisz = e.keyCode;
/*switch(klawisz){


	case 37:
		//strzałka w lewo
		xprzemieszczenie = xprzemieszczenie - 1;
		xpozycja = xpozycja + xprzemieszczenie;
   		ypozycja = ypozycja + yprzemieszczenie;
	break;


	case 38:
		//strza³ka w górê
		yprzemieszczenie = yprzemieszczenie - 1;
		xpozycja = xpozycja + xprzemieszczenie;
   		ypozycja = ypozycja + yprzemieszczenie;
	break;


	case 39:
		//strzałka w prawo
		xprzemieszczenie = xprzemieszczenie + 1;
		xpozycja = xpozycja + xprzemieszczenie;
   		ypozycja = ypozycja + yprzemieszczenie;
	break;


	case 40:
		//strza³ka w dó³
		yprzemieszczenie = yprzemieszczenie + 1;
		xpozycja = xpozycja + xprzemieszczenie;
   		ypozycja = ypozycja + yprzemieszczenie;
	break;
	}*/


/*if (klawisz==37){
		xprzemieszczenie = xprzemieszczenie - 1;
		xpozycja = xpozycja + xprzemieszczenie;
   		ypozycja = ypozycja + yprzemieszczenie;
}

if (klawisz==38){
		yprzemieszczenie = yprzemieszczenie - 1;
		xpozycja = xpozycja + xprzemieszczenie;
   		ypozycja = ypozycja + yprzemieszczenie;
}

if (klawisz==39){
		xprzemieszczenie = xprzemieszczenie + 1;
		xpozycja = xpozycja + xprzemieszczenie;
   		ypozycja = ypozycja + yprzemieszczenie;
}

if (klawisz==40){
		yprzemieszczenie = yprzemieszczenie + 1;
		xpozycja = xpozycja + xprzemieszczenie;
   		ypozycja = ypozycja + yprzemieszczenie;
}*/


//Wykonywanie powyższej funkcji regularnie co określoną liczbę milisekund
setTimeout("ruch()",20);

}


//Czemu nie działa to cholerne generowanie canvas?!
function plankton()
{

xplankton = Math.floor((Math.random()*maxx)+0);
yplankton = Math.floor((Math.random()*maxy)+0);



var c=document.getElementById("plankton");
var ctx=c.getContext("2d");
ctx.fillStyle = "yellow";
ctx.beginPath();
ctx.arc(xplankton,yplankton,5,0,2*Math.PI,true);
ctx.closePath();
ctx.fill();
    
//setTimeout("plankton()",2500);

}

function pozeranie()
{

if(xpozycja==xplankton){
  plankton();
}

}



