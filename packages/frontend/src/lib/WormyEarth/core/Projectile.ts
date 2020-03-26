import { Vector } from "matter-js";

import types from "lib/WormyEarth/utils/types";

const G = 9.8;

class Projectile {
  public init = () => {};
  public terminate = () => {};

  public render = (start: Vector, positions: types.ProjectilePositions) => {
    // Renderer.projectile(start, positions);
  };

  public calculate = (angle: number, speed = 40) => {
    const halfT = (speed * Math.sin(angle)) / G;
    const maxT = 2 * halfT;
    const maxX = speed * Math.cos(angle) * maxT;
    const maxY = speed * Math.sin(angle) * halfT - (G * Math.pow(halfT, 2)) / 2;

    return {
      start: {
        x: 0,
        y: 0,
      },
      midway: {
        x: -maxX / 2,
        y: -maxY,
      },
      end: {
        x: -maxX,
        y: 0,
      },
    };
  };
}

export default new Projectile();
