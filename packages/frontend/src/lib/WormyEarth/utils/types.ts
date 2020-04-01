/* eslint-disable @typescript-eslint/no-namespace */

namespace types {
  export interface Size {
    width: number;
    height: number;
  }

  export type ProjectilePositions = Record<"start" | "midway" | "end", { x: number; y: number }>;
}

export default types;
