import Barrel from "../sprites/barrel.mjs";
import Platform from "../sprites/platform/platform.mjs";
import { ASPECT_RATIO } from "../view/view.mjs";

const platforms = [];
const barrels = [];

export function initialize() {
  return new Promise((resolve, reject) => {
    Platform.initialize()
      .then(() => {
        platforms.push(
          new Platform(0.3, 0.32 / ASPECT_RATIO, 0.9, 0.3 / ASPECT_RATIO)
        );
        platforms.push(
          new Platform(0.1, 0.1 / ASPECT_RATIO, 0.9, 0.1 / ASPECT_RATIO)
        );
        platforms.push(
          new Platform(0.1, 0.4 / ASPECT_RATIO, 0.6, 0.45 / ASPECT_RATIO)
        );
        platforms.push(
          new Platform(0.2, 0.55 / ASPECT_RATIO, 0.9, 0.5 / ASPECT_RATIO)
        );
        platforms.push(
          new Platform(0.1, 0.65 / ASPECT_RATIO, 0.75, 0.75 / ASPECT_RATIO)
        );
        platforms.push(
          new Platform(0.1, 0.9 / ASPECT_RATIO, 0.9, 0.9 / ASPECT_RATIO)
        );
      })
      .then(() => Barrel.initialize())
      .then(() => {
        barrels.push(new Barrel(0.5, 0.5));
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export function run(timeChange) {
  //TODO
}

export default { initialize, run, platforms, barrels };
