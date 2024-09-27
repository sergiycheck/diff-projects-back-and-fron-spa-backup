import type { FastifyPluginAsync } from "fastify";
import { join } from "path";

import type { AutoloadPluginOptions } from "@fastify/autoload";
import AutoLoad from "@fastify/autoload";
import fastifyWebsocket from "@fastify/websocket";

export type AppOptions = {} & Partial<AutoloadPluginOptions>;

const app: FastifyPluginAsync<AppOptions> = async (fastify, opts): Promise<void> => {
  void fastify.register(AutoLoad, {
    dir: join(__dirname, "plugins"),
    options: opts,
  });

  void fastify.register(AutoLoad, {
    dir: join(__dirname, "routes"),
    options: opts,
  });

  fastify.register(fastifyWebsocket);

  fastify.register(async function (fastify) {
    fastify.get("/ws-conn", { websocket: true }, (connection /* SocketStream */, req /* FastifyRequest */) => {
      connection.socket.on("message", (message) => {
        connection.socket.send("hi from server");
      });
    });
  });

  fastify.register(async function (fastify, opts, done) {
    const { consumer } = fastify.kafkajs();
    const topic = "topic-test";
    await consumer.subscribe({ topic, fromBeginning: true });

    const webSocketServer = fastify.websocketServer;

    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`;

        console.log(`got kafka message in socket - ${prefix} ${message.key}#${message.value}`);

        webSocketServer.clients.forEach((client) => {
          if (client.readyState !== 1) return;
          console.log("sending message to client");
          client.send(`got kafka message in socket - ${prefix} ${message.key}#${message.value}`);
        });
      },
    });
  });
};

export default app;
export { app };
