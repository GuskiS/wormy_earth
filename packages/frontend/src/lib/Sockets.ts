import { v4 as uuid } from "uuid";
import SocketIOClient from "socket.io-client";

import config from "config/config";

const SOCKET_ID = uuid();
const OPTIONS: SocketIOClient.ConnectOpts = {
  transports: ["websocket"],
  forceNew: true,
};

export type Response<Data> = { failed: false; data: Data } | { failed: true; error: unknown };

export default class Sockets {
  private client: SocketIOClient.Socket;
  private queue: Array<{ event: string; body: object }> = [];
  private connected = false;

  constructor(path: string) {
    this.client = SocketIOClient(`${this.host}${path}?id=${SOCKET_ID}`, OPTIONS);
    this.connected = this.client.connected;
    this.client.on("connect", this.onOpen);
    this.client.on("error", console.error);
    this.client.on("reconnect", this.onOpen);
    this.client.on("disconnect", this.onClose);
  }

  public terminate = () => {
    this.client.close();
  };

  public emit = <D>(event: string, body: object) => {
    if (!this.connected) {
      this.queue.push({ event, body });
    } else {
      return this.emitter<D>(event, body);
    }
  };

  private emitter = <D>(event: string, body: object) => {
    return new Promise<Response<D>>((resolve) => {
      this.client.emit(event, { body }, (error: unknown, data: D) => {
        if (error) {
          console.error(error);
          resolve({ failed: true, error });
        } else {
          resolve({ failed: false, data });
        }
      });
    });
  };

  private onOpen = () => {
    this.connected = true;

    this.queue.forEach(({ event, body }) => this.emitter(event, body));
    this.queue = [];
  };
  private onClose = () => {
    this.connected = false;
  };

  private get host() {
    return config.env.isDev ? config.socket.replace("0.0.0.0", window.location.hostname) : config.socket;
  }
}
