import { loadImage } from "../../utilities/loader.mjs";
import view from "../../view/view.mjs";
import Sprite from "../sprite.mjs";

const SPEED = 0.0002;
const SPRITE_SHEET = {
  standing: {
    size: 16,
    data: [{ x: 16, y: 16 }],
  },
  running: {
    size: 16,
    data: [
      { x: 33, y: 16 },
      { x: 50, y: 16 },
    ],
  },
};
const SIZE = 1 / 11;
const PATH = "./images/mario-ss.png";
let image;

export default class Player extends Sprite {
  constructor(posX, posY) {
    super(image, view.fgCanvas, view.fgContext, posX, posY, 0, SIZE, SIZE);
    console.log("Initializing Player");
    this.mode = "standing";
    this.isMirrored = true;
    this.numImages = 1;
    this.flipInterval = 50;
    this.flipTime = 0;
    this.flipIndex = 0;
  }

  draw() {
    this.con.translate(
      this.pos.x * this.can.width,
      this.pos.y * this.can.width
    );
    this.con.rotate(this.pos.a);
    if (this.isMirrored) {
      this.con.scale(-1, 1);
    }
    let x, y;
    x = 16;
    y = 16;

    switch (this.mode) {
      case "standing":
        break;
      case "running":
        break;
    }
    this.con.drawImage(
      this.image,
      x,
      y,
      16,
      16,
      (-this.dim.x / 2) * this.can.width,
      (-this.dim.y / 2) * this.can.width,
      this.dim.x * this.can.width,
      this.dim.y * this.can.width
    );
    // this.con.drawImage(
    //   this.image,
    //   (-this.dim.x / 2) * this.can.width,
    //   (-this.dim.y / 2) * this.can.width,
    //   this.dim.x * this.can.width,
    //   this.dim.y * this.can.width
    // );
    if (this.isMirrored) {
      this.con.scale(-1, 1);
    }
    this.con.rotate(-this.pos.a);
    this.con.translate(
      -this.pos.x * this.can.width,
      -this.pos.y * this.can.width
    );
  }

  run(timeChange) {
    this.flipTime += timeChange;
    if (this.flipTime > this.flipInterval) {
      this.flipIndex++;
      if (this.flipIndex >= this.numImages) {
        this.flipIndex = 0;
      }
      this.flipTime -= this.flipInterval;
    }
    console.log(this.flipTime);
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
