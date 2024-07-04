import controller from "../../controller/controller.mjs";
import { PLATFORMS } from "../../model/model.mjs";
import { loadImage } from "../../utilities/loader.mjs";
import view from "../../view/view.mjs";
import { PIECE_LENGTH } from "../platform/platform.mjs";
import Sprite from "../sprite.mjs";

const SPEED = 0.0002;
const SPRITE_SHEET = {
  standing: {
    size: 16,
    data: [{ x: 1, y: 1 }],
  },
  running: {
    size: 16,
    data: [
      { x: 18, y: 1 },
      { x: 35, y: 1 },
    ],
  },
  climbing: {
    size: 16,
    data: [
      { x: 52, y: 1 },
      { x: 69, y: 1 },
      { x: 86, y: 1 },
      { x: 103, y: 1 },
      { x: 120, y: 1 },
    ],
  },
};
const SIZE = 1 / 11;
const PATH = "./images/mario-ss.png";
let image;

export default class Player extends Sprite {
  constructor(posX, posY) {
    super(
      image,
      view.fgCanvas,
      view.fgContext,
      posX,
      posY - SIZE / 2 - PIECE_LENGTH / 2,
      0,
      SIZE,
      SIZE
    );
    console.log("Initializing Player");
    this.mode = "standing";
    this.isMirrored = false;
    this.numImages = SPRITE_SHEET[this.mode].data.length;
    this.flipInterval = 300;
    this.flipTime = 0;
    this.flipIndex = 0;
    this.platformLevel = 5;
    this.vel = {
      x: 0,
      y: 0,
    };
    this.speed = 0;
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
    this.con.drawImage(
      this.image,
      SPRITE_SHEET[this.mode].data[this.flipIndex].x,
      SPRITE_SHEET[this.mode].data[this.flipIndex].y,
      SPRITE_SHEET[this.mode].size,
      SPRITE_SHEET[this.mode].size,
      (-this.dim.x / 2) * this.can.width,
      (-this.dim.y / 2) * this.can.width,
      this.dim.x * this.can.width,
      this.dim.y * this.can.width
    );
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
    if (controller.state.isUpdated) {
      let leftRight = 0;
      let topDown = 0;
      if (controller.state["a"] || controller.state["ArrowLeft"]) {
        --leftRight;
      }
      if (controller.state["d"] || controller.state["ArrowRight"]) {
        ++leftRight;
      }
      if (leftRight < 0) {
        this.mode = "running";
        this.isMirrored = false;
        this.speed = SPEED;
      } else if (leftRight > 0) {
        this.mode = "running";
        this.isMirrored = true;
        this.speed = -SPEED;
      } else {
        this.mode = "standing";
        this.speed = 0;
      }
      this.flipIndex = 0;
      this.numImages = SPRITE_SHEET[this.mode].data.length;
      controller.state.isUpdated = false;
    }

    this.angle = Math.atan2(
      PLATFORMS[this.platformLevel].y2 - PLATFORMS[this.platformLevel].y1,
      PLATFORMS[this.platformLevel].x2 - PLATFORMS[this.platformLevel].x1
    );
    this.vel = {
      x: this.speed * Math.cos(this.angle),
      y: this.speed * Math.sin(this.angle),
    };

    this.pos.x += this.vel.x * timeChange;
    this.pos.y += this.vel.y * timeChange;

    this.flipTime += timeChange;
    if (this.flipTime > this.flipInterval) {
      this.flipIndex++;
      if (this.flipIndex >= this.numImages) {
        this.flipIndex = 0;
      }
      this.flipTime = 0;
    }
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
