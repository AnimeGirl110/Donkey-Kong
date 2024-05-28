import { loadImage } from "../../utilities/loader.mjs";
import view from "../../view/view.mjs";
import Sprite from "../sprite.mjs";

const PATH = "./images/brick.svg";
let image;

export default class PlatformPiece extends Sprite {
  constructor(posX, posY, posA, dimX, dimY) {
    super(image, view.bgCanvas, view.bgContext, posX, posY, posA, dimX, dimY);
  }

  static initialize() {
    return new Promise((resolve, reject) => {
      loadImage(PATH)
        .then((img) => {
          image = img;
          resolve("Loaded");
        })
        .catch((reason) => {
          console.error(reason);
        });
    });
  }
}
