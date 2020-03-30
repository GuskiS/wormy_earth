import { Body, Vector } from "matter-js";
// import Perlin from "@mohayonao/perlin-noise";

import constants from "lib/WormyEarth/utils/constants";

import Physics from "lib/WormyEarth/core/Physics";
import Renderer from "lib/WormyEarth/core/Renderer";

// const perlin = new Perlin();

class Terrain {
  public plot!: Vector[];
  private body!: Body;

  constructor() {
    const result = this.generateRandomTerrain();

    this.plot = result.plot;
    this.body = Physics.terrain(result.plot, result.position);
  }

  public render = () => {
    Renderer.terrain(this);
  };

  public get polygon(): number[] {
    return this.plot.flatMap(({ x, y }) => [x, y]);
  }

  private generateRandomTerrain = () => {
    const plot: Vector[] = [];
    const { size, offset, frequency /* precision */ } = constants.canvas;
    const position = { x: size.width / 2, y: size.height - offset / 2 };

    plot.push(Vector.create(0, size.height));
    for (let x = 0; x < size.width + 1; x += frequency) {
      const yoff = size.height / 2 + offset;
      // const y = perlin.noise(x / precision) * yoff;
      const y = yoff;
      plot.push(Vector.create(x, y));
    }
    plot.push(Vector.create(size.width, size.height));

    return { plot, position };
  };
}

export default Terrain;
