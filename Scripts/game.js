var xpozycja = 0;
var xprzemieszczenie = 0;
var ypozycja = 0;
var yprzemieszczenie = 0;
var maxSpeed = 2; //PóŸniej bêdzie uzale¿nione od poziomu szybkoœci postaci
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


		//narazie wychodzi poza mapę, muszę wymyśleć rozwiązanie tego problemu (będzie spore...)
		if(xpozycja<maxx && ypozycja<maxy){
		xpozycja = xpozycja + xprzemieszczenie;
   		ypozycja = ypozycja + yprzemieszczenie;}

		if(xpozycja>maxx && ypozycja<maxy){
		xpozycja = 0;
   		ypozycja = ypozycja + yprzemieszczenie;} 

		if(xpozycja<maxx && ypozycja>maxy){
		xpozycja = xpozycja + xprzemieszczenie;
   		ypozycja = 0;}

		if(xpozycja>maxx && ypozycja>maxy){
		xpozycja = 0;
   		ypozycja = 0;}		

   		if(xpozycja<0 && ypozycja<maxy){
		xpozycja = maxx;
   		ypozycja = ypozycja;}

  //aktualna pozycja stworka
document.getElementById('hero').style.left = xpozycja;
document.getElementById('hero').style.top = ypozycja;

  //zmiana przemieszczenia, które później wpływa na pozycję
  if (gora == 1)
    yprzemieszczenie = yprzemieszczenie - 1;
  if (dol == 1)
    yprzemieszczenie = yprzemieszczenie + 1;
  if (prawo == 1)
    xprzemieszczenie = xprzemieszczenie + 1;
  if (lewo == 1)
    xprzemieszczenie = xprzemieszczenie - 1;


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
ctx.fillStyle = "green";
ctx.beginPath();
ctx.arc(xplankton,yplankton,5,0,2*Math.PI,true);
ctx.closePath();
ctx.fill();
    
//setTimeout("plankton()",2500);

}

function pozeranie()
{


}



