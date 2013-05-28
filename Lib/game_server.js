var util = require("util"),
        io = require("socket.io"),
        Cell = require("./js/Cell").Cell;

var socket,
        players;

exports.listen = function(port_number) {
    players = [];

    socket = io.listen(port_number);
    socket.configure(function() {
        //Metody transportu - tylko u¿ywany websocket
        socket.set("transports", ["websocket"]);
        socket.set("log", 0);
    });
    setEventHandlers();
};

var setEventHandlers = function() {
    socket.sockets.on("connection", onSocketConnection);
}

function onSocketConnection(client) {
    util.log("New player has connected: "+client.id);
    client.on("disconnect", onClientDisconnect);
    client.on("new player", onNewPlayer);
    client.on("move player", onMovePlayer);
};


function onClientDisconnect() {
    util.log("Player has disconnected: "+this.id);
};

function onNewPlayer(data) {

};

function onMovePlayer(data) {

};