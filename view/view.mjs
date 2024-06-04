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

function initialize() {
onresize = resize;
resize();
}

function drawBg() {
  bgContext.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
  for (let platform of model.platforms) platform.draw();
}

function drawFg() {
  fgContext.clearRect(0, 0, fgCanvas.width, fgCanvas.height);
  for (let barrel of model.barrels) barrel.draw();
}

function resize() {
  const aspectRatio = innerWidth / innerHeight;
  if (aspectRatio < ASPECT_RATIO) {
    bgCanvas.width = fgCanvas.width = innerWidth;
    bgCanvas.height = fgCanvas.height = innerWidth / ASPECT_RATIO;
  } else {
    bgCanvas.height = fgCanvas.height = innerHeight;
    bgCanvas.width = fgCanvas.width = innerHeight * ASPECT_RATIO;
  }
  bgCanvas.style.left = fgCanvas.style.left =
    (innerWidth - bgCanvas.width) / 2 + "px";
  bgCanvas.style.top = fgCanvas.style.top =
    (innerHeight - bgCanvas.height) / 2 + "px";
  drawBg();
}

function run() {
  //after all modules are loaded
  //TODO: replace with animation loop
  drawFg();
}

export default { initialize, ASPECT_RATIO, bgCanvas, fgCanvas, bgContext, fgContext, run };
