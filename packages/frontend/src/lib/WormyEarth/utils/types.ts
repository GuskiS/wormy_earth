import Vector from "lib/WormyEarth/math/Vector";

namespace types {
  export type Point = [number, number];
  export type Terrain = Point[];

  export interface Player {
    name: string;
    position: Vector;
  }

  export interface Position {
    x: number;
    y: number;
  }
}

export default types;
