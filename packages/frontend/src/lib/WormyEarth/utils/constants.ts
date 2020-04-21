const constants = {
  canvas: {
    offset: 100,
    frequency: 10,
    precision: 200,
    size: {
      width: 800,
      height: 400,
    },
  },

  player: {
    size: {
      width: 20,
      height: 10,
    },
    weaponLength: 20,
  },
} as const;

// prettier-ignore
export enum KeyboardButton {
  left    = 37,
  up      = 38,
  right   = 39,
  down    = 40,
  a       = 65,
  d       = 68,
  s       = 83,
  w       = 87,
}

export default constants;
