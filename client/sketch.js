const socket = io(window.location.href);
socket.on("drawLine", (data) => {
  // console.log(data);
  points.push(createVector(data[0], data[1]));
  stroke("#458545");
  noFill();
  beginShape();
  for (let i = 0; i < points.length; i++) {
    x = points[i].x;
    y = points[i].y;
    vertex(x, y);
  }
  endShape();
});
socket.on("clean", () => {
  points = [];
});
let x, y;
start = false;
points = [];
function setup() {
  createCanvas(1000, 500);
  background(51);
}
function draw() {
  if (start) {
    points.push(createVector(mouseX, mouseY));
    socket.emit("vecs", [mouseX, mouseY]);
  }
  stroke("#458545");
  noFill();
  beginShape();
  for (let i = 0; i < points.length; i++) {
    x = points[i].x;
    y = points[i].y;
    vertex(x, y);
  }
  endShape();
}
function mousePressed() {
  // loop();
  start = true;
  points = [];
  socket.emit("clear");
}
function mouseReleased() {
  start = false;
  // noLoop();
}

// setInterval(sendVec, 1500);
const resetCan = () => {
  socket.emit("reset");
};
document.getElementById("reset").addEventListener("click", setup);
