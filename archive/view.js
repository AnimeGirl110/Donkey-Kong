const canvas = document.createElement("canvas");
canvas.style.backgroundColor = "black";
canvas.style.position = "absolute";
document.body.appendChild(canvas);
const context = canvas.getContext("2d");

export function connect() {
  console.log("view::connect()");
}

export function draw() {
  context.clearRect(0, 0, canvas.width, canvas.height);
}

export function finalize() {
  console.log("view::finalize()");
}

export function resize() {
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

export default { connect, draw, finalize, resize };
