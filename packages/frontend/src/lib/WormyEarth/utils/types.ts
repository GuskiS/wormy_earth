import Vector from "lib/WormyEarth/math/Vector";
import { Polyline, Line, Circle, G } from "@svgdotjs/svg.js";

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

  export interface Layers {
    terrain: G;
    player: G;
  }

  export interface Elements {
    earth: Polyline;
    weapon: Line;
    sun: Circle;
  }
}

export default types;
