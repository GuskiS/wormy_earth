import * as Matter from "matter-js";

import Physics from "lib/WormyEarth/core/Physics";
import Renderer from "lib/WormyEarth/core/Renderer";

class Projectile {
  public elements = {
    projectile: Renderer.createGraphics(),
  };
  private body: Matter.Body;

  constructor(position: Matter.Vector) {
    this.body = Physics.projectile(position, this.size);
  }

  public render = () => {
    Renderer.projectile(this);
  };

  public addForce = (direction: Matter.Vector, magnitude = 0.2) => {
    const force = Matter.Vector.mult(direction, magnitude);
    const position = Matter.Vector.clone(this.body.position);

    Matter.Body.applyForce(this.body, position, force);
  };

  public get size(): number {
    return 2;
  }
  public get position(): Matter.Vector {
    return this.body.position;
  }
}

export default Projectile;
