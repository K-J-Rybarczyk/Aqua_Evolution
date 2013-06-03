var maxx = 770;
var maxy = 570;
var minx = 0;
var miny = 0;

var util = require("util"),
        io = require("socket.io"),
        Cell = require("./Cell").Cell;

var socket,
        cells,
        xplankton,
        yplankton;


exports.listen = function(port_number) { 
    cells = [];

    socket = io.listen(port_number);
    socket.configure(function() {
        socket.set("transports", ["websocket"]);
        socket.set("log", 0);
    });
    setInterval(onPlankton, 5000);//Wartosc dla testów: setTimeout(onPlankton, 25000);, inaczej nie da się zobaczyć działania walki
    setInterval(onWalka, 500); //Wartosc dla testów: setInterval(onWalka, 10000);, inaczej nie da się zobaczyć działania walki
    setEventHandlers();
};

var setEventHandlers = function() {
    // Socket.IO
    socket.sockets.on("connection", onSocketConnection);
};

function onSocketConnection(cell) {
    util.log("Witaj komóreczko " +cell.id +" ,nie będziesz samotna :3");

    cell.on("disconnect", onCellDisconnect);
    cell.on("new cell", onNewCell);
    cell.on("move cell", onMoveCell);
    cell.on("plankton", onPlankton);
    cell.on("doswiadczenie", onDoswiadczenie);
    cell.on("statystyki", onStatystyki);

};


function onCellDisconnect() {
    util.log("Wracaj szybko "+this.id+ "!:*");

    var removeCell = cellById(this.id);


    if (!removeCell) {
        util.log("Nie widzę "+this.id +" :(");
        util.log("Test1");
        return;
    };

    cells.splice(cells.indexOf(removeCell), 1);
    this.broadcast.emit("remove cell", {id: this.id});
};


function onNewCell(data) {

    var newCell = new Cell(data.x, data.y, data.dos, data.lvl, data.pkt, data.maxSpeed, data.si, data.intel);
    newCell.id = this.id;
    


    this.broadcast.emit("new cell", {id: newCell.id, x: newCell.getX(), y: newCell.getY(), dos: newCell.getDos(), lvl: newCell.getLvl(), pkt: newCell.getPkt(), maxSpeed: newCell.getSpeed(), si: newCell.getSi(), intel: newCell.getIntel()});


    var i, existingCell;
    for (i = 0; i < cells.length; i++) {
        existingCell = cells[i];
        
        this.emit("new cell", {id: existingCell.id, x: existingCell.getX(), y: existingCell.getY(), dos: existingCell.getDos(), lvl: existingCell.getLvl(), pkt: existingCell.getPkt(), maxSpeed: existingCell.getSpeed(), si: existingCell.getSi(), intel: existingCell.getIntel()});

    };

util.log("Doswiadczenie gracza "+ newCell.id +": "+data.dos);
util.log("Poziom gracza "+ newCell.id +": "+ data.lvl);

    cells.push(newCell);
};


function onMoveCell(data) {
    var moveCell = cellById(this.id);

    if (!moveCell) {
        util.log("Nie widzę "+this.id +" :(");
        util.log("Test2");
        return;
    };


    moveCell.setX(data.x);
    moveCell.setY(data.y);


    this.broadcast.emit("move cell", {id: moveCell.id, x: moveCell.getX(), y: moveCell.getY()});
};


function onWalka(){

    var warCells = [];


    for (i = 0; i < cells.length; i++) {

        if (cells[i].getX() < xplankton + 15 && cells[i].getX() + 30 > xplankton && cells[i].getY() < yplankton + 15 && cells[i].getY() + 30 > yplankton){


        warCells.push(cells[i].getSi());

        warCells.sort(porownaj);

        util.log("warCells[0]: " + warCells[0]);
        util.log("cells[i].getSi(): " + cells[i].getSi());


          if(warCells[0]==cells[i].getSi())
            { onDoswiadczenie(cells[i]);
              onPlankton(); }
      

    }
}



}


function porownaj(a,b){

  return b-a;
}

function onPlankton() {
util.log("planktonik");
xplankton = Math.floor((Math.random()*maxx)+0);
yplankton = Math.floor((Math.random()*maxy)+0);

    for(var i = 0; i<cells.length;i++){
        socket.sockets.socket(cells[i].id).emit("plankton", {xplankton : xplankton, yplankton : yplankton});

    };

};


function onDoswiadczenie(cell) {


cell.setDos(cell.getDos()+1);

util.log("Doswiadczenie gracza "+ cell.id +": "+ cell.getDos());

var oldLvl = cell.getLvl();
var newLvl = 1;

if(cell.getDos()>3)
{
  cell.setLvl(2);
  newLvl  = 2;
}

if(cell.getDos()>7)
{
  cell.setLvl(3);
  newLvl  = 3;
}

if(cell.getDos()>15)
{
  cell.setLvl(4);
  newLvl  = 4;
}

if(cell.getDos()>31)
{
  cell.setLvl(5);
  newLvl  = 5;
}

if(cell.getDos()>63)
{
  cell.setLvl(6);
  newLvl  = 6;
}

if(cell.getDos()>127)
{
  cell.setLvl(7);
  newLvl  = 7;
}

if(cell.getDos()>255)
{
  cell.setLvl(8);
  newLvl  = 8;
}

if(cell.getDos()>513)
{
  cell.setLvl(9);
  newLvl  = 9;
}

if(cell.getDos()>1023)
{
  cell.setLvl(10);
  newLvl  = 10;
}

util.log("oldLvl" + oldLvl);
util.log("newLvl" + newLvl);


if(oldLvl!=newLvl)
{
  util.log("NOWY LEVEL!");

  var tempIntel2 = cell.getIntel()

  var tempIntel2 = Math.round(tempIntel2/2)

  cell.setPkt(cell.getPkt()+1+tempIntel2);
}


util.log("Poziom gracza "+ cell.id +": "+ cell.getLvl());
//util.log("Szybkość gracza "+ cell.id +": "+ cell.getSpeed());
util.log("Punkty ewolucyjne gracza "+ cell.id +": "+ cell.getPkt());


socket.sockets.socket(cell.id).emit("doswiadczenie", {id: cell.id, dos: cell.getDos(), lvl: cell.getLvl(), pkt: cell.getPkt()});


};


function onStatystyki(data) {

var tempCell = cellById(this.id);

tempCell.setPkt(data.pkt);
tempCell.setSpeed(data.maxSpeed);
tempCell.setSi(data.si);
tempCell.setIntel(data.intel);


};



function cellById(id) {
    var i;
    for (i = 0; i < cells.length; i++) {
        if (cells[i].id == id){
            return cells[i];
    };
    };
    return false;
};