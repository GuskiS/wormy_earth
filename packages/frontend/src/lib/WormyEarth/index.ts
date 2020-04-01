import Game from "lib/WormyEarth/core/Game";
import Physics from "lib/WormyEarth/core/Physics";
import Renderer from "lib/WormyEarth/core/Renderer";
import Projectile from "lib/WormyEarth/core/Projectile";

export default class WormyEarth {
  public init = (selector: string) => {
    const element = document.querySelector<HTMLElement>(selector);

    if (!element) {
      throw new Error(`Can't find element with selector: ${selector}`);
    }

    Renderer.init(element, this.cycle);
    Physics.init(element);

    Game.init();
    Projectile.init();

    Game.addPlayer("JOLO");
    Game.start();
  };
  public terminate = () => {
    Renderer.terminate();
    Physics.terminate();

    Game.terminate();
    Projectile.terminate();
  };

  private cycle = () => {
    Physics.update();
    Game.render();
  };
}
