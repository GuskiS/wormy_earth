import { SVG, Svg, Color, Line, G, Polyline, Circle } from "@svgdotjs/svg.js";

import types from "lib/WormyEarth/utils/types";
import constants from "lib/WormyEarth/utils/constants";
import Vector from "lib/WormyEarth/math/Vector";

interface Layers {
  terrain: G;
  player: G;
}

interface Elements {
  earth: Polyline;
  weapon: Line;
  sun: Circle;
}

class Renderer {
  private canvas!: Svg;

  private layers!: Layers;
  private elements!: Elements;

  public init = (selector: string) => {
    const { width, height } = constants.canvas.size;

    this.canvas = SVG().addTo(selector);
    this.canvas
      .size(width, height)
      .viewbox(0, 0, width, height)
      .css("background-color", new Color(70, 130, 180));

    this.layers = {
      terrain: this.canvas.group().id("layer-terrain"),
      player: this.canvas.group().id("layer-player"),
    };

    this.elements = {
      earth: this.layers.terrain.polyline(),
      weapon: this.layers.player.line(),
      sun: this.layers.terrain.circle(),
    };
  };
  public terminate = () => {};

  public terrain = (terrain: types.Terrain) => {
    this.elements.earth.plot(terrain).fill("darkgreen");
    this.elements.sun
      .size(60)
      .center(60, 60)
      .fill("yellow");
  };

  public player = (player: types.Player) => {
    this.layers.player
      .circle(32)
      .center(player.position.x, player.position.y)
      .fill(this.randomColor);
  };

  public weapon = (player: Vector, direction: Vector) => {
    this.elements.weapon
      .plot([player.x, player.y, direction.x, direction.y])
      .stroke({ width: 5, color: this.randomColor });
  };

  private get randomColor() {
    return (Color as any).random();
  }

  public convertPosition = (x: number, y: number) => {
    const point = this.canvas.point(x, y);
    return new Vector(point.x, point.y);
  };
}

export default new Renderer();
