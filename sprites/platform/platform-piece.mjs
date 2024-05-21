import view from "../../view/view.mjs";
import Sprite from "../sprite.mjs";

let image;
loadImage("./images/brick.svg")
  .then((message) => {
    console.log(message);
  })
  .catch((reason) => {
    console.error(reason);
  });

function loadImage(path) {
  console.log("Loading image");
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve("Done");
    };
    img.onerror = (err) => {
      reject(err);
    };
    img.src = path;
  });
}

export default class PlatformPiece extends Sprite {
  constructor(posX, posY, posA, dimX, dimY) {
    super(
      document.getElementById("brick"),
      view.bgCanvas,
      view.bgContext,
      posX,
      posY,
      posA,
      dimX,
      dimY
    );
  }
}
