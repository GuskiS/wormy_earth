/* eslint-disable @typescript-eslint/no-namespace */
import { G, Line, Circle, Polyline, Path } from "@svgdotjs/svg.js";

import Vector from "lib/WormyEarth/math/Vector";

namespace types {
  export type Point = [number, number];
  export type Terrain = Point[];

  export interface Layers {
    terrain: G;
    player: G;
  }

  export interface Elements {
    earth: Polyline;
    sun: Circle;
    weapon: Line;
    projectile: Path;
  }

  export type ProjectilePositions = Record<"start" | "midway" | "end", { x: number; y: number }>;

  export interface Player {
    name: string;
    position: Vector;
  }
}

export default types;
