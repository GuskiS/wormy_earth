import { Body, Vector } from "matter-js";

import Physics from "lib/WormyEarth/core/Physics";
import Renderer from "lib/WormyEarth/core/Renderer";

import types from "lib/WormyEarth/utils/types";
import constants from "lib/WormyEarth/utils/constants";

class Player {
  public name: string;
  public weapon: Vector;
  private body: Body;

  constructor(name: string, position: Vector) {
    this.name = name;
    this.body = Physics.player(position, this.size);
    this.weapon = Vector.clone(this.body.position);
  }

  public render = () => {
    this.focusWeapon();

    Renderer.player(this);
  };

  public get size(): types.Size {
    return constants.player.size;
  }
  public get position(): Vector {
    return this.body.position;
  }

  private focusWeapon = () => {
    this.weapon.x = Renderer.mouse.x;
    this.weapon.y = Math.min(Renderer.mouse.y, this.body.position.y);

    this.weapon = Vector.sub(this.weapon, this.body.position);
    this.weapon = Vector.normalise(this.weapon);
    this.weapon = Vector.mult(this.weapon, constants.player.weaponLength);
    this.weapon = Vector.add(this.weapon, this.body.position);
  };
}

export default Player;
