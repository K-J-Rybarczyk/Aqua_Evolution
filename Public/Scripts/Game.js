var maxx = 770;
var maxy = 570;
var minx = 0;
var miny = 0;

var canvas,    
  ctx,     
  keys,     
  cell,
  cells,  
  socket,     
  xplankton,
  yplankton;


function init() {

    canvas = document.getElementById("game");
    ctx = canvas.getContext("2d");
    ctx.fillStyle='#CC5422';
    canvas.width =  maxx;
    canvas.height = maxy;

  keys = new Keys();

  var startX =0,
    startY = 0,
    startDos = 0,
    startMaxSpeed = 1,
    startLvl = 1;

  cell = new Cell(startX, startY, startDos, startLvl, startMaxSpeed);

  socket = io.connect("http://localhost", {port: 3000, transports: ["websocket"]});

  cells = [];

  setEventHandlers();
};



var setEventHandlers = function() {
  window.addEventListener("keydown", onKeydown, false);
  window.addEventListener("keyup", onKeyup, false);
  window.addEventListener("resize", onResize, false);

  socket.on("connect", onSocketConnected);

  socket.on("disconnect", onSocketDisconnect);

  socket.on("new cell", onNewCell);

  socket.on("move cell", onMoveCell);

  socket.on("remove cell", onRemoveCell);

  socket.on("plankton", onPlankton);

  socket.on("doswiadczenie", onDoswiadczenie)
};

function onKeydown(e) {
  if (cell) {
    keys.onKeyDown(e);
  };
};


function onKeyup(e) {
  if (cell) {
    keys.onKeyUp(e);
  };
};


function onResize(e) {
  canvas.width = maxx;
  canvas.height = maxy;
};

function onSocketConnected() {
  console.log("Connected to socket server");

  socket.emit("new cell", {x: cell.getX(), y: cell.getY(), dos: cell.getDos(), lvl: cell.getLvl(), maxSpeed: cell.getSpeed()});

};


function onSocketDisconnect() {
  console.log("Disconnected from socket server");
};


function onNewCell(data) {
  console.log("Witaj komóreczko " +data.id +", nie będziesz samotna :3");
  

  var newCell = new Cell(data.x, data.y, data.dos, data.lvl, data.maxSpeed);
  newCell.id = data.id;
  newCell.dos = data.dos;
  newCell.lvl = data.lvl;
  newCell.maxSpeed = data.maxSpeed;
  cells.push(newCell);


};

function onMoveCell(data) {
  var moveCell = cellById(data.id);

  if (!moveCell) {
    console.log("Nie widzę "+data.id +" :(");
    util.log("Test3");
    return;
  }

  moveCell.setX(data.x);
  moveCell.setY(data.y);
};

function onPlankton(data) {


    xplankton = data.xplankton;
    yplankton = data.yplankton;

};

function onDoswiadczenie(data) {

cell.setDos(data.dos);
cell.setLvl(data.lvl);
cell.setSpeed(data.maxSpeed);

};

function onRemoveCell(data) {
  var removeCell = cellById(data.id);

  if (!removeCell) {
    console.log("Nie widzę "+data.id +" :(");
    util.log("Test4");
    return;
  }

  cells.splice(cells.indexOf(removeCell), 1);
};



function animate() {
  update();
  draw();
  window.requestAnimFrame(animate);
};



function update() {
  if (cell.update(keys)) {
    socket.emit("move cell", {x: cell.getX(), y: cell.getY()});
  };
};



function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  cell.drawPlankton(ctx,xplankton,yplankton);
  cell.drawCell(ctx);


  var i;
  for (i = 0; i < cells.length; i++) {
    cells[i].drawCell(ctx);
  };
};



function cellById(id) {
  var i;
  for (i = 0; i < cells.length; i++) {
    if (cells[i].id == id){
      return cells[i];
  };
};
};
