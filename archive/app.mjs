import Platform from "./platform.mjs";
import Player from "./player.mjs";

const canvas = document.createElement("canvas");
canvas.style.backgroundColor = "black";
canvas.style.position = "absolute";
document.body.appendChild(canvas);
const context = canvas.getContext("2d");

const LEFT_BUTTON = "ArrowLeft";
const RIGHT_BUTTON = "ArrowRight";

const viewAbles = [];
const angle = Math.PI / 20;

for (let i = 0; i < 21; ++i) {
  viewAbles.push(
    new Platform(
      canvas,
      context,
      (i * 0.05 + 0.025) * Math.cos(angle),
      (i * 0.05 + 0.025) * Math.sin(angle),
      angle
    )
  );
}
const player = new Player(canvas, context, 0.5, 0.5);
viewAbles.push(player);

document.addEventListener("keydown", handleKD);

onresize = resize;
resize();

function resize() {
  console.log("resizing");
  const aspectRatio = innerWidth / innerHeight;
  if (aspectRatio < 3 / 4) {
    canvas.width = innerWidth;
    canvas.height = (innerWidth * 4) / 3;
  } else {
    canvas.height = innerHeight;
    canvas.width = (innerHeight * 3) / 4;
  }
  canvas.style.left = (innerWidth - canvas.width) / 2 + "px";
  canvas.style.top = (innerHeight - canvas.height) / 2 + "px";
  draw();
}

function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  for (let viewAble of viewAbles) {
    viewAble.draw();
  }
}

function handleKD(e) {
  e.preventDefault();
  switch (e.key) {
    case LEFT_BUTTON:
      console.log("Moving left");
      player.move(-1);
      break;
    case RIGHT_BUTTON:
      console.log("Moving right");
      player.move(1);
      break;
  }
  draw();
}
