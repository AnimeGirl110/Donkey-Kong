import { loadImage } from "../utilities/loader.mjs";
import view from "../view/view.mjs";
import Sprite from "./sprite.mjs";

const RADIUS = 1 / 15;
const PATH = "./images/barrel-256.png";
let image;

export default class Barrel extends Sprite {
  constructor(posX, posY) {
    super(
      image,
      view.fgCanvas,
      view.fgContext,
      posX,
      posY,
      Math.random() * 2 * Math.PI,
      RADIUS * 2,
      RADIUS * 2
    );
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
