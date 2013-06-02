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
    setInterval(onPlankton, 5000)
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

    for (i = 0; i < cells.length; i++) {

        if (cells[i].getX() < xplankton + 10 && cells[i].getX() + 30 > xplankton && cells[i].getY() < yplankton + 10 && cells[i].getY() + 30 > yplankton){

           //var tempCell = cells[i].id;


            //cells[i].setDos(cells[i].getDos()+1);

            onDoswiadczenie(cells[i]);
            onPlankton();
            

            //cells[i].setDos(cells[i].getDos()+1)

            //util.log("Doswiadczenie: "+cells[i].dos);
            
    //util.log("Doswiadczenie: "+cells[i].getDos());
    }
}



    this.broadcast.emit("move cell", {id: moveCell.id, x: moveCell.getX(), y: moveCell.getY()});
};

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
  //cell.setSpeed(2);
  newLvl  = 2;
}

if(cell.getDos()>7)
{
  cell.setLvl(3);
  //cell.setSpeed(3);
  newLvl  = 3;
}

if(cell.getDos()>15)
{
  cell.setLvl(4);
  //cell.setSpeed(4);
  newLvl  = 4;
}

if(cell.getDos()>31)
{
  cell.setLvl(5);
  //cell.setSpeed(5);
  newLvl  = 5;
}

if(cell.getDos()>63)
{
  cell.setLvl(6);
  //cell.setSpeed(6);
  newLvl  = 6;
}

if(cell.getDos()>127)
{
  cell.setLvl(7);
  //cell.setSpeed(7);
  newLvl  = 7;
}

if(cell.getDos()>255)
{
  cell.setLvl(8);
  //cell.setSpeed(8);
  newLvl  = 8;
}

if(cell.getDos()>513)
{
  cell.setLvl(9);
  //cell.setSpeed(9);
  newLvl  = 9;
}

if(cell.getDos()>1023)
{
  cell.setLvl(10);
  //cell.setSpeed(10);
  newLvl  = 10;
}

util.log("oldLvl" + oldLvl);
util.log("newLvl" + newLvl);


if(oldLvl!=newLvl)
{
  util.log("NOWY LEVEL!");
  cell.setPkt(cell.getPkt()+2);
}


util.log("Poziom gracza "+ cell.id +": "+ cell.getLvl());
//util.log("Szybkość gracza "+ cell.id +": "+ cell.getSpeed());
util.log("Punkty ewolucyjne gracza "+ cell.id +": "+ cell.getPkt());


socket.sockets.socket(cell.id).emit("doswiadczenie", {id: cell.id, dos: cell.getDos(), lvl: cell.getLvl(), pkt: cell.getPkt()});

//socket.sockets.socket(tempCell.id).emit("level", {lvl: tempCell.getLvl(), maxSpeed: tempCell.getSpeed()});

//onLevel(tempCell);



};


function onStatystyki(data) {

var tempCell = cellById(this.id);

tempCell.setPkt(data.pkt);
tempCell.setSpeed(data.maxSpeed);
tempCell.setSi(data.si);
tempCell.setIntel(data.intel);


};


/*function onLevel(numerek) {
var tempCell = cellById(numerek);

if(tempCell.getDos()>3)
{
  tempCell.setLvl(2);
}

if(tempCell.getDos()>7)
{
  tempCell.setLvl(3);
}

if(tempCell.getDos()>15)
{
  tempCell.setLvl(4);
}

if(tempCell.getDos()>31)
{
  tempCell.setLvl(5);
}

if(tempCell.getDos()>63)
{
  tempCell.setLvl(6);
}


util.log("Poziom gracza "+ tempCell.id +": "+ tempCell.getLvl());

socket.sockets.socket(tempCell.id).emit("level", {lvl: tempCell.getLvl()});

onLevel(tempCell);


};*/

function cellById(id) {
    var i;
    for (i = 0; i < cells.length; i++) {
        if (cells[i].id == id){
            return cells[i];
    };
    };
    return false;
};