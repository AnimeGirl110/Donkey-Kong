import PlatformPiece from "./platform-piece.mjs";

export const PIECE_LENGTH = 1 / 20;
const GAP_FIX = PIECE_LENGTH / 10;

export default class Platform {
  constructor(x1, y1, x2, y2) {
    if (x1 > x2) {
      const tempX = x1;
      const tempY = y1;
      x1 = x2;
      y1 = y2;
      x2 = tempX;
      y2 = tempY;
    }
    const cx = (x1 + x2) / 2;
    const cy = (y1 + y2) / 2;
    const dx = x2 - x1;
    const dy = y2 - y1;
    const angle = Math.atan2(dy, dx);
    const length = Math.sqrt(dy * dy + dx * dx);

    const numPieces = Math.ceil(length / PIECE_LENGTH);
    const x0 = cx - ((numPieces - 1 / 2) * PIECE_LENGTH * Math.cos(angle)) / 2;
    const y0 = cy - ((numPieces - 1 / 2) * PIECE_LENGTH * Math.sin(angle)) / 2;
    this.pieces = [];
    for (let i = 0; i < numPieces; ++i) {
      this.pieces.push(
        new PlatformPiece(
          x0 + i * PIECE_LENGTH * Math.cos(angle),
          y0 + i * PIECE_LENGTH * Math.sin(angle),
          angle,
          PIECE_LENGTH + GAP_FIX,
          PIECE_LENGTH
        )
      );
    }
  }

  draw() {
    for (let piece of this.pieces) {
      console.log(piece.pos.x, piece.pos.y);
      piece.draw();
    }
  }

  static initialize() {
    return new Promise((resolve, reject) => {
      PlatformPiece.initialize()
        .then((message) => {
          resolve(message);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }
}
