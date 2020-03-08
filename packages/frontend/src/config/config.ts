interface Config {
  env: {
    isDev: boolean;
    isProd: boolean;
  };

  server: string;
  socket: string;
}

const env = process.env.NODE_ENV || "development";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const config: Config = require(`./envs/${env}.json`);

export default config;
