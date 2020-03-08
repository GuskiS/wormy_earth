import types from "lib/WormyEarth/utils/types";

import Renderer from "lib/WormyEarth/core/Renderer";

class Terrain {
  private terrain: types.Terrain = [];

  public init = () => {};
  public terminate = () => {
    this.terrain = [];
  };

  public render = () => {
    Renderer.terrain(this.terrain);
  };
}

export default new Terrain();
