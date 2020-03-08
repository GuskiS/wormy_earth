import Renderer from "lib/WormyEarth/core/Renderer";
import Terrain from "lib/WormyEarth/core/Terrain";

export default class WormyEarth {
  public init = (selector: string) => {
    Renderer.init(selector);
    Terrain.init();

    this.debug();
  };
  public terminate = () => {
    Renderer.terminate();
    Terrain.terminate();
  };

  private debug = () => {};
}
