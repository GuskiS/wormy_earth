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

export default constants;
