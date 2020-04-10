import * as Matter from "matter-js";

import types from "lib/WormyEarth/utils/types";
import constants from "lib/WormyEarth/utils/constants";

(window as any).decomp = require("poly-decomp");

class Physics {
  private engine!: Matter.Engine;

  public init = (parent: HTMLElement) => {
    this.engine = Matter.Engine.create();

    this.debug(parent);
  };

  public terminate = () => {};

  public update = () => {
    Matter.Engine.update(this.engine);
  };

  public terrain = (plot: Matter.Vector[], position: Matter.Vector) => {
    const body = Matter.Bodies.fromVertices(position.x, position.y, [plot], { isStatic: true });

    Matter.World.add(this.engine.world, body);

    return body;
  };

  public player = (position: Matter.Vector, size: types.Size) => {
    const body = Matter.Bodies.rectangle(position.x, position.y, size.width, size.height);

    Matter.World.add(this.engine.world, body);

    return body;
  };

  public projectile = (position: Matter.Vector, size: number) => {
    const body = Matter.Bodies.circle(position.x, position.y, size, {
      density: 1,
    });

    Matter.World.add(this.engine.world, body);

    return body;
  };

  private debug = (element: HTMLElement) => {
    const render = Matter.Render.create({
      element,
      engine: this.engine,
      options: {
        width: constants.canvas.size.width,
        height: constants.canvas.size.height,
      },
    });
    Matter.Render.run(render);
  };
}

export default new Physics();
