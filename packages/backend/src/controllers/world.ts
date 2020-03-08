import { RequestHandler } from "fastify";

export default class WorldController {
  public static http: RequestHandler = async () => {
    return { hello: "world" };
  };
}
