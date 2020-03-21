import Renderer from "lib/WormyEarth/core/Renderer";
import Terrain from "lib/WormyEarth/core/Terrain";
import Players from "lib/WormyEarth/core/Players";

export default class WormyEarth {
  public init = (selector: string) => {
    Renderer.init(selector);
    Terrain.init();
    Players.init();

    this.debug();
  };
  public terminate = () => {
    Renderer.terminate();
    Terrain.terminate();
    Players.terminate();
  };

  private debug = () => {
    Terrain.render();

    Players.addPlayer("JOLO");

    Players.render();
  };
}
