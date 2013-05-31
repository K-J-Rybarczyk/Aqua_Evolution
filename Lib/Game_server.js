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

    var newCell = new Cell(data.x, data.y, data.dos);
    newCell.id = this.id;
    


    this.broadcast.emit("new cell", {id: newCell.id, x: newCell.getX(), y: newCell.getY(), dos: newCell.getDos()});


    var i, existingCell;
    for (i = 0; i < cells.length; i++) {
        existingCell = cells[i];
        
        this.emit("new cell", {id: existingCell.id, x: existingCell.getX(), y: existingCell.getY(), dos: existingCell.getDos()});

    };

util.log("Doswiadczenie gracza "+ newCell.id +": "+data.dos);

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

        if (cells[i].getX() < xplankton + 7 && cells[i].getX() + 30 > xplankton && cells[i].getY() < yplankton + 7 && cells[i].getY() + 30 > yplankton){

            var tempCell = cells[i].id;


            //cells[i].setDos(cells[i].getDos()+1);

            onDoswiadczenie(tempCell);
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


function onDoswiadczenie(numerek) {
var tempCell = cellById(numerek);

tempCell.setDos(tempCell.getDos()+1);

util.log("Doswiadczenie gracza "+ tempCell.id +": "+ tempCell.getDos());

socket.sockets.socket(tempCell.id).emit("doswiadczenie", {dos: tempCell.getDos()});


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