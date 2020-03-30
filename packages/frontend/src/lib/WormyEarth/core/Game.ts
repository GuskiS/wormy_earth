import { Vector } from "matter-js";

import Player from "lib/WormyEarth/entities/Player";
import Terrain from "lib/WormyEarth/entities/Terrain";

import constants from "lib/WormyEarth/utils/constants";

class Game {
  private terrain!: Terrain;
  private players!: Player[];

  public init = () => {
    this.terrain = new Terrain();
    this.players = [];
  };
  public terminate = () => {};

  public render = () => {
    this.terrain.render();
    this.players.forEach((player) => {
      player.render();
    });
  };

  public start = () => {};

  public addPlayer = (name: string) => {
    const position = this.generatePlayerPosition();
    const player = new Player(name, position);

    this.players.push(player);
  };

  private generatePlayerPosition = () => {
    const x = constants.canvas.size.width / 2;
    const y = 100;
    return Vector.create(x, y);
  };
}

export default new Game();
