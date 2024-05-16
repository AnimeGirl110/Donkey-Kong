import Sprite from "./sprite.mjs";

const img = document.getElementById("brick");

const DIM_X = 1 / 20;
const DIM_Y = 1 / 20;

export default class Platform extends Sprite {
  constructor(can, con, posX, posY, posA) {
    super(can, con, posX, posY, posA, DIM_X, DIM_Y);
  }

  draw() {
    this.con.translate(
      this.pos.x * this.can.width,
      this.pos.y * this.can.width
    );
    this.con.rotate(this.pos.a);
    this.con.drawImage(
      img,
      (-this.dim.x / 2) * this.can.width,
      (-this.dim.y / 2) * this.can.width,
      this.dim.x * this.can.width,
      this.dim.y * this.can.width
    );
    this.con.rotate(-this.pos.a);
    this.con.translate(
      -this.pos.x * this.can.width,
      -this.pos.y * this.can.width
    );

    // this.con.strokeStyle = "red";
    // this.con.lineWidth = 4;
    // this.con.strokeRect(
    //   (this.pos.x - this.dim.x / 2) * this.can.width,
    //   (this.pos.y - this.dim.y / 2) * this.can.width,
    //   this.dim.x * this.can.width,
    //   this.dim.y * this.can.width
    //);
  }
}
