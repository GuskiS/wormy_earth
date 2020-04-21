import * as Matter from "matter-js";

import Physics from "lib/WormyEarth/core/Physics";
import Renderer from "lib/WormyEarth/core/Renderer";

import types from "lib/WormyEarth/utils/types";
import constants from "lib/WormyEarth/utils/constants";

class Player {
  public name: string;
  public weapon: Matter.Vector;
  public elements = {
    player: Renderer.createGraphics(),
    weapon: Renderer.createGraphics(),
  };
  private body: Matter.Body;

  constructor(name: string, position: Matter.Vector) {
    this.name = name;
    this.body = Physics.player(position, this.size);
    this.weapon = Matter.Vector.clone(this.body.position);
  }

  public render = () => {
    this.focusWeapon();

    Renderer.player(this);
  };

  public get size(): Readonly<types.Size> {
    return constants.player.size;
  }
  public get position(): Readonly<Matter.Vector> {
    return this.body.position;
  }

  public get angle(): Readonly<number> {
    return this.body.angle;
  }

  public move = (velocity: Matter.Vector) => {
    Matter.Body.setVelocity(this.body, velocity);
  };

  private focusWeapon = () => {
    this.weapon.x = Renderer.mouse.x;
    this.weapon.y = Math.min(Renderer.mouse.y, this.body.position.y);

    this.weapon = Matter.Vector.sub(this.weapon, this.body.position);
    this.weapon = Matter.Vector.normalise(this.weapon);
    this.weapon = Matter.Vector.mult(this.weapon, constants.player.weaponLength);
    this.weapon = Matter.Vector.add(this.weapon, this.body.position);
  };
}

export default Player;
