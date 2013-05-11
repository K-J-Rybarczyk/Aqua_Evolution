var xpozycja = 0;
var xprzemieszczenie = 0;
var ypozycja = 0;
var yprzemieszczenie = 0;
var maxSpeed = 2; //PóŸniej bêdzie uzale¿nione od poziomu szybkoœci postaci
var minx = 0;
var miny = 0;
var maxx = 1218;
var maxy = 664;



function ruch()
{

document.getElementById('hero').style.left = xpozycja;
document.getElementById('hero').style.top = ypozycja;

var klawisz = e.keyCode;
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
setTimeout("ruch()",50);

}