export default class Sprite {
  //assume positions are in percentages of width, write height as 4/3
  constructor(can, con, posX, posY, posA, dimX, dimY, image) {
    this.pos = {
      x: posX,
      y: posY,
      a: posA,
    };
    this.dim = {
      x: dimX,
      y: dimY,
    };
    this.can = can;
    this.con = con;
    this.image = image;
  }

  draw() {
    this.con.translate(
      this.pos.x * this.can.width,
      this.pos.y * this.can.width
    );
    this.con.rotate(this.pos.a);
    this.con.drawImage(
      this.image,
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
  }
}
