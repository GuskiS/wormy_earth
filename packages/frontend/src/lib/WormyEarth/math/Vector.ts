interface ToArray {
  "2D": [number, number];
  "3D": [number, number, number];
}

class Vector {
  // https://github.com/processing/p5.js/blob/1957f2613b7938139e567b1cd4a0a14def0d6757/src/math/p5.Vector.js#L1583
  public static fromAngle = (angle: number, length = 1) => {
    return new Vector(length * Math.cos(angle), length * Math.sin(angle), 0);
  };

  constructor(public x = 0, public y = 0, public z = 0) {}

  public toArray = <K extends keyof ToArray>(type: K): ToArray[K] => {
    if (type === "2D") {
      return [this.x, this.y] as ToArray[K];
    } else {
      return [this.x, this.y, this.z] as ToArray[K];
    }
  };

  public toRadian = () => {
    return Math.atan2(this.y, this.x);
  };

  public copy = () => {
    return new Vector(this.x, this.y, this.z);
  };

  // https://github.com/processing/p5.js/blob/1957f2613b7938139e567b1cd4a0a14def0d6757/src/math/p5.Vector.js#L984
  public normalize = () => {
    const len = this.mag();
    if (len !== 0) this.mult(1 / len);
    return this;
  };

  // https://github.com/processing/p5.js/blob/1957f2613b7938139e567b1cd4a0a14def0d6757/src/math/p5.Vector.js#L197
  public set = (x = 0, y = 0, z = 0) => {
    this.x = x;
    this.y = y;
    this.z = z;
    return this;
  };

  // https://github.com/processing/p5.js/blob/1957f2613b7938139e567b1cd4a0a14def0d6757/src/math/p5.Vector.js#L310
  public add = (vector: Vector) => {
    this.x += vector.x;
    this.y += vector.y;
    this.z += vector.z;
    return this;
  };
  // https://github.com/processing/p5.js/blob/1957f2613b7938139e567b1cd4a0a14def0d6757/src/math/p5.Vector.js#L507
  public sub = (vector: Vector) => {
    this.x -= vector.x;
    this.y -= vector.y;
    this.z -= vector.z;
    return this;
  };
  // https://github.com/processing/p5.js/blob/1957f2613b7938139e567b1cd4a0a14def0d6757/src/math/p5.Vector.js#L587
  public mult = (n: number) => {
    this.x *= n;
    this.y *= n;
    this.z *= n;
    return this;
  };
  // https://github.com/processing/p5.js/blob/1957f2613b7938139e567b1cd4a0a14def0d6757/src/math/p5.Vector.js#L587
  public div = (n: number) => {
    this.x /= n;
    this.y /= n;
    this.z /= n;
    return this;
  };

  // https://github.com/processing/p5.js/blob/1957f2613b7938139e567b1cd4a0a14def0d6757/src/math/p5.Vector.js#L1041
  public limit = (max: number) => {
    const sq = this.sq();
    if (sq > max * max) {
      //normalize it
      this.div(Math.sqrt(sq)).mult(max);
    }
    return this;
  };
  // https://github.com/processing/p5.js/blob/1957f2613b7938139e567b1cd4a0a14def0d6757/src/math/p5.Vector.js#L723
  public mag = () => {
    return Math.sqrt(this.sq());
  };
  // https://github.com/processing/p5.js/blob/1957f2613b7938139e567b1cd4a0a14def0d6757/src/math/p5.Vector.js#L774
  public sq = () => {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  };
  // https://github.com/processing/p5.js/blob/1957f2613b7938139e567b1cd4a0a14def0d6757/src/math/p5.Vector.js#L929
  public dist = (vector: Vector) => {
    return vector
      .copy()
      .sub(this)
      .mag();
  };
}

export default Vector;
