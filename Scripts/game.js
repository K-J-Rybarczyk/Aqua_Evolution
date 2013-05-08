window.onload=init;


var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");

// Create gradient
var grd=ctx.createRadialGradient(70,50,50,450,300,5000);
grd.addColorStop(0,"blue");
grd.addColorStop(1,"black");

// Fill with gradient
ctx.fillStyle=grd;
ctx.fillRect(0,0,1350,660);
