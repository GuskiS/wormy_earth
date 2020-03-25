import Vector from "lib/WormyEarth/math/Vector";
import Renderer from "lib/WormyEarth/core/Renderer";
import Projectile from "lib/WormyEarth/core/Projectile";

import types from "lib/WormyEarth/utils/types";
import constants from "lib/WormyEarth/utils/constants";

class Players {
  private list!: types.Player[];
  private current!: types.Player;

  public init = () => {
    this.list = [];

    this.events();
  };
  public terminate = () => {};

  public render = () => {
    this.list.forEach((player) => {
      Renderer.player(player);
    });
  };

  public addPlayer = (name: string) => {
    const position = new Vector(constants.canvas.size.width / 2, 295);

    this.list.push({ name, position });

    this.current = this.list[0];
  };

  private events = () => {
    document.addEventListener("mousemove", (event) => {
      const player = this.current.position;

      const mouse = Renderer.convertPosition(event.clientX, event.clientY);
      mouse.set(mouse.x, Math.min(mouse.y, player.y));

      const direction = mouse
        .sub(player)
        .normalize()
        .mult(20);

      const angle = direction.toRadian();

      Renderer.weapon(player, direction.add(player));

      Renderer.projectile(direction, Projectile.calculate(angle, 50));
    });
  };
}

export default new Players();
