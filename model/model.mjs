import Platform from "../sprites/platform/platform.mjs";
import { ASPECT_RATIO } from "../view/view.mjs";

const platforms = [];

platforms.push(new Platform(0.3, 0.32 / ASPECT_RATIO, 0.9, 0.3 / ASPECT_RATIO));
platforms.push(new Platform(0.1, 0.1 / ASPECT_RATIO, 0.9, 0.1 / ASPECT_RATIO));
platforms.push(new Platform(0.1, 0.4 / ASPECT_RATIO, 0.6, 0.45 / ASPECT_RATIO));
platforms.push(new Platform(0.2, 0.55 / ASPECT_RATIO, 0.9, 0.50 / ASPECT_RATIO));
platforms.push(new Platform(0.1, 0.65 / ASPECT_RATIO, 0.75, 0.75 / ASPECT_RATIO));
platforms.push(new Platform(0.1, 0.9 / ASPECT_RATIO, 0.9, 0.9 / ASPECT_RATIO));

export default { platforms };
