import * as Pixi from "pixi.js";

import constants from "lib/WormyEarth/utils/constants";

import Player from "lib/WormyEarth/entities/Player";
import Terrain from "lib/WormyEarth/entities/Terrain";
import Projectile from "lib/WormyEarth/entities/Projectile";

const colors = {
  sky: Pixi.utils.string2hex("#4682b4"),
  terrain: Pixi.utils.string2hex("#006400"),
  player: Pixi.utils.string2hex("#000000"),
  projectile: Pixi.utils.string2hex("#000000"),
};

class Renderer {
  private app!: Pixi.Application;

  public init = (parent: HTMLElement, cycle: () => void) => {
    // Init application
    this.app = new Pixi.Application({
      antialias: true,
      width: constants.canvas.size.width,
      height: constants.canvas.size.height,
      backgroundColor: colors.sky,
    });

    // Enable mouse events
    this.app.stage.hitArea = new Pixi.Rectangle(0, 0, constants.canvas.size.width, constants.canvas.size.height);
    this.app.stage.interactive = true;

    // Init cycle
    this.app.ticker.add(() => {
      cycle();
    });

    // Add canvas to DOM
    parent.appendChild(this.app.view);
  };
  public terminate = () => {};

  public get mouse() {
    return this.app.renderer.plugins.interaction.mouse.global;
  }
  public get stage() {
    return this.app.stage;
  }

  public createGraphics = () => {
    return this.app.stage.addChild(new Pixi.Graphics());
  };
  public removeGraphics = (element: Pixi.Graphics) => {
    this.app.stage.removeChild(element);
  };

  // TODO: Change to use physics engine coordinates
  public terrain = (terrain: Terrain) => {
    terrain.elements.terrain.clear();

    // Render terrain
    terrain.elements.terrain
      .beginFill(colors.terrain)
      .drawPolygon(terrain.polygon)
      .endFill();
  };

  public player = (player: Player) => {
    player.elements.player.clear();
    player.elements.weapon.clear();

    // Render player
    player.elements.player
      .beginFill(colors.player)
      .drawRect(0, 0, player.size.width, player.size.height)
      .endFill();

    player.elements.player.pivot.set(player.size.width / 2, player.size.height / 2);

    player.elements.player.position.set(player.position.x, player.position.y);

    player.elements.player.rotation = player.angle;

    // Render weapon
    player.elements.weapon
      .lineStyle(4, colors.player)
      .moveTo(player.position.x, player.position.y)
      .lineTo(player.weapon.x, player.weapon.y)
      .endFill();
  };

  public projectile = (projectile: Projectile) => {
    projectile.elements.projectile.clear();

    projectile.elements.projectile
      .beginFill(colors.projectile)
      .drawCircle(projectile.position.x, projectile.position.y, projectile.size)
      .endFill();
  };
}

export default new Renderer();
