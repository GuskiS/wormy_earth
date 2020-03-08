import fastify from "fastify";
import SocketIO from "socket.io";

import config from "config/config";

import WorldController from "controllers/world";

class App {
  public server!: fastify.FastifyInstance;
  public websocket!: SocketIO.Server;

  public init = async (): Promise<void> => {
    this.server = fastify({
      logger: {
        prettyPrint: config.env.isDev,
      },
    });

    this.websocket = SocketIO(this.server.server);

    this.plugins();
    this.routes();
    this.sockets();

    await this.start();
  };

  public destroy = async (): Promise<void> => {
    await this.server.close();
  };

  /* eslint-disable @typescript-eslint/no-var-requires */
  private plugins = (): void => {
    this.server.register(require("fastify-helmet"));
    this.server.register(require("fastify-sensible"));
    // this.server.register(require('fastify-cors'), {
    //   origin: () => {}
    // });
  };

  private start = async (): Promise<void> => {
    try {
      await this.server.listen(config.port, config.host);
    } catch (error) {
      this.server.log.error(error);
      process.exit(1);
    }
  };

  private routes = (): void => {
    this.server.get("/http", WorldController.http);
  };

  private sockets = (): void => {
    // TODO: socket.io-redis

    this.websocket.on("connection", (socket) => {
      if (socket.request._query.id) {
        socket.client.id = socket.request._query.id;
      } else {
        return socket.disconnect();
      }
    });

    this.websocket.of("/socket").on("connect", (socket) => {
      socket.on("test", (data) => {
        console.warn(data);
      });
    });
  };
}

export default new App();
