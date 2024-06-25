import Barrel from "../sprites/barrel.mjs";
import Platform from "../sprites/platform/platform.mjs";
import Player from "../sprites/player/player.mjs";
import { ASPECT_RATIO } from "../view/view.mjs";

export const PLATFORMS = [
  { x1: 0.1, y1: 0.1 / ASPECT_RATIO, x2: 0.8, y2: 0.1 / ASPECT_RATIO },
  { x1: 0.9, y1: 0.22 / ASPECT_RATIO, x2: 0.3, y2: 0.3 / ASPECT_RATIO },
  { x1: 0.1, y1: 0.4 / ASPECT_RATIO, x2: 0.77, y2: 0.45 / ASPECT_RATIO },
  { x1: 0.9, y1: 0.55 / ASPECT_RATIO, x2: 0.2, y2: 0.6 / ASPECT_RATIO },
  { x1: 0.1, y1: 0.72 / ASPECT_RATIO, x2: 0.75, y2: 0.77 / ASPECT_RATIO },
  { x1: 0.9, y1: 0.9 / ASPECT_RATIO, x2: 0.1, y2: 0.9 / ASPECT_RATIO },
];

export const sprites = {
  platforms: [],
  barrels: [],
  player: undefined,
};

export function initialize() {
  console.log("Initializing");
  return new Promise((resolve, reject) => {
    Platform.initialize()
      .then(() => {
        for (let p of PLATFORMS) {
          sprites.platforms.push(new Platform(p.x1, p.y1, p.x2, p.y2));
        }
      })
      .then(() => Barrel.initialize())
      .then(() => {
        sprites.barrels.push(new Barrel(0.5, 0.5));
      })
      .then(() => Player.initialize())
      .then(() => {
        sprites.player = new Player(0.5, 0.5);
      })
      .then(() => {
        console.log("Ready to resolve");
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function run(timeChange) {
  //TODO
  for (let barrel of sprites.barrels) {
    barrel.run(timeChange);
  }
  sprites.player.run(timeChange);
}

export default { initialize, run, sprites, PLATFORMS };
