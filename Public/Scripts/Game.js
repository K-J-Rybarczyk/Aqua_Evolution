var canvas,    
  ctx,     
  keys,     
  cell,
  cells,  
  socket,     
  xplankton,
  yplankton,
  xwir,
  ywir,
  maxx = 770,
  maxy = 570,
  minx = 0,
  miny = 0;

var init = function(){

    canvas = document.getElementById("game");
    ctx = canvas.getContext("2d");
    canvas.width =  maxx;
    canvas.height = maxy;

  keys = new Keys();

  var startX =0,
    startY = 0,
    startDos = 0,
    startMaxSpeed = 1,
    startLvl = 1,
    startPkt = 0,
    startSi = 1,
    startIntel = 1;

  cell = new Cell(startX, startY, startDos, startLvl, startPkt, startMaxSpeed, startSi, startIntel);

  socket = io.connect("http://localhost", {port: 3000, transports: ["websocket"]});

  cells = [];

  setEventHandlers();
};



var setEventHandlers = function() {
  window.addEventListener("keydown", onKeydown, false);
  window.addEventListener("keyup", onKeyup, false);

  socket.on("connect", onSocketConnected);

  socket.on("disconnect", onSocketDisconnect);

  socket.on("new cell", onNewCell);

  socket.on("move cell", onMoveCell);

  socket.on("remove cell", onRemoveCell);

  socket.on("plankton", onPlankton);

  socket.on("wir", onWir);

  socket.on("doswiadczenie", onDoswiadczenie)
};


var onKeydown = function(e){
  if (cell) {
    keys.onKeyDown(e);
  };
};


var onKeyup = function(e){
  if (cell) {
    keys.onKeyUp(e);
  };
};


var onSocketConnected = function(){
  console.log("Connected to socket server");

  socket.emit("new cell", {x: cell.getX(), y: cell.getY(), dos: cell.getDos(), lvl: cell.getLvl(), pkt: cell.getPkt(), maxSpeed: cell.getSpeed(), si: cell.getSi(), intel: cell.getIntel()});

};


var onSocketDisconnect = function(){
  console.log("Disconnected from socket server");
};


var onNewCell = function(data){
  console.log("Witaj komóreczko " +data.id +", nie będziesz samotna :3");
  

  var newCell = new Cell(data.x, data.y, data.dos, data.lvl, data.pkt, data.maxSpeed, data.si, data.intel);
  newCell.id = data.id;
  newCell.dos = data.dos;
  newCell.lvl = data.lvl;
  newCell.pkt = data.pkt;
  newCell.maxSpeed = data.maxSpeed;
  newCell.si = data.si;
  newCell.intel = data.intel;
  cells.push(newCell);


};

var onMoveCell = function(data){
  var moveCell = cellById(data.id);

  if (!moveCell) {
    console.log("Nie widzę "+data.id +" :(");
    return;
  }

  moveCell.setX(data.x);
  moveCell.setY(data.y);
};

var onPlankton = function(data){


    xplankton = data.xplankton;
    yplankton = data.yplankton;

};


var onWir = function(data){


    xwir = data.xwir;
    ywir = data.ywir;

};

var onDoswiadczenie = function(data){

cell.setDos(data.dos);
cell.setLvl(data.lvl);
cell.setPkt(data.pkt);

};

var wypisywanieDanych = function(){

$("#doswiadczenie").text("Aktualne Doswiadczenie: " +cell.getDos())
$("#level").text("Aktualny Level: " +cell.getLvl())
$("#punkty").text("Wolne punkty umiejetnosci: " +cell.getPkt())

setTimeout("wypisywanieDanych()", 1);
};

var wypisywanieStatystyk = function(){

$("#szybkosc").text( cell.getSpeed() )
$("#sila").text( cell.getSi() )
$("#inteligencja").text( cell.getIntel() )

setTimeout("wypisywanieStatystyk()", 1);
};



$(function(){
    $("#Szybkosc").click(function(){
      if(cell.getPkt()>0){
        cell.setSpeed(cell.getSpeed()+1);
        cell.setPkt(cell.getPkt()-1);
}
      socket.emit("statystyki", {pkt: cell.getPkt(), maxSpeed: cell.getSpeed(), si: cell.getSi(), intel: cell.getIntel()});

    });
});



$(function(){
    $("#Sila").click(function(){
      if(cell.getPkt()>0){
        cell.setSi(cell.getSi()+1);
        cell.setPkt(cell.getPkt()-1);

      socket.emit("statystyki", {pkt: cell.getPkt(), maxSpeed: cell.getSpeed(), si: cell.getSi(), intel: cell.getIntel() });
    }
    });
});

$(function(){
    $("#Inteligencja").click(function(){
      if(cell.getPkt()>0){
        cell.setIntel(cell.getIntel()+1);
        cell.setPkt(cell.getPkt()-1);

      socket.emit("statystyki", {pkt: cell.getPkt(), maxSpeed: cell.getSpeed(), si: cell.getSi(), intel: cell.getIntel() });
    }
    });
});



var onRemoveCell = function(data){

  var removeCell = cellById(data.id);

  if (!removeCell) {
    console.log("Nie widzę "+data.id +" :(");
    return;
  }

  cells.splice(cells.indexOf(removeCell), 1);
};



var animate = function(){
  update();
  draw();
  window.requestAnimFrame(animate);
};



var update = function() {
  if (cell.update(keys)) {
    socket.emit("move cell", {x: cell.getX(), y: cell.getY()});
  };
};


var draw = function() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  cell.drawPlankton(ctx,xplankton,yplankton);
  cell.drawWir(ctx,xwir,ywir);
  cell.drawCell(ctx);


  var i;
  for (i = 0; i < cells.length; i++) {
    cells[i].drawCell(ctx);
  };
};



var cellById = function(id) {
  var i;
  for (i = 0; i < cells.length; i++) {
    if (cells[i].id == id){
      return cells[i];
  };
};
};
