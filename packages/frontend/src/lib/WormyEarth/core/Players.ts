import types from "lib/WormyEarth/utils/types";
import Renderer from "lib/WormyEarth/core/Renderer";
import constants from "lib/WormyEarth/utils/constants";
import Vector from "lib/WormyEarth/math/Vector";

class Players {
  private list!: types.Player[];
  private current!: types.Player;

  public init = () => {
    this.list = [];
    this.events();
  };

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

      const direction = Renderer.convertPosition(event.clientX, event.clientY)
        .sub(player)
        .normalize()
        .mult(20)
        .add(player);

      Renderer.weapon(player, direction);
    });
  };
}

export default new Players();
