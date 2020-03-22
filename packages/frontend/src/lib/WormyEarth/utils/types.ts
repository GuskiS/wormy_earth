namespace types {
  export type Point = [number, number];
  export type Terrain = Point[];

  export interface Player {
    name: string;
    position: Point;
  }

  export interface Position {
    x: number;
    y: number;
  }
}

export default types;
