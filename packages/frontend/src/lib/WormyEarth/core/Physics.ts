import { Engine, Bodies, World, Vector, Render } from "matter-js";

import types from "lib/WormyEarth/utils/types";
import constants from "lib/WormyEarth/utils/constants";

(window as any).decomp = require("poly-decomp");

class Physics {
  private engine!: Engine;

  public init = (parent: HTMLElement) => {
    this.engine = Engine.create();

    this.debug(parent);
  };

  public terminate = () => {};

  public update = () => {
    Engine.update(this.engine);
  };

  public terrain = (plot: Vector[], position: Vector) => {
    const body = Bodies.fromVertices(position.x, position.y, [plot], { isStatic: true });

    World.add(this.engine.world, body);

    return body;
  };

  public player = (position: Vector, size: types.Size) => {
    const body = Bodies.rectangle(position.x, position.y, size.width, size.height);

    World.add(this.engine.world, body);

    return body;
  };

  private debug = (element: HTMLElement) => {
    const render = Render.create({
      element,
      engine: this.engine,
      options: {
        width: constants.canvas.size.width,
        height: constants.canvas.size.height,
      },
    });
    Render.run(render);
  };
}

export default new Physics();
