import Perlin from "@mohayonao/perlin-noise"; 
import types from "lib/WormyEarth/utils/types";

import Renderer from "lib/WormyEarth/core/Renderer";
import constants from "lib/WormyEarth/utils/constants";

const perlin = new Perlin();

class Terrain {
  private terrain: types.Terrain = [];

  public init = () => {
    const { size, offset } = constants.canvas; 

    this.terrain = []
    this.terrain.push([0, size.height]);

    for (let x = 0; x < size.width + 1; x += 10) {
      const yoff = size.height /2 + offset;
      const y = perlin.noise(x /100) * yoff;
      this.terrain.push([x,y]);
    };

    this.terrain.push([size.width, size.height]);

  };
  public terminate = () => {
    this.terrain = [];
  };

  public render = () => {
    Renderer.terrain(this.terrain);
  };
}

export default new Terrain();
