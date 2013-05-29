var util = require("util"),
        io = require("socket.io"),
        Cell = require("./Cell").Cell;

var socket,
        cells;


exports.listen = function(port_number) { 
    cells = [];

    socket = io.listen(port_number);
    socket.configure(function() {
        socket.set("transports", ["websocket"]);
        socket.set("log", 0);
    });

    setEventHandlers();
};

var setEventHandlers = function() {
    // Socket.IO
    socket.sockets.on("connection", onSocketConnection);
};

function onSocketConnection(cell) {
    util.log("New cell has connected: "+cell.id);
    cell.on("disconnect", onCellDisconnect);
    cell.on("new cell", onNewCell);
    cell.on("move cell", onMoveCell);
};


function onCellDisconnect() {
    util.log("Cell has disconnected: "+this.id);

    var removeCell = cellById(this.id);


    if (!removeCell) {
        util.log("Cell not found: "+this.id);
        util.log("Test1");
        return;
    };

    cells.splice(cells.indexOf(removeCell), 1);
    this.broadcast.emit("remove cell", {id: this.id});
};


function onNewCell(data) {

    var newCell = new Cell(data.x, data.y);
    newCell.id = this.id;


    this.broadcast.emit("new cell", {id: newCell.id, x: newCell.getX(), y: newCell.getY()});


    var i, existingCell;
    for (i = 0; i < cells.length; i++) {
        existingCell = cells[i];
        this.emit("new cell", {id: existingCell.id, x: existingCell.getX(), y: existingCell.getY()});
    };
        

    cells.push(newCell);
};


function onMoveCell(data) {
    var moveCell = cellById(this.id);

    if (!moveCell) {
        util.log("Cell not found: "+this.id);
        util.log("Test2");
        return;
    };


    moveCell.setX(data.x);
    moveCell.setY(data.y);

    this.broadcast.emit("move cell", {id: moveCell.id, x: moveCell.getX(), y: moveCell.getY()});
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


