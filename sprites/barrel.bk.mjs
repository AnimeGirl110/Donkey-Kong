import { PLATFORMS } from "../model/model.mjs";
import { loadImage } from "../utilities/loader.mjs";
import view from "../view/view.mjs";
import { PIECE_LENGTH } from "./platform/platform.mjs";
import Sprite from "./sprite.mjs";

const SPEED = 0.0002;
const RADIUS = 1 / 30;
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
    this.paths = [];
    this.pathIndex = 1; //is the 2nd side of it
    for (let p of PLATFORMS) {
      this.paths.push({ x: p.x1, y: p.y1 - RADIUS - PIECE_LENGTH / 2 });
      this.paths.push({ x: p.x2, y: p.y2 - RADIUS - PIECE_LENGTH / 2 });
    }
    this.pos.x = this.paths[0].x;
    this.pos.y = this.paths[0].y;
    this.angle = Math.atan2(
      this.paths[1].y - this.paths[0].y,
      this.paths[1].x - this.paths[0].x
    );

    this.vel = {
      x: SPEED * Math.cos(this.angle),
      y: SPEED * Math.sin(this.angle),
    };
  }

  run(timeChange) {
    this.pos.x += this.vel.x * timeChange;
    this.pos.y += this.vel.y * timeChange;

    if (this.vel.x > 0) {
      if (this.pos.x > this.paths[this.pathIndex].x) {
        this.pos.x = this.paths[this.pathIndex].x;
        this.angle = Math.atan2(
          this.paths[this.pathIndex + 1].y - this.paths[this.pathIndex].y,
          this.paths[this.pathIndex + 1].x - this.paths[this.pathIndex].x
        );
        this.vel = {
          x: SPEED * Math.cos(this.angle),
          y: SPEED * Math.sin(this.angle),
        };
        this.pathIndex++;
      }
    } else {
      if (this.pos.x < this.paths[this.pathIndex].x) {
        this.pos.x = this.paths[this.pathIndex].x;
        this.angle = Math.atan2(
          this.paths[this.pathIndex + 1].y - this.paths[this.pathIndex].y,
          this.paths[this.pathIndex + 1].x - this.paths[this.pathIndex].x
        );
        this.vel = {
          x: SPEED * Math.cos(this.angle),
          y: SPEED * Math.sin(this.angle),
        };
        this.pathIndex++;
      }
    }
    this.pos.a += ((this.vel.x > 0 ? 1 : -1) * (SPEED * timeChange)) / RADIUS;
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
