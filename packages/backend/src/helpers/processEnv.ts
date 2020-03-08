const processEnv = (key: string): string => {
  const value = process.env[key];
  if (value) {
    return value;
  } else {
    throw new Error(`process.env.${key} is not set`);
  }
};

export default processEnv;
