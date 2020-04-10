import * as Pixi from "pixi.js";
import * as Matter from "matter-js";

import Renderer from "lib/WormyEarth/core/Renderer";

import Player from "lib/WormyEarth/entities/Player";
import Terrain from "lib/WormyEarth/entities/Terrain";
import Projectile from "lib/WormyEarth/entities/Projectile";

import constants from "lib/WormyEarth/utils/constants";

class Game {
  private currentPlayer!: Player;
  private terrain!: Terrain;
  private players!: Player[];
  private projectiles!: Projectile[];

  public init = () => {
    this.terrain = new Terrain();
    this.players = [];
    this.projectiles = [];

    this.debug();
  };
  public terminate = () => {};

  public render = () => {
    this.terrain.render();
    this.players.forEach((player) => {
      player.render();
    });

    this.projectiles.forEach((projectile) => {
      projectile.render();
    });
  };

  public start = () => {};

  public addPlayer = (name: string, position = this.generatePlayerPosition()) => {
    const player = new Player(name, position);
    this.currentPlayer = player;
    this.players.push(player);
  };

  public shoot = () => {
    const projectile = new Projectile(this.currentPlayer.weapon);

    const direction = Matter.Vector.normalise(
      Matter.Vector.sub(this.currentPlayer.weapon, this.currentPlayer.position),
    );

    projectile.addForce(direction);

    this.projectiles.push(projectile);
  };

  private debug = () => {
    Renderer.stage.on("mousedown", (event: Pixi.interaction.InteractionEvent) => {
      // const position = Vector.create(event.data.global.x, event.data.global.y);
      // this.projectiles.push(new Projectile(position));
      // this.addPlayer("adssad", position);

      this.shoot();
    });
  };

  private generatePlayerPosition = () => {
    const x = constants.canvas.size.width / 2;
    const y = 100;
    return Matter.Vector.create(x, y);
  };
}

export default new Game();
