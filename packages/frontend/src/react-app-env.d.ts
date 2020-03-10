/// <reference types="react-scripts" />

declare module "@mohayonao/perlin-noise" {
  class Perlin {
    constructor(randomizer?: () => number) {}

    public noise = (value: number): number => {};
  }
  export default Perlin
}
