import model from "../model/model.mjs";

export const ASPECT_RATIO = 3 / 4;

const bgCanvas = document.createElement("canvas");
const fgCanvas = document.createElement("canvas");
const bgContext = bgCanvas.getContext("2d");
const fgContext = fgCanvas.getContext("2d");

bgCanvas.style.backgroundColor = "black";
bgCanvas.style.position = fgCanvas.style.position = "absolute";
document.body.appendChild(bgCanvas);
document.body.appendChild(fgCanvas);

function draw() {
  for (let platform of model.platforms) platform.draw();
}

function resize() {
  const aspectRatio = innerWidth / innerHeight;
  if (aspectRatio < ASPECT_RATIO) {
    bgCanvas.width = fgCanvas.width = innerWidth;
    bgCanvas.height = fgCanvas.height = innerWidth / ASPECT_RATIO;
  } else {
    bgCanvas.height = fgCanvas.height = innerHeight;
    bgCanvas.width = fgCanvas.height = innerHeight * ASPECT_RATIO;
  }
  bgCanvas.style.left = fgCanvas.style.left =
    (innerWidth - bgCanvas.width) / 2 + "px";
  bgCanvas.style.top = fgCanvas.style.top =
    (innerHeight - bgCanvas.height) / 2 + "px";
  draw();
}

function run() {
  //after all modules are loaded
  //TODO: replace with animation loop
  onresize = resize;
  resize();
}

export default { ASPECT_RATIO, bgCanvas, fgCanvas, bgContext, fgContext, run };
