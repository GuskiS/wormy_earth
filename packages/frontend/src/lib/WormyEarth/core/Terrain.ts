import types from "lib/WormyEarth/utils/types";

import Renderer from "lib/WormyEarth/core/Renderer";
import constants from "lib/WormyEarth/utils/constants";

class Terrain {
  private terrain: types.Terrain = [];

  public init = () => {
    const { size, offset, frequency } = constants.canvas;

    this.terrain = [];
    this.terrain.push([0, size.height]);

    for (let x = 0; x < constants.canvas.size.width + 1; x += frequency) {
      const yoff = size.height / 2 + offset;
      const y = yoff;
      this.terrain.push([x, y]);
    }
    this.terrain.push([constants.canvas.size.width, constants.canvas.size.height]);
  };
  public terminate = () => {
    this.terrain = [];
  };

  public render = () => {
    Renderer.terrain(this.terrain);
  };
}

export default new Terrain();
