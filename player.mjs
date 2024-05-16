import Sprite from "./sprite.mjs";

const DIM_X = 1 / 15;
const DIM_Y = 1 / 15;
const SPEED = 0.005;

export default class Player extends Sprite {
  constructor(can, con, posX, posY) {
    super(can, con, posX, posY, 0, DIM_X, DIM_Y);
  }

  draw() {
    this.con.strokeStyle = "blue";
    this.con.lineWidth = 5;
    this.con.strokeRect(
      (this.pos.x - this.dim.x / 2) * this.can.width,
      (this.pos.y - this.dim.y / 2) * this.can.width,
      this.dim.x * this.can.width,
      this.dim.y * this.can.width
    );
  }

  move(direction) {
    this.pos.x += direction * SPEED;
  }
}
2