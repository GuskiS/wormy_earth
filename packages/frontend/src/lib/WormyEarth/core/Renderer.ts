import { SVG, Svg, Color } from "@svgdotjs/svg.js";

import types from "lib/WormyEarth/utils/types";
import constants from "lib/WormyEarth/utils/constants";

class Renderer {
  private canvas!: Svg;

  public init = (selector: string) => {
    const { width, height } = constants.canvas.size;

    this.canvas = SVG().addTo(selector);
    this.canvas
      .size(width, height)
      .viewbox(0, 0, width, height)
      .css("background-color", new Color(100, 100, 100));
  };
  public terminate = () => {};

  public terrain = (terrain: types.Terrain) => {
    this.canvas.polyline(terrain).fill("darkgreen");
  };
}

export default new Renderer();
