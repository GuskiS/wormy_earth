import { SVG, Svg, Color } from "@svgdotjs/svg.js";

import Vector from "lib/WormyEarth/math/Vector";

import types from "lib/WormyEarth/utils/types";
import constants from "lib/WormyEarth/utils/constants";

class Renderer {
  private canvas!: Svg;

  private layers!: types.Layers;
  private elements!: types.Elements;

  public init = (selector: string) => {
    const { width, height } = constants.canvas.size;

    this.canvas = SVG().addTo(selector);
    this.canvas
      .size(width, height)
      .viewbox(0, 0, width, height)
      .css("background-color", new Color(70, 130, 180));

    this.layers = {
      terrain: this.canvas.group().id("group-terrain"),
      player: this.canvas.group().id("group-player"),
    };

    this.elements = {
      earth: this.layers.terrain.polyline(),
      sun: this.layers.terrain.circle(),
      weapon: this.layers.player.line(),
      projectile: this.layers.terrain.path(),
    };
  };
  public terminate = () => {};

  public terrain = (terrain: types.Terrain) => {
    this.elements.earth.plot(terrain).fill("darkgreen");
    this.elements.sun
      .size(60)
      .center(80, 80)
      .fill("yellow");
  };

  public player = (player: types.Player) => {
    this.layers.player
      .rect(20, 10)
      .center(player.position.x, player.position.y)
      .fill("black");
  };

  public projectile = (start: Vector, positions: types.ProjectilePositions) => {
    const moveTo = `M ${positions.start.x} ${positions.start.y}`;
    const quadratic = `Q ${positions.midway.x} ${positions.midway.y * 2} ${positions.end.x} ${positions.end.y}`;

    this.elements.projectile
      .plot(`${moveTo} ${quadratic}`)
      .stroke({ color: "red", width: 2 })
      .fill("none");

    this.elements.projectile.transform({
      translateX: start.x,
      translateY: start.y,
    });
  };

  public weapon = (player: Vector, direction: Vector) => {
    this.elements.weapon.plot([player.x, player.y, direction.x, direction.y]).stroke({
      width: 5,
      color: "black",
    });
  };

  public convertPosition = (clientX: number, clientY: number) => {
    const point = this.canvas.point(clientX, clientY);
    return new Vector(point.x, point.y);
  };

  private get randomColor() {
    return (Color as any).random();
  }
}

export default new Renderer();
