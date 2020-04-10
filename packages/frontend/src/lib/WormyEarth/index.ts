import Game from "lib/WormyEarth/core/Game";
import Physics from "lib/WormyEarth/core/Physics";
import Renderer from "lib/WormyEarth/core/Renderer";

export default class WormyEarth {
  public init = (selector: string) => {
    const element = document.querySelector<HTMLElement>(selector);

    if (!element) {
      throw new Error(`Can't find element with selector: ${selector}`);
    }

    Renderer.init(element, this.cycle);
    Physics.init(element);

    Game.init();

    Game.addPlayer("JOLO");
    Game.start();
  };
  public terminate = () => {
    Renderer.terminate();
    Physics.terminate();

    Game.terminate();
  };

  private cycle = () => {
    Physics.update();
    Game.render();
  };
}
