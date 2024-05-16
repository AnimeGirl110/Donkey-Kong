export default class Sprite {
  //assume positions are in percentages of width, write height as 4/3
  constructor(can, con, posX, posY, posA, dimX, dimY) {
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
  }

  draw() {}
}
