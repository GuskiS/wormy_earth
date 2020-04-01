import * as Pixi from "pixi.js";

import constants from "lib/WormyEarth/utils/constants";

import Player from "lib/WormyEarth/entities/Player";
import Terrain from "lib/WormyEarth/entities/Terrain";

const colors = {
  sky: Pixi.utils.string2hex("#4682b4"),
  terrain: Pixi.utils.string2hex("#006400"),
  player: Pixi.utils.string2hex("#000000"),
};

class Renderer {
  private app!: Pixi.Application;

  private elements!: Record<"terrain" | "player" | "weapon", Pixi.Graphics>;

  public init = (parent: HTMLElement, cycle: () => void) => {
    // Init application
    this.app = new Pixi.Application({
      antialias: true,
      width: constants.canvas.size.width,
      height: constants.canvas.size.height,
      backgroundColor: colors.sky,
    });

    // Init elements
    this.elements = {
      terrain: new Pixi.Graphics(),
      player: new Pixi.Graphics(),
      weapon: new Pixi.Graphics(),
    };
    const list = Object.values(this.elements);

    // Init cycle cycle
    this.app.ticker.add(() => {
      list.forEach((element) => element.clear());
      cycle();
    });

    // Add elements to stage
    list.forEach((element) => {
      this.app.stage.addChild(element);
    });

    // Add canvas to DOM
    parent.appendChild(this.app.view);
  };
  public terminate = () => {};

  public get mouse() {
    return this.app.renderer.plugins.interaction.mouse.global;
  }

  public terrain = (terrain: Terrain) => {
    // Render terrain
    this.elements.terrain
      .beginFill(colors.terrain)
      .drawPolygon(terrain.polygon)
      .endFill();
  };

  public player = (player: Player) => {
    // Render player
    this.elements.player
      .beginFill(colors.player)
      .drawRect(0, 0, player.size.width, player.size.height)
      .endFill();

    // Move player half size higher
    this.elements.player.position.set(
      player.position.x - player.size.width / 2,
      player.position.y - player.size.height / 2,
    );

    // Render weapon
    this.elements.weapon
      .lineStyle(4, colors.player)
      .moveTo(player.position.x, player.position.y)
      .lineTo(player.weapon.x, player.weapon.y)
      .endFill();
  };

  // public projectile = (start: Vector, positions: types.ProjectilePositions) => {
  //   const moveTo = `M ${positions.start.x} ${positions.start.y}`;
  //   const quadratic = `Q ${positions.midway.x} ${positions.midway.y * 2} ${positions.end.x} ${positions.end.y}`;
  //   this.elements.projectile
  //     .plot(`${moveTo} ${quadratic}`)
  //     .stroke({ color: "red", width: 2 })
  //     .fill("none");
  //   this.elements.projectile.transform({
  //     translateX: start.x,
  //     translateY: start.y,
  //   });
  // };
}

export default new Renderer();
