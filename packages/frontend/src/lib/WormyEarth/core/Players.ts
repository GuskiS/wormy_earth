import types from "lib/WormyEarth/utils/types";
import Renderer from "lib/WormyEarth/core/Renderer";
import constants from "lib/WormyEarth/utils/constants";
class Players {
  private list!: types.Player[];

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
    const position: types.Point = [constants.canvas.size.width / 2, constants.canvas.size.height / 2];
    this.list.push({ name, position });
  };

  private events = () => {
    document.addEventListener("mousemove", (event) => {
      const player = this.list[0];
      Renderer.weapon(player.position, [event.clientX, event.clientY]);
    });
  };
}

export default new Players();
