var util = require("util"),
        io = require("socket.io"),
        Cell = require("./Cell").Cell;

var socket,
  cells,
  xplankton,
  yplankton,
  xwir,
  ywir,
  maxx = 770,
  maxy = 570,
  minx = 0,
  miny = 0;


exports.listen = function(port_number) { 
    cells = [];

    socket = io.listen(port_number);
    socket.configure(function() {
        socket.set("transports", ["websocket"]);
        socket.set("log", 0);
    });

    var zmiennyCzas = Math.floor((Math.random()*300000)+30000); //300000 - 5 minut, 30000 - 0,5 minuty
    setInterval(onWir, zmiennyCzas);
    setInterval(onPlankton, 5000);
    setInterval(onWalka, 500);
    setInterval(onPsikus, 1); 
    setEventHandlers();
};

var setEventHandlers = function() {
    socket.sockets.on("connection", onSocketConnection);
};

var onSocketConnection = function(cell){
    util.log("Witaj komóreczko " +cell.id +" ,nie będziesz samotna :3");

    cell.on("disconnect", onCellDisconnect);
    cell.on("new cell", onNewCell);
    cell.on("move cell", onMoveCell);
    cell.on("plankton", onPlankton);
    cell.on("wir", onWir);
    cell.on("doswiadczenie", onDoswiadczenie);
    cell.on("statystyki", onStatystyki);

};


var onCellDisconnect = function(){
    util.log("Wracaj szybko "+this.id+ "!:*");

    var removeCell = cellById(this.id);


    if (!removeCell) {
        util.log("Nie widzę "+this.id +" :(");
        return;
    };

    cells.splice(cells.indexOf(removeCell), 1);
    this.broadcast.emit("remove cell", {id: this.id});
};


var onNewCell = function(data){

    var newCell = new Cell(data.x, data.y, data.dos, data.lvl, data.pkt, data.maxSpeed, data.si, data.intel);
    newCell.id = this.id;
    
    this.broadcast.emit("new cell", {id: newCell.id, x: newCell.getX(), y: newCell.getY(), dos: newCell.getDos(), lvl: newCell.getLvl(), pkt: newCell.getPkt(), maxSpeed: newCell.getSpeed(), si: newCell.getSi(), intel: newCell.getIntel()});


    var i, existingCell;
    for (i = 0; i < cells.length; i++) {
        existingCell = cells[i];
        
        this.emit("new cell", {id: existingCell.id, x: existingCell.getX(), y: existingCell.getY(), dos: existingCell.getDos(), lvl: existingCell.getLvl(), pkt: existingCell.getPkt(), maxSpeed: existingCell.getSpeed(), si: existingCell.getSi(), intel: existingCell.getIntel()});

    };


    cells.push(newCell);
};


var onMoveCell = function(data){
    var moveCell = cellById(this.id);

    if (!moveCell) {
        util.log("Nie widzę "+this.id +" :(");
        return;
    };

    moveCell.setX(data.x);
    moveCell.setY(data.y);

    this.broadcast.emit("move cell", {id: moveCell.id, x: moveCell.getX(), y: moveCell.getY()});
};




var onPsikus = function(){

    for (i = 0; i < cells.length; i++) {

        if (cells[i].getX() < xwir + 30 && cells[i].getX() + 30 > xwir && cells[i].getY() < ywir + 30 && cells[i].getY() + 30 > ywir){

      onZaczarowanyPlankton(cells[i]);
      pseudoZnikniecieWiru()
    
    }
}
}




var onWalka = function(){

    var warCells = [];


    for (i = 0; i < cells.length; i++) {

        if (cells[i].getX() < xplankton + 15 && cells[i].getX() + 30 > xplankton && cells[i].getY() < yplankton + 15 && cells[i].getY() + 30 > yplankton){


        warCells.push(cells[i].getSi());

        warCells.sort(porownaj);


          if(warCells[0]==cells[i].getSi()){ 
            onDoswiadczenie(cells[i]);
              onPlankton(); 
          }
     
    }
}


}


var porownaj = function(a,b){

  return b-a;
}



var onPlankton = function(){
util.log("nowy planktonik");
xplankton = Math.floor((Math.random()*maxx)+0);
yplankton = Math.floor((Math.random()*maxy)+0);

    for(var i = 0; i<cells.length;i++){
        socket.sockets.socket(cells[i].id).emit("plankton", {xplankton : xplankton, yplankton : yplankton});

    };

};


var onZaczarowanyPlankton = function(data){



if(data.getX()<maxx-30 && data.getY()<maxy-30){
xplankton = data.getX() +30;
yplankton = data.getY() +30;
}

if(data.getX()>maxx-30 && data.getY()<maxy-30){
xplankton = data.getX() -30;
yplankton = data.getY() +30;
}

if(data.getX()<maxx-30 && data.getY()>maxy-30){
xplankton = data.getX() +30;
yplankton = data.getY() -30;
}

if(data.getX()>maxx-30 && data.getY()>maxy-30){
xplankton = data.getX() -30;
yplankton = data.getY() -30;
}

    for(var i = 0; i<cells.length;i++){
        socket.sockets.socket(cells[i].id).emit("plankton", {xplankton : xplankton, yplankton : yplankton});

    };

};



var onWir = function(){
util.log("nowy wir");
xwir = Math.floor((Math.random()*maxx)+0);
ywir = Math.floor((Math.random()*maxy)+0);

    for(var i = 0; i<cells.length;i++){
        socket.sockets.socket(cells[i].id).emit("wir", {xwir : xwir, ywir : ywir});

    };

    setTimeout(pseudoZnikniecieWiru, 10000)

};

var pseudoZnikniecieWiru = function(){
util.log("Bum, wir zniknął!");
xwir = 1000;
ywir = 1000;

    for(var i = 0; i<cells.length;i++){
        socket.sockets.socket(cells[i].id).emit("wir", {xwir : xwir, ywir : ywir});

    };


}

var onDoswiadczenie = function(cell){


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



if(oldLvl!=newLvl)
{
  var tempIntel2 = cell.getIntel()

  var tempIntel2 = Math.round(tempIntel2/2)

  cell.setPkt(cell.getPkt()+1+tempIntel2);
}



socket.sockets.socket(cell.id).emit("doswiadczenie", {id: cell.id, dos: cell.getDos(), lvl: cell.getLvl(), pkt: cell.getPkt()});


};


var onStatystyki = function(data){

var tempCell = cellById(this.id);

tempCell.setPkt(data.pkt);
tempCell.setSpeed(data.maxSpeed);
tempCell.setSi(data.si);
tempCell.setIntel(data.intel);


};


var cellById = function (id){
    var i;
    for (i = 0; i < cells.length; i++) {
        if (cells[i].id == id){
            return cells[i];
    };
    };
    return false;
};