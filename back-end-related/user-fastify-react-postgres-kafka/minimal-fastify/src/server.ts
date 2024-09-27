import "reflect-metadata";

import Fastify, { FastifyInstance } from "fastify";
import closeWithGrace from "close-with-grace";
import * as dotenv from "dotenv";
import app from "./app";

dotenv.config();

const server: FastifyInstance = Fastify({
  logger: true,
  pluginTimeout: 10000,
});

void server.register(app);

// Delay is the number of milliseconds for the graceful close to finish
const closeListeners = closeWithGrace({ delay: 500 }, async (opts: any) => {
  if (opts.err) {
    console.error(opts.err);
  }

  await server.close();
});

server.addHook("onClose", (_instance, done) => {
  closeListeners.uninstall();
  done();
});

// Start listening.
void server.listen({
  port: Number(process.env.PORT ?? 3000),
  host: process.env.SERVER_HOSTNAME ?? "127.0.0.1",
});

server.ready((err: Error) => {
  if (err) {
    server.log.error(err);
    process.exit(1);
  }

  server.log.info(`Server listening on port ${Number(process.env.PORT ?? 3000)}`);
});

export { server as app };
